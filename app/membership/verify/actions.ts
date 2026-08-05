"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { SIGNUP_EMAIL_COOKIE } from "../signup-shared";

export type VerifyState = { error?: string; resent?: boolean };

const CodeSchema = z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit code.");

function pendingEmail(): string | null {
  return cookies().get(SIGNUP_EMAIL_COOKIE)?.value ?? null;
}

export async function verifyEmail(
  _prev: VerifyState,
  formData: FormData,
): Promise<VerifyState> {
  const email = pendingEmail();
  if (!email) {
    return { error: "Your signup session expired. Please start again." };
  }

  const code = CodeSchema.safeParse(formData.get("code"));
  if (!code.success) {
    return { error: code.error.issues[0]?.message ?? "Enter the 6-digit code." };
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: code.data,
    type: "signup",
  });

  if (error || !data.user) {
    return { error: "That code is incorrect or has expired. Please try again." };
  }

  // Email is verified and a session is now set. Promote the parked draft into a
  // real profile (service role — profiles inserts are not allowed to browser
  // sessions). Idempotent: a re-verify won't duplicate the row.
  const userId = data.user.id;
  const admin = createSupabaseAdminClient();

  const { data: existing } = await admin
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (!existing) {
    const { data: draft } = await admin
      .from("signup_drafts")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (!draft) {
      return { error: "Your signup session expired. Please start again." };
    }

    const { error: insertError } = await admin.from("profiles").insert({
      id: userId,
      first_name: draft.first_name,
      last_name: draft.last_name,
      email: draft.email,
      profession: draft.profession,
      tier: draft.tier,
      phone: draft.phone,
      membership_status: "pending_payment",
      role: "member",
    });

    if (insertError) {
      return { error: "Could not finish setting up your account. Please try again." };
    }
  }

  await admin.from("signup_drafts").delete().eq("id", userId);
  cookies().delete(SIGNUP_EMAIL_COOKIE);

  // Email verified and profile created in pending_payment — collect dues next.
  redirect("/membership/payment");
}

export async function resendCode(
  _prev: VerifyState,
  _formData: FormData,
): Promise<VerifyState> {
  const email = pendingEmail();
  if (!email) {
    return { error: "Your signup session expired. Please start again." };
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.resend({ type: "signup", email });
  if (error) {
    return { error: "Could not resend the code. Please try again in a moment." };
  }
  return { resent: true };
}
