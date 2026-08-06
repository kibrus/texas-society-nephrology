import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe/server";
import { serverEnv } from "@/lib/env/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

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
    .select("id, tier")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  if (!profile) return; // No member for this customer — nothing to activate.

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
}

// Subscription fully canceled (member ended it, or dunning exhausted retries).
async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  const admin = createSupabaseAdminClient();

  const customerId = customerIdOf(subscription.customer);
  if (!customerId) return;

  await admin
    .from("profiles")
    .update({ membership_status: "cancelled" })
    .eq("stripe_customer_id", customerId);
}
