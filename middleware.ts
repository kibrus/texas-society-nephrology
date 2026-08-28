import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // Only run on routes whose server code reads the auth session, so a Supabase
  // Auth call is never on the path of a marketing page (faster, and insulated
  // from any auth-service slowness). The header reads auth on the client, so
  // marketing pages don't need the server-side session refresh.
  matcher: [
    "/member/:path*",
    "/membership/:path*",
    "/join",
    "/sign-in",
    "/forgot-password/:path*",
    "/reset-password",
    "/auth/:path*",
  ],
};
