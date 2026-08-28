import "server-only";
import { createClient } from "@supabase/supabase-js";
import { serverEnv } from "@/lib/env/server";
import type { Database } from "./database.types";

// Privileged Supabase client using the SECRET key. This BYPASSES Row-Level
// Security and can read/write any row. Import ONLY from trusted server modules
// (e.g. the verified Stripe webhook handler) and only after you have
// authorized the caller. Never expose it to a Client Component or return its
// results unfiltered to the browser.
export function createSupabaseAdminClient() {
  return createClient<Database>(
    serverEnv.NEXT_PUBLIC_SUPABASE_URL,
    serverEnv.SUPABASE_SECRET_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
