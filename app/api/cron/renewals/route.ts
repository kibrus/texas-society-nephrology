import { NextResponse } from "next/server";
import { serverEnv } from "@/lib/env/server";
import { stripe } from "@/lib/stripe/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendTransactionalEmail } from "@/lib/email/send";
import { renewalReminderEmail } from "@/lib/email/templates";

// Daily maintenance job (Vercel Cron). Two sweeps:
//   1. Renewal reminders — one email per member per renewal cycle, in the 30 days
//      before dues_paid_until.
//   2. Expiry backstop — flip active members whose coverage has actually lapsed
//      to "expired" (Stripe webhooks are primary; this catches missed deliveries).
//
// Authenticated with CRON_SECRET: Vercel Cron sends it as a Bearer token. Node
// runtime + never cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REMINDER_WINDOW_DAYS = 30;

function addDays(base: Date, days: number): string {
  const d = new Date(base);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export async function GET(req: Request) {
  const secret = serverEnv.CRON_SECRET;
  if (!secret) {
    // Misconfiguration — refuse rather than run unauthenticated.
    return NextResponse.json({ error: "Cron not configured" }, { status: 500 });
  }
  if (req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createSupabaseAdminClient();
  const today = new Date().toISOString().slice(0, 10);
  const windowEnd = addDays(new Date(), REMINDER_WINDOW_DAYS);

  // --- 1. Renewal reminders -------------------------------------------------
  // Active members whose coverage ends within the reminder window. Deduped on
  // (profile, dues_paid_until) so re-runs and multi-day windows email once.
  const { data: dueSoon } = await admin
    .from("profiles")
    .select("id, email, first_name, dues_paid_until, cancel_at_period_end")
    .eq("membership_status", "active")
    .gte("dues_paid_until", today)
    .lte("dues_paid_until", windowEnd);

  let remindersSent = 0;
  for (const p of dueSoon ?? []) {
    if (!p.dues_paid_until) continue;
    const email = renewalReminderEmail({
      firstName: p.first_name,
      renewsOn: p.dues_paid_until,
      autoRenew: !p.cancel_at_period_end,
    });
    await sendTransactionalEmail({
      dedupeKey: `renewal_reminder:${p.id}:${p.dues_paid_until}`,
      type: "renewal_reminder",
      to: p.email,
      ...email,
    });
    remindersSent += 1;
  }

  // --- 2. Expiry backstop ---------------------------------------------------
  // Active members whose paid coverage has genuinely lapsed. Under normal
  // operation Stripe renews (extending the date) or a webhook already handled
  // the lapse; this only catches stragglers.
  const { data: lapsed } = await admin
    .from("profiles")
    .update({ membership_status: "expired" })
    .eq("membership_status", "active")
    .lt("dues_paid_until", today)
    .select("id");

  // --- 3. Abandoned-signup cleanup -----------------------------------------
  // Drop stale signup drafts (never verified) and release the never-completed
  // Stripe subscriptions behind stuck pending_payment profiles, which voids
  // their lingering "open" invoices so they don't pile up in Stripe.
  const draftCutoff = new Date(Date.now() - 2 * 86_400_000).toISOString();
  await admin.from("signup_drafts").delete().lt("created_at", draftCutoff);

  const pendingCutoff = new Date(Date.now() - 7 * 86_400_000).toISOString();
  const { data: stuck } = await admin
    .from("profiles")
    .select("id, stripe_subscription_id")
    .eq("membership_status", "pending_payment")
    .lt("created_at", pendingCutoff)
    .not("stripe_subscription_id", "is", null);

  let releasedSubscriptions = 0;
  for (const p of stuck ?? []) {
    if (!p.stripe_subscription_id) continue;
    try {
      await stripe.subscriptions.cancel(p.stripe_subscription_id);
    } catch {
      // Already gone / not cancelable — clear the pointer anyway.
    }
    await admin
      .from("profiles")
      .update({ stripe_subscription_id: null })
      .eq("id", p.id);
    releasedSubscriptions += 1;
  }

  return NextResponse.json({
    ok: true,
    remindersConsidered: dueSoon?.length ?? 0,
    remindersSent,
    expired: lapsed?.length ?? 0,
    releasedSubscriptions,
  });
}
