import "server-only";
import { z } from "zod";
import { publicEnv } from "./public";

// Server-only environment variables. This module is guarded by `server-only`,
// so importing it from a Client Component is a build-time error. Never expose
// any of these values through a NEXT_PUBLIC_ variable or a client response.

const ServerEnvSchema = z.object({
  // Supabase (elevated / service-role access)
  SUPABASE_SECRET_KEY: z.string().min(1),

  // Stripe
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  STRIPE_PRICE_TRAINEE: z.string().startsWith("price_"),
  STRIPE_PRICE_FULL: z.string().startsWith("price_"),
  STRIPE_API_VERSION: z.string().min(1),

  // Resend / transactional email
  RESEND_API_KEY: z.string().min(1),
  EMAIL_FROM: z.string().min(1), // e.g. "Texas Society of Nephrology <noreply@...>"
  EMAIL_REPLY_TO: z.string().email(),
  CONTACT_RECIPIENT_EMAIL: z.string().email(),

  // Operational (introduced in later stages; optional until then)
  CRON_SECRET: z.string().min(1).optional(),
  ADMIN_ESCALATION_EMAIL: z.string().email().optional(),
});

const parsed = ServerEnvSchema.safeParse(process.env);

if (!parsed.success) {
  // Report names only, never values.
  const names = parsed.error.issues.map((i) => i.path.join(".")).join(", ");
  throw new Error(`Invalid or missing server environment variables: ${names}`);
}

// Merge public values so server code has a single typed env object.
export const serverEnv = { ...parsed.data, ...publicEnv };
export type ServerEnv = typeof serverEnv;
