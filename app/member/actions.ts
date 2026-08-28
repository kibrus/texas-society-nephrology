"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { stripe } from "@/lib/stripe/server";
import { getCurrentUser } from "@/lib/auth";
import { PROFESSION_VALUES } from "@/lib/membership";
import { sendTransactionalEmail } from "@/lib/email/send";
import { cancellationEmail } from "@/lib/email/templates";

export async function signOut() {
  const supabase = createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}

export type ProfileState = { ok?: boolean; error?: string };

const ProfileSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required."),
  last_name: z.string().trim().min(1, "Last name is required."),
  profession: z.enum(PROFESSION_VALUES),
  phone: z.string().trim().max(40).optional(),
});

export async function updateProfile(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const parsed = ProfileSchema.safeParse({
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    profession: formData.get("profession"),
    phone: formData.get("phone") || undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = createSupabaseServerClient();
  // RLS restricts this to the caller's own row, and the column-level GRANTs
  // block any attempt to touch privileged columns (role/status/tier/etc).
  const { error } = await supabase
    .from("profiles")
    .update({
      first_name: parsed.data.first_name,
      last_name: parsed.data.last_name,
      profession: parsed.data.profession,
      phone: parsed.data.phone ?? null,
    })
    .eq("id", user.id);

  if (error) {
    return { error: "Could not save your changes. Please try again." };
  }

  revalidatePath("/member");
  return { ok: true };
}

export type CancelState = { ok?: boolean; error?: string };

// Turns off auto-renewal at the end of the current paid period. We set
// cancel_at_period_end on the Stripe subscription (the source of truth) and
// mirror it onto the profile so the account page can show renewal status
// without a Stripe round-trip. Membership stays "active" until the period ends;
// the customer.subscription.deleted webhook flips it to "cancelled" then.
// Service-role write because members can't touch billing columns via RLS.
export async function cancelAutoRenewal(): Promise<CancelState> {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const admin = createSupabaseAdminClient();
  const { data: profile } = await admin
    .from("profiles")
    .select(
      "stripe_subscription_id, membership_status, dues_paid_until, email, first_name",
    )
    .eq("id", user.id)
    .maybeSingle();

  if (
    !profile?.stripe_subscription_id ||
    profile.membership_status !== "active"
  ) {
    return { error: "There's no active renewal to cancel." };
  }

  try {
    await stripe.subscriptions.update(profile.stripe_subscription_id, {
      cancel_at_period_end: true,
    });
  } catch (e) {
    console.error("[cancel] stripe update failed:", (e as Error).message);
    return { error: "Could not cancel automatic renewal. Please try again." };
  }

  await admin
    .from("profiles")
    .update({ cancel_at_period_end: true })
    .eq("id", user.id);

  // Confirmation email. Deduped on the subscription id. Best-effort.
  const email = cancellationEmail({
    firstName: profile.first_name,
    activeUntil: profile.dues_paid_until,
  });
  await sendTransactionalEmail({
    dedupeKey: `cancellation:${profile.stripe_subscription_id}`,
    type: "cancellation",
    to: profile.email,
    ...email,
  });

  revalidatePath("/member");
  return { ok: true };
}
