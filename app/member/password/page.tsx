import Link from "next/link";
import { redirect } from "next/navigation";
import { Container, Icon } from "@/components/ui";
import { getCurrentUser } from "@/lib/auth";
import { ChangePasswordForm } from "./ChangePasswordForm";

export const metadata = { title: "Change password · TSN" };

// Reads auth state per request.
export const dynamic = "force-dynamic";

export default async function ChangePasswordPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="bg-txsn-paper">
      <Container className="py-14 lg:py-20">
        <div className="mx-auto max-w-md">
          <Link
            href="/member"
            className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-txsn-slate transition-colors hover:text-txsn-teal"
          >
            <Icon name="arrow" size={14} className="rotate-180" />
            Back to my account
          </Link>

          <div className="mb-6">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-txsn-gold">
              Account security
            </div>
            <h1 className="font-serif text-[1.9rem] font-medium leading-tight text-txsn-teal-deep">
              Change password
            </h1>
            <p className="mt-2 text-[14.5px] leading-relaxed text-txsn-slate">
              Enter your current password and choose a new one.
            </p>
          </div>

          <div className="rounded-2xl border border-txsn-mint-soft bg-white p-7 shadow-sm shadow-txsn-teal-deep/5">
            <ChangePasswordForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
