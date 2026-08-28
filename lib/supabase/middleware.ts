import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { publicEnv } from "@/lib/env/public";
import type { Database } from "./database.types";

// Refreshes the Supabase auth session on each request and writes the rotated
// cookies onto the outgoing response, so server components always see a valid
// session. Follows the official @supabase/ssr middleware pattern.
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Do NOT run any code between creating the client and getUser(). getUser()
  // revalidates the token with Supabase and triggers the cookie refresh; code
  // in between can cause the session to be intermittently dropped.
  //
  // Guard it with a timeout: this middleware runs site-wide, so if a slow or
  // unavailable Supabase Auth response hangs getUser(), every route would 504.
  // On timeout we serve the page without refreshing the session this cycle; the
  // next request refreshes normally once Supabase is responsive again.
  await Promise.race([
    supabase.auth.getUser(),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ]);

  return supabaseResponse;
}
