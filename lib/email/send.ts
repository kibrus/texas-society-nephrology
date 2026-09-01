import "server-only";
import { serverEnv } from "@/lib/env/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type SendArgs = {
  dedupeKey: string; // e.g. "receipt:in_123" — unique per logical email
  type: string; // category, for the ledger (receipt | payment_failed | cancellation)
  to: string | string[]; // one recipient, or several (e.g. admin notifications)
  subject: string;
  html: string;
  text: string;
};

// Sends one transactional email exactly once per dedupeKey. Claims the key in
// email_deliveries first (a primary-key conflict means it already went out, so
// we skip); only then does it hand off to Resend. If the send throws, the claim
// is released so a later retry (e.g. a redelivered Stripe webhook) can resend.
// Never throws — email is best-effort and must not fail the calling flow.
export async function sendTransactionalEmail(args: SendArgs): Promise<void> {
  const admin = createSupabaseAdminClient();

  const recipient = Array.isArray(args.to) ? args.to.join(",") : args.to;
  const { error: claimError } = await admin
    .from("email_deliveries")
    .insert({ dedupe_key: args.dedupeKey, type: args.type, recipient });

  if (claimError) {
    // 23505 = unique_violation → already sent, nothing to do. Any other error:
    // log and bail rather than send an unclaimed (potentially duplicate) email.
    if (claimError.code !== "23505") {
      console.error("[email] claim failed:", claimError.message);
    }
    return;
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(serverEnv.RESEND_API_KEY);
    await resend.emails.send({
      from: serverEnv.EMAIL_FROM,
      to: args.to,
      reply_to: serverEnv.EMAIL_REPLY_TO,
      subject: args.subject,
      html: args.html,
      text: args.text,
    });
  } catch (e) {
    console.error("[email] send failed:", (e as Error).message);
    // Release the claim so the email can be retried later.
    await admin
      .from("email_deliveries")
      .delete()
      .eq("dedupe_key", args.dedupeKey);
  }
}
