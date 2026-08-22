"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { publicEnv } from "@/lib/env/public";

export type ForgotState = { sent?: boolean; error?: string };

const Schema = z.object({ email: z.string().email() });

export async function requestPasswordReset(
  _prev: ForgotState,
  formData: FormData,
): Promise<ForgotState> {
  // Throttle per IP so this can't be used to spam reset emails at addresses.
  const ip = clientIp(headers());
  if (!rateLimit(`pwreset:${ip}`, 3, 15 * 60_000).ok) {
    return { error: "Too many requests. Please try again in a few minutes." };
  }

  const parsed = Schema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { error: "Enter a valid email address." };
  }

  const supabase = createSupabaseServerClient();
  // The link lands on /auth/callback, which exchanges the code for a recovery
  // session and forwards to /reset-password.
  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${publicEnv.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/reset-password`,
  });

  // Always report success regardless of whether the email is registered, so we
  // do not leak which addresses have accounts.
  return { sent: true };
}
