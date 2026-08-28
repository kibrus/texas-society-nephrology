"use server";

import { z } from "zod";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { RESET_EMAIL_COOKIE } from "../shared";

export type ResetVerifyState = { error?: string; resent?: boolean };

const CodeSchema = z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit code.");

function pendingEmail(): string | null {
  return cookies().get(RESET_EMAIL_COOKIE)?.value ?? null;
}

// Verifies the recovery code. On success Supabase sets a recovery session, so
// /reset-password can call updateUser to set the new password.
export async function verifyResetCode(
  _prev: ResetVerifyState,
  formData: FormData,
): Promise<ResetVerifyState> {
  // Throttle attempts per IP so the 6-digit code can't be brute-forced.
  const ip = clientIp(headers());
  if (!rateLimit(`pwreset-verify:${ip}`, 10, 10 * 60_000).ok) {
    return { error: "Too many attempts. Please try again in a few minutes." };
  }

  const email = pendingEmail();
  if (!email) {
    return { error: "Your reset session expired. Please start again." };
  }

  const code = CodeSchema.safeParse(formData.get("code"));
  if (!code.success) {
    return { error: code.error.issues[0]?.message ?? "Enter the 6-digit code." };
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: code.data,
    type: "recovery",
  });

  if (error || !data.user) {
    return { error: "That code is incorrect or has expired. Please try again." };
  }

  // Recovery session established; the code is consumed. Move on to set the
  // new password.
  cookies().delete(RESET_EMAIL_COOKIE);
  redirect("/reset-password");
}

export async function resendResetCode(
  _prev: ResetVerifyState,
  _formData: FormData,
): Promise<ResetVerifyState> {
  const ip = clientIp(headers());
  if (!rateLimit(`pwreset-resend:${ip}`, 3, 10 * 60_000).ok) {
    return { error: "Too many requests. Please wait a few minutes before resending." };
  }

  const email = pendingEmail();
  if (!email) {
    return { error: "Your reset session expired. Please start again." };
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    return { error: "Could not resend the code. Please try again in a moment." };
  }
  return { resent: true };
}
