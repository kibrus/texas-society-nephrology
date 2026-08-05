import "server-only";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

// Returns the authenticated Supabase user for the current request, or null.
// Uses getUser() (not getSession()) so the token is verified with Supabase
// rather than trusted from the cookie.
export async function getCurrentUser() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// Single fetch of user + their profile row (RLS restricts to the own row).
// profile is null when signed out, or signed in without a profile yet (a
// profile only exists after signup email verification).
export async function getSessionContext() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, profile: null as Profile | null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return { user, profile: profile as Profile | null };
}

// Guard for pages that only require a signed-in user (not active membership).
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  return user;
}

// Guard for member-only content. Enforces the spec's access rules:
//   signed out           -> /sign-in
//   no profile / not active (expired, cancelled, pending_payment) -> /member/renew
//   active               -> returns the profile
export async function requireActiveMember(): Promise<Profile> {
  const { user, profile } = await getSessionContext();
  if (!user) redirect("/sign-in");
  if (!profile || profile.membership_status !== "active") {
    redirect("/member/renew");
  }
  return profile;
}
