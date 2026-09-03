import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe/server";
import { serverEnv } from "@/lib/env/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendTransactionalEmail } from "@/lib/email/send";
import {
  receiptEmail,
  paymentFailedEmail,
  adminNewMemberEmail,
} from "@/lib/email/templates";

// Stripe webhook endpoint. This is the ONLY place membership is activated or
// renewed — never trust the browser. Signature is verified against the raw
// request body, and every event is de-duplicated through the stripe_events
// ledger so Stripe's automatic retries can't double-apply anything.
//
// Requires the Node.js runtime (Stripe's signature check needs the raw body;
// the Edge runtime would mangle it). Must never be cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Turn a Stripe unix timestamp into a YYYY-MM-DD date (profiles.dues_paid_until
// and payments.period_* are DATE columns).
function toDate(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toISOString().slice(0, 10);
}

function customerIdOf(
  ref: string | { id: string } | null | undefined,
): string | null {
  if (!ref) return null;
  return typeof ref === "string" ? ref : ref.id;
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      serverEnv.STRIPE_WEBHOOK_SECRET,
    );
  } catch {
    // Bad signature or malformed payload — never process. Do not log the body.
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();

  // Idempotency guard: claim this event id. A duplicate delivery hits the
  // primary-key conflict and we ack without reprocessing.
  const { error: claimError } = await admin
    .from("stripe_events")
    .insert({ id: event.id, type: event.type });

  if (claimError) {
    // 23505 = unique_violation → already processed. Any other error, ask Stripe
    // to retry later.
    if (claimError.code === "23505") {
      return NextResponse.json({ received: true, duplicate: true });
    }
    return NextResponse.json({ error: "Ledger unavailable" }, { status: 500 });
  }

  try {
    switch (event.type) {
      case "invoice.paid":
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;
      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionCanceled(event.data.object as Stripe.Subscription);
        break;
      default:
        // Unhandled event types are acknowledged so Stripe stops retrying.
        break;
    }
  } catch {
    // Processing failed after we claimed the event — release the claim so
    // Stripe's retry can reprocess it, and signal failure.
    await admin.from("stripe_events").delete().eq("id", event.id);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// invoice.paid fires on the first dues payment AND on every yearly renewal, so
// it drives both activation and renewal.
async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const admin = createSupabaseAdminClient();

  const customerId = customerIdOf(invoice.customer);
  if (!customerId) return;

  const { data: profile } = await admin
    .from("profiles")
    .select(
      "id, tier, email, first_name, last_name, phone, profession, membership_status",
    )
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  if (!profile) return; // No member for this customer — nothing to activate.

  // First activation vs a yearly renewal — only the former is a "new member".
  const isNewMember = profile.membership_status !== "active";

  // Coverage window comes from the invoice line, not the browser.
  const line = invoice.lines?.data?.[0];
  const periodStart = line?.period?.start ? toDate(line.period.start) : null;
  const periodEnd = line?.period?.end ? toDate(line.period.end) : null;

  // Activate/renew: mark active and extend dues through the paid period.
  await admin
    .from("profiles")
    .update({
      membership_status: "active",
      ...(periodEnd ? { dues_paid_until: periodEnd } : {}),
    })
    .eq("id", profile.id);

  // Record the payment. Keyed on the (unique) invoice id so a re-delivery or a
  // renewal never duplicates a row. The stripe_events guard already prevents
  // double-processing; this is belt-and-suspenders.
  const invoiceObj = invoice as unknown as {
    payment_intent?: string | { id: string } | null;
  };

  if (periodStart && periodEnd) {
    await admin.from("payments").upsert(
      {
        profile_id: profile.id,
        amount_cents: invoice.amount_paid ?? 0,
        tier: profile.tier,
        status: "succeeded",
        period_start: periodStart,
        period_end: periodEnd,
        stripe_invoice_id: invoice.id ?? null,
        stripe_payment_intent_id: customerIdOf(invoiceObj.payment_intent),
        stripe_hosted_invoice_url: invoice.hosted_invoice_url ?? null,
        stripe_invoice_pdf_url: invoice.invoice_pdf ?? null,
      },
      { onConflict: "stripe_invoice_id" },
    );
  }

  // Welcome / renewal receipt. Deduped on the invoice id so a redelivery or a
  // reclaimed event won't email twice. Best-effort — never blocks activation.
  const receipt = receiptEmail({
    firstName: profile.first_name,
    tier: profile.tier,
    amountCents: invoice.amount_paid ?? 0,
    periodEnd,
    invoiceUrl: invoice.hosted_invoice_url ?? null,
  });
  await sendTransactionalEmail({
    dedupeKey: `receipt:${invoice.id}`,
    type: "receipt",
    to: profile.email,
    ...receipt,
  });

  // Notify staff when a brand-new member joins (not on renewals). Deduped per
  // member so a webhook redelivery won't double-send. Best-effort; never blocks.
  const adminRecipients = (serverEnv.MEMBER_NOTIFICATION_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  if (isNewMember && adminRecipients.length > 0) {
    const notice = adminNewMemberEmail({
      firstName: profile.first_name,
      lastName: profile.last_name,
      email: profile.email,
      phone: profile.phone,
      profession: profile.profession,
      tier: profile.tier,
      amountCents: invoice.amount_paid ?? 0,
      activeUntil: periodEnd,
      invoiceUrl: invoice.hosted_invoice_url ?? null,
    });
    await sendTransactionalEmail({
      dedupeKey: `admin_new_member:${profile.id}`,
      type: "admin_new_member",
      to: adminRecipients,
      ...notice,
    });
  }
}

// A dues charge failed — the first attempt or a renewal. Stripe keeps retrying
// (dunning) and, if it eventually gives up, sends customer.subscription.deleted.
// Our job here is only to lapse a member whose paid coverage has actually run
// out; someone still inside their paid period stays active while retries run.
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const admin = createSupabaseAdminClient();

  const customerId = customerIdOf(invoice.customer);
  if (!customerId) return;

  const { data: profile } = await admin
    .from("profiles")
    .select("id, membership_status, dues_paid_until, email, first_name")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  if (!profile) return;

  // Nudge the member to fix their payment method — but not during initial
  // signup (pending_payment), where they're already on the payment page seeing
  // the inline error. Deduped on the invoice id so retries don't re-email.
  if (profile.membership_status !== "pending_payment") {
    const updateUrl =
      invoice.hosted_invoice_url ?? `${serverEnv.NEXT_PUBLIC_SITE_URL}/member`;
    const failed = paymentFailedEmail({
      firstName: profile.first_name,
      updateUrl,
    });
    await sendTransactionalEmail({
      dedupeKey: `payment_failed:${invoice.id}`,
      type: "payment_failed",
      to: profile.email,
      ...failed,
    });
  }

  // Only an active member can lapse from a failed renewal. A pending_payment
  // member (first charge failed) simply stays pending and can retry payment.
  if (profile.membership_status !== "active") return;

  // Still covered through the paid period? Leave them active — dunning will
  // retry. Mark expired only once coverage has genuinely lapsed.
  const today = new Date().toISOString().slice(0, 10);
  if (profile.dues_paid_until && profile.dues_paid_until >= today) return;

  await admin
    .from("profiles")
    .update({ membership_status: "expired" })
    .eq("id", profile.id);
}

// Subscription fully canceled (member ended it, or dunning exhausted retries).
async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  const admin = createSupabaseAdminClient();

  const customerId = customerIdOf(subscription.customer);
  if (!customerId) return;

  await admin
    .from("profiles")
    .update({ membership_status: "cancelled", cancel_at_period_end: false })
    .eq("stripe_customer_id", customerId);
}
