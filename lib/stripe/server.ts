import "server-only";
import Stripe from "stripe";
import { serverEnv } from "@/lib/env/server";
import type { Tier } from "@/lib/membership";

// Server-only Stripe client keyed with the SECRET key. Never import from a
// Client Component. The API version is pinned via env so test/prod stay aligned.
export const stripe = new Stripe(serverEnv.STRIPE_SECRET_KEY, {
  apiVersion: serverEnv.STRIPE_API_VERSION as Stripe.LatestApiVersion,
  typescript: true,
});

// The recurring price a subscription is created against, per self-selected tier.
// [PROD] Swap STRIPE_PRICE_* to the live price IDs in the production env.
export const TIER_PRICE_IDS: Record<Tier, string> = {
  trainee: serverEnv.STRIPE_PRICE_TRAINEE,
  full: serverEnv.STRIPE_PRICE_FULL,
};
