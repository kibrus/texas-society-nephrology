import { redirect } from "next/navigation";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { getCurrentUser } from "@/lib/auth";
import { SignupForm } from "./SignupForm";

export const metadata = { title: "Join TSN · TSN" };

// Reads auth state per request to bounce already-signed-in users.
export const dynamic = "force-dynamic";

export default async function JoinPage() {
  const user = await getCurrentUser();
  if (user) redirect("/member");

  return (
    <AuthShell
      eyebrow="Membership"
      title="Join TSN"
      subtitle="Create your account, verify your email, and choose a membership tier. Dues are billed after verification."
      footer={
        <p className="text-center text-[13.5px] text-txsn-slate">
          Already a member?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-txsn-teal hover:underline"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}
