import Link from "next/link";
import { redirect } from "next/navigation";
import { PageHeader, Container, Button, Status } from "@/components/ui";
import { STATUS_LABELS } from "@/lib/membership";
import { getSessionContext } from "@/lib/auth";

// Landing for members whose access has lapsed (expired / cancelled). Explains
// the state and sends them into the existing Payment Element flow, which reuses
// their Stripe customer and creates a fresh subscription. Membership reactivates
// only via the verified invoice.paid webhook.
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
  // Never signed up fully -> start signup. Already active -> nothing to renew.
  // Mid-signup -> finish the first payment rather than "renew".
  if (!profile) redirect("/join");
  if (profile.membership_status === "active") redirect("/member");
  if (profile.membership_status === "pending_payment") {
    redirect("/membership/payment");
  }

  const expiredOn = formatDate(profile.dues_paid_until);
  const isCancelled = profile.membership_status === "cancelled";

  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title={isCancelled ? "Rejoin TSN" : "Renew your membership"}
      />
      <section className="pt-14 pb-4 md:pt-16">
        <Container>
          <div className="max-w-lg">
            <div className="card p-8">
              <Status tone="past">
                {STATUS_LABELS[profile.membership_status] ?? profile.membership_status}
              </Status>
              <p className="mt-4 text-[17px] leading-[1.65] text-ink">
                {isCancelled
                  ? "Your membership has been cancelled. Rejoin to restore access to member benefits."
                  : expiredOn
                    ? `Your membership expired on ${expiredOn}. Renew to restore access.`
                    : "Your membership isn't active. Renew to restore access to member benefits."}
              </p>
              <div className="mt-7">
                <Button href="/membership/payment" arrow>
                  {isCancelled ? "Rejoin TSN" : "Renew now"}
                </Button>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/member" className="link">
                <span aria-hidden="true">←</span>
                Back to my account
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
