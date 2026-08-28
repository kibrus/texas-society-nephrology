import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { publicEnv } from "@/lib/env/public";
import type { Database } from "./database.types";

// Server (Server Component / Route Handler / Server Action) Supabase client.
// Reads and writes the session from the request cookies. Uses the PUBLISHABLE
// key and respects Row-Level Security — this is the client to use for anything
// acting on behalf of the signed-in user. For privileged, RLS-bypassing work
// use lib/supabase/admin.ts instead.
//
// Note: in Next.js 14.2 `cookies()` is synchronous (it becomes async in 15).
export function createSupabaseServerClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // `set` throws when called from a Server Component (read-only
            // cookie context). Session refresh is handled in middleware, so
            // this is safe to ignore here.
          }
        },
      },
    },
  );
}
