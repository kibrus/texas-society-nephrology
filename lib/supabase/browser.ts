import { createBrowserClient } from "@supabase/ssr";
import { publicEnv } from "@/lib/env/public";
import type { Database } from "./database.types";

// Browser (Client Component) Supabase client. Uses the PUBLISHABLE key only —
// never the secret key. Auth state is stored in cookies (via @supabase/ssr),
// not localStorage, so the server can read the session.
export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}
