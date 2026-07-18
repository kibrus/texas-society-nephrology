import { createBrowserClient } from "@supabase/ssr";

// Reads the Supabase URL and public key from environment variables.
// These are set in .env.local (see .env.example).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
