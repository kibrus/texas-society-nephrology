import Link from "next/link";
import { redirect } from "next/navigation";
import { PageHeader, Container } from "@/components/ui";
import { getSessionContext } from "@/lib/auth";

// Landing for members whose access has lapsed. The actual Stripe-backed renew
// flow is wired up in a later stage; for now this explains the state and points
// to the join/renew page.
export const dynamic = "force-dynamic";

function formatDate(date: string | null) {
  if (!date) return null;
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function RenewPage() {
  const { user, profile } = await getSessionContext();
  if (!user) redirect("/sign-in");
  if (profile?.membership_status === "active") redirect("/member");

  const expiredOn = formatDate(profile?.dues_paid_until ?? null);
  const isCancelled = profile?.membership_status === "cancelled";

  return (
    <>
      <PageHeader
        eyebrow="MEMBERSHIP"
        title={isCancelled ? "Rejoin TSN" : "Renew your membership"}
      />
      <Container className="py-14">
        <div className="max-w-md space-y-5">
          <div className="bg-txsn-gold-soft rounded-xl p-6">
            <p className="text-[14px] text-txsn-teal-deep">
              {isCancelled
                ? "Your membership has been cancelled. Rejoin to restore access to member benefits."
                : expiredOn
                  ? `Your membership expired on ${expiredOn}. Renew to restore access.`
                  : "Your membership isn't active. Renew to restore access to member benefits."}
            </p>
          </div>
          <Link
            href="/membership/join"
            className="inline-flex items-center gap-2 bg-txsn-teal hover:bg-txsn-teal-mid text-white text-[14px] font-medium px-5 py-3 rounded-md transition-colors"
          >
            {isCancelled ? "Rejoin TSN" : "Renew now"}
          </Link>
          <div>
            <Link
              href="/member"
              className="text-[13px] text-txsn-slate hover:text-txsn-teal transition-colors"
            >
              ← Back to my account
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
