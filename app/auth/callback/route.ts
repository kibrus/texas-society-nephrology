import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Exchanges the one-time `code` from an email link (password recovery, and
// later email confirmation) for a session, then forwards to `next`. Supabase
// redirects password-reset links here; after the exchange the user has a
// (recovery) session and can set a new password on /reset-password.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/member";

  // Only allow same-site relative redirects to avoid an open-redirect.
  const safeNext = next.startsWith("/") ? next : "/member";

  if (code) {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
  }

  return NextResponse.redirect(`${origin}/sign-in?error=auth`);
}
