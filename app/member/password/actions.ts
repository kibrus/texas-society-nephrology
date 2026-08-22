"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export type ChangePasswordState = { error?: string; success?: boolean };

const Schema = z
  .object({
    current: z.string().min(1, "Enter your current password."),
    password: z.string().min(8, "New password must be at least 8 characters."),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "New passwords do not match.",
    path: ["confirm"],
  });

export async function changePassword(
  _prev: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  // Defense in depth against a hijacked session brute-forcing the old password.
  const ip = clientIp(headers());
  if (!rateLimit(`pwchange:${ip}`, 5, 15 * 60_000).ok) {
    return { error: "Too many attempts. Please try again in a few minutes." };
  }

  const parsed = Schema.safeParse({
    current: formData.get("current"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    return { error: "You need to be signed in to change your password." };
  }

  // Verify the current password by re-authenticating. If it's wrong, stop here
  // so a logged-in-but-not-owner session can't silently reset the password.
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: parsed.data.current,
  });
  if (signInError) {
    return { error: "Your current password is incorrect." };
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });
  if (updateError) {
    return { error: "Could not update your password. Please try again." };
  }

  return { success: true };
}
