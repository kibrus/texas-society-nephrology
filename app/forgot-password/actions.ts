"use server";

import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { publicEnv } from "@/lib/env/public";

export type ForgotState = { sent?: boolean; error?: string };

const Schema = z.object({ email: z.string().email() });

export async function requestPasswordReset(
  _prev: ForgotState,
  formData: FormData,
): Promise<ForgotState> {
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
