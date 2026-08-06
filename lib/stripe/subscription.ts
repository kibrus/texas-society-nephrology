import "server-only";
import type Stripe from "stripe";
import { stripe, TIER_PRICE_IDS } from "./server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Profile } from "@/lib/auth";
import type { Tier } from "@/lib/membership";

export type PaymentInitResult =
  | { clientSecret: string }
  | { alreadyActive: true }
  | { error: string };

// The Payment Element's client secret lives on the latest invoice's
// confirmation_secret (Stripe API >= 2025-06-30.basil). The Node types for this
// version don't yet surface it, so read it through a narrow cast.
type ConfirmationSecret = { client_secret: string | null; type: string };

function readClientSecret(sub: Stripe.Subscription): string | null {
  const invoice = sub.latest_invoice;
  if (!invoice || typeof invoice === "string") return null;
  const secret = (invoice as unknown as { confirmation_secret?: ConfirmationSecret })
    .confirmation_secret;
  return secret?.client_secret ?? null;
}

async function ensureCustomerId(profile: Profile): Promise<string> {
  if (profile.stripe_customer_id) return profile.stripe_customer_id;

  const customer = await stripe.customers.create({
    email: profile.email,
    name: `${profile.first_name} ${profile.last_name}`.trim(),
    metadata: { profile_id: profile.id },
  });

  const admin = createSupabaseAdminClient();
  await admin
    .from("profiles")
    .update({ stripe_customer_id: customer.id })
    .eq("id", profile.id);

  return customer.id;
}

// Idempotently prepares the first-invoice payment for a pending member and
// returns its client secret. Reuses an existing incomplete subscription so a
// page refresh doesn't spawn duplicates. Membership is NOT activated here — the
// verified Stripe webhook (next stage) flips status to active on invoice.paid.
export async function ensurePaymentClientSecret(
  profile: Profile,
): Promise<PaymentInitResult> {
  const priceId = TIER_PRICE_IDS[profile.tier as Tier];
  if (!priceId) return { error: "Unknown membership tier." };

  const customerId = await ensureCustomerId(profile);

  if (profile.stripe_subscription_id) {
    const existing = await stripe.subscriptions.retrieve(
      profile.stripe_subscription_id,
      { expand: ["latest_invoice.confirmation_secret"] },
    );
    if (existing.status === "active" || existing.status === "trialing") {
      return { alreadyActive: true };
    }
    if (existing.status === "incomplete") {
      const secret = readClientSecret(existing);
      if (secret) return { clientSecret: secret };
    }
    // Any other state (incomplete_expired / canceled / past_due / unpaid /
    // paused) means we're renewing. Cancel a still-live subscription first so a
    // member never ends up with two active subscriptions, then fall through and
    // create a fresh one. (canceled / incomplete_expired need no cleanup.)
    if (
      existing.status === "past_due" ||
      existing.status === "unpaid" ||
      existing.status === "paused"
    ) {
      try {
        await stripe.subscriptions.cancel(existing.id);
      } catch {
        // Already gone / not cancelable — safe to proceed.
      }
    }
  }

  const created = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: "default_incomplete",
    payment_settings: {
      save_default_payment_method: "on_subscription",
      // Card only — no bank debits, wallets, or other rails. Authoritative:
      // the invoice PaymentIntent will only accept these method types.
      payment_method_types: ["card"],
    },
    billing_mode: { type: "flexible" },
    expand: ["latest_invoice.confirmation_secret"],
    metadata: { profile_id: profile.id, tier: profile.tier },
  } as Stripe.SubscriptionCreateParams);

  const admin = createSupabaseAdminClient();
  await admin
    .from("profiles")
    .update({ stripe_subscription_id: created.id })
    .eq("id", profile.id);

  const secret = readClientSecret(created);
  if (!secret) return { error: "Could not initialize payment. Please try again." };
  return { clientSecret: secret };
}
