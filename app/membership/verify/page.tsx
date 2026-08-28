import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { SIGNUP_EMAIL_COOKIE } from "../signup-shared";
import { VerifyForm } from "./VerifyForm";

export const metadata = { title: "Verify your email · TSN" };

// Depends on the signup cookie set by /join.
export const dynamic = "force-dynamic";

export default function VerifyPage() {
  const email = cookies().get(SIGNUP_EMAIL_COOKIE)?.value;
  if (!email) redirect("/join");

  return (
    <AuthShell
      eyebrow="Membership · Step 2 of 3"
      title="Verify your email"
      subtitle="One quick step to confirm it's really you, then you'll choose your tier and complete payment."
      footer={
        <p className="text-center text-[13.5px] text-txsn-slate">
          Wrong email?{" "}
          <Link
            href="/join"
            className="font-semibold text-txsn-teal hover:underline"
          >
            Start over
          </Link>
        </p>
      }
    >
      <VerifyForm email={email} />
    </AuthShell>
  );
}
