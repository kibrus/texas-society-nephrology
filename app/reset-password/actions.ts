"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export type ResetState = { error?: string };

const Schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords do not match.",
    path: ["confirm"],
  });

export async function updatePassword(
  _prev: ResetState,
  formData: FormData,
): Promise<ResetState> {
  // Throttle per IP as defense in depth on the recovery-session update.
  const ip = clientIp(headers());
  if (!rateLimit(`pwupdate:${ip}`, 5, 15 * 60_000).ok) {
    return { error: "Too many attempts. Please try again in a few minutes." };
  }

  const parsed = Schema.safeParse({
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid password." };
  }

  const supabase = createSupabaseServerClient();

  // The recovery session is established by /auth/callback. If it's missing the
  // link was invalid or expired.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      error: "Your reset link is invalid or has expired. Request a new one.",
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });
  if (error) {
    return { error: "Could not update your password. Request a new link." };
  }

  redirect("/member");
}
