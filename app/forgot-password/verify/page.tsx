import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { RESET_EMAIL_COOKIE } from "../shared";
import { ResetVerifyForm } from "./ResetVerifyForm";

export const metadata = { title: "Enter reset code · TSN" };

// Depends on the reset cookie set by /forgot-password.
export const dynamic = "force-dynamic";

export default function ResetVerifyPage() {
  const email = cookies().get(RESET_EMAIL_COOKIE)?.value;
  if (!email) redirect("/forgot-password");

  return (
    <AuthShell
      eyebrow="Member access"
      title="Enter your code"
      subtitle="Check your email for the 6-digit code, then choose a new password."
      footer={
        <p className="text-center text-[13.5px] text-txsn-slate">
          Wrong email?{" "}
          <Link
            href="/forgot-password"
            className="font-semibold text-txsn-teal hover:underline"
          >
            Start over
          </Link>
        </p>
      }
    >
      <ResetVerifyForm email={email} />
    </AuthShell>
  );
}
