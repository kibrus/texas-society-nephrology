import Link from "next/link";
import { PageHeader } from "@/components/ui";
import { AuthCard } from "@/components/auth/AuthUI";
import { getCurrentUser } from "@/lib/auth";
import { ResetPasswordForm } from "./ResetPasswordForm";

// Reads auth state per request, so it must render dynamically.
export const dynamic = "force-dynamic";

export default async function ResetPasswordPage() {
  const user = await getCurrentUser();

  return (
    <>
      <PageHeader
        eyebrow="MEMBER ACCESS"
        title="Set a new password"
        intro="Choose a new password for your TSN account."
      />
      <AuthCard>
        {user ? (
          <ResetPasswordForm />
        ) : (
          <div className="text-center space-y-3">
            <p className="text-[14px] text-txsn-slate">
              This reset link is invalid or has expired.
            </p>
            <Link
              href="/forgot-password"
              className="inline-block text-[14px] text-txsn-teal font-medium hover:underline"
            >
              Request a new reset link
            </Link>
          </div>
        )}
      </AuthCard>
    </>
  );
}
