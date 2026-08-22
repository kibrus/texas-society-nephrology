"use server";

import { z } from "zod";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { RESET_EMAIL_COOKIE } from "./shared";

export type ForgotState = { error?: string };

const Schema = z.object({ email: z.string().trim().email() });

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

  const email = parsed.data.email.toLowerCase();
  const supabase = createSupabaseServerClient();

  // Sends the recovery email. With the "Reset Password" template configured to
  // include {{ .Token }}, this delivers a 6-digit code the user enters next.
  // We don't inspect the result: Supabase doesn't error for unknown emails, and
  // we redirect to the code step regardless so we never leak which addresses
  // have accounts.
  await supabase.auth.resetPasswordForEmail(email);

  cookies().set(RESET_EMAIL_COOKIE, email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 30,
  });

  redirect("/forgot-password/verify");
}
