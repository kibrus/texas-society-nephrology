import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
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
        <div className="rounded-xl border border-txsn-mint-soft bg-white p-7 text-center shadow-sm shadow-txsn-teal-deep/5">
          <p className="text-[14px] text-txsn-slate">
            This reset link is invalid or has expired.
          </p>
          <Link
            href="/forgot-password"
            className="mt-3 inline-block text-[14px] font-semibold text-txsn-teal hover:underline"
          >
            Request a new reset link
          </Link>
        </div>
      )}
    </AuthShell>
  );
}
