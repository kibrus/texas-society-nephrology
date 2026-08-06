"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { PROFESSION_VALUES, TIER_VALUES } from "@/lib/membership";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { SIGNUP_EMAIL_COOKIE } from "../membership/signup-shared";

export type SignupState = { error?: string };

const SignupSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required."),
  last_name: z.string().trim().min(1, "Last name is required."),
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  profession: z.enum(PROFESSION_VALUES, {
    errorMap: () => ({ message: "Choose your profession." }),
  }),
  tier: z.enum(TIER_VALUES, {
    errorMap: () => ({ message: "Choose a membership tier." }),
  }),
  phone: z.string().trim().max(40).optional(),
  consent: z.literal("on", {
    errorMap: () => ({ message: "Please accept the membership terms to continue." }),
  }),
});

export async function startSignup(
  _prev: SignupState,
  formData: FormData,
): Promise<SignupState> {
  // Throttle signup attempts per IP (defense in depth; Supabase Auth also rate
  // limits on its side). Max 5 per 15 minutes.
  const ip = clientIp(headers());
  if (!rateLimit(`signup:${ip}`, 5, 15 * 60_000).ok) {
    return { error: "Too many attempts. Please try again in a few minutes." };
  }

  const parsed = SignupSchema.safeParse({
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    password: formData.get("password"),
    profession: formData.get("profession"),
    tier: formData.get("tier"),
    phone: formData.get("phone") || undefined,
    consent: formData.get("consent"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check your details." };
  }

  const email = parsed.data.email.toLowerCase();
  const supabase = createSupabaseServerClient();

  // Creates an UNCONFIRMED auth user and emails a verification code. No session
  // is issued until the OTP is verified. Requires the Supabase project to have
  // email confirmation enabled with a token-based "Confirm signup" template.
  const { data, error } = await supabase.auth.signUp({
    email,
    password: parsed.data.password,
  });

  if (error) {
    // Log the real cause (e.g. Supabase SMTP / Resend domain not verified) for
    // server-side debugging. Safe: this message never contains the password.
    console.error("[signup] auth.signUp failed:", error.message);
    return { error: "Could not start signup. Please try again." };
  }

  // Supabase returns a user with an empty identities array when the email is
  // already registered (enumeration protection). Treat that as "already exists".
  if (data.user && (data.user.identities?.length ?? 0) === 0) {
    return {
      error: "An account with this email already exists. Please sign in instead.",
    };
  }

  if (!data.user) {
    return { error: "Could not start signup. Please try again." };
  }

  // Park the applicant's details until the OTP is verified. Passwords are never
  // stored here — they went straight to Supabase Auth above. Service-role write
  // because signup_drafts has RLS enabled with no policies.
  const admin = createSupabaseAdminClient();
  const { error: draftError } = await admin.from("signup_drafts").upsert({
    id: data.user.id,
    first_name: parsed.data.first_name,
    last_name: parsed.data.last_name,
    email,
    profession: parsed.data.profession,
    tier: parsed.data.tier,
    phone: parsed.data.phone ?? null,
  });

  if (draftError) {
    console.error("[signup] signup_drafts upsert failed:", draftError.message);
    return { error: "Could not start signup. Please try again." };
  }

  cookies().set(SIGNUP_EMAIL_COOKIE, email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 30,
  });

  redirect("/membership/verify");
}
