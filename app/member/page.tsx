import Link from "next/link";
import { redirect } from "next/navigation";
import { PageHeader, Container } from "@/components/ui";
import { getSessionContext } from "@/lib/auth";
import { TIER_LABELS, STATUS_LABELS } from "@/lib/membership";
import { ProfileForm } from "./ProfileForm";
import { signOut } from "./actions";

// Reads auth state per request.
export const dynamic = "force-dynamic";

function StatusBadge({ status }: { status: string }) {
  const active = status === "active";
  const classes = active
    ? "bg-txsn-teal/10 text-txsn-teal"
    : "bg-txsn-gold-soft text-txsn-gold";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-medium ${classes}`}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

function formatDate(date: string | null) {
  if (!date) return "—";
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function MemberPage() {
  const { user, profile } = await getSessionContext();
  if (!user) redirect("/sign-in");

  // Signed in but no profile yet (hasn't completed signup/payment).
  if (!profile) {
    return (
      <>
        <PageHeader eyebrow="MY ACCOUNT" title="Complete your membership" />
        <Container className="py-14">
          <div className="max-w-md space-y-4">
            <div className="bg-txsn-wash rounded-xl p-6 space-y-1">
              <div className="text-[13px] text-txsn-slate">Signed in as</div>
              <div className="text-[15px] font-medium text-txsn-teal-deep">
                {user.email}
              </div>
            </div>
            <p className="text-[14px] text-txsn-slate">
              You don&apos;t have an active membership yet. Choose a tier to
              finish joining TSN.
            </p>
            <Link
              href="/membership/join"
              className="inline-flex items-center gap-2 bg-txsn-teal hover:bg-txsn-teal-mid text-white text-[14px] font-medium px-5 py-3 rounded-md transition-colors"
            >
              Join TSN
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="text-[13px] text-txsn-slate hover:text-txsn-teal transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="MY ACCOUNT" title={`Welcome, ${profile.first_name}`} />
      <Container className="py-14">
        <div className="max-w-2xl space-y-8">
          {/* Membership summary */}
          <div className="bg-txsn-wash rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg text-txsn-teal-deep font-medium">
                Membership
              </h2>
              <StatusBadge status={profile.membership_status} />
            </div>
            <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-[14px]">
              <div>
                <dt className="text-txsn-slate text-[12px]">Tier</dt>
                <dd className="text-txsn-teal-deep font-medium">
                  {TIER_LABELS[profile.tier] ?? profile.tier}
                </dd>
              </div>
              <div>
                <dt className="text-txsn-slate text-[12px]">Dues paid until</dt>
                <dd className="text-txsn-teal-deep font-medium">
                  {formatDate(profile.dues_paid_until)}
                </dd>
              </div>
              <div>
                <dt className="text-txsn-slate text-[12px]">Email</dt>
                <dd className="text-txsn-teal-deep font-medium">
                  {profile.email}
                </dd>
              </div>
            </dl>
            {profile.membership_status === "pending_payment" && (
              <div className="mt-4">
                <Link
                  href="/membership/payment"
                  className="text-[13px] text-txsn-teal font-medium hover:underline"
                >
                  Complete your payment →
                </Link>
              </div>
            )}
            {profile.membership_status !== "active" &&
              profile.membership_status !== "pending_payment" && (
                <div className="mt-4">
                  <Link
                    href="/member/renew"
                    className="text-[13px] text-txsn-teal font-medium hover:underline"
                  >
                    Renew membership →
                  </Link>
                </div>
              )}
          </div>

          {/* Editable profile */}
          <div>
            <h2 className="font-serif text-lg text-txsn-teal-deep font-medium mb-4">
              Your details
            </h2>
            <ProfileForm
              firstName={profile.first_name}
              lastName={profile.last_name}
              profession={profile.profession}
              phone={profile.phone}
            />
          </div>

          <form action={signOut} className="pt-2 border-t border-txsn-mint-soft/50">
            <button
              type="submit"
              className="mt-4 text-[14px] font-medium text-txsn-teal border border-txsn-mint-soft rounded-md px-5 py-2.5 hover:bg-txsn-wash transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </Container>
    </>
  );
}
