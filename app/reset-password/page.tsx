import Link from "next/link";
import { AuthShell, authLink } from "@/components/auth/AuthShell";
import { getCurrentUser } from "@/lib/auth";
import { ResetPasswordForm } from "./ResetPasswordForm";

// Reads auth state per request, so it must render dynamically.
export const dynamic = "force-dynamic";

export default async function ResetPasswordPage() {
  const user = await getCurrentUser();

  return (
    <AuthShell
      eyebrow="Member access"
      title="Set a new password"
      subtitle="Choose a new password for your TSN account."
    >
      {user ? (
        <ResetPasswordForm />
      ) : (
        <div className="card-line p-7 text-center">
          <p role="alert" className="text-[16px] text-[#b42318]">
            This reset link is invalid or has expired.
          </p>
          <Link
            href="/forgot-password"
            className={`${authLink} mt-4 inline-block text-[15px]`}
          >
            Request a new reset link
          </Link>
        </div>
      )}
    </AuthShell>
  );
}
