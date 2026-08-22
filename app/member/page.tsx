import Link from "next/link";
import { redirect } from "next/navigation";
import { Container, Icon } from "@/components/ui";
import { getSessionContext } from "@/lib/auth";
import { TIER_LABELS, STATUS_LABELS } from "@/lib/membership";
import { ProfileForm } from "./ProfileForm";
import { CancelRenewalButton } from "./CancelRenewalButton";
import { signOut } from "./actions";

// Reads auth state per request.
export const dynamic = "force-dynamic";

function StatusBadge({ status }: { status: string }) {
  const active = status === "active";
  const classes = active
    ? "bg-txsn-mint/20 text-white ring-1 ring-txsn-mint/50"
    : "bg-txsn-gold/25 text-white ring-1 ring-txsn-gold/50";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold ${classes}`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${active ? "bg-txsn-mint-soft" : "bg-txsn-gold"}`}
      />
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
      <div className="bg-txsn-paper">
        <Container className="py-16 lg:py-24">
          <div className="mx-auto max-w-md">
            <div className="rounded-2xl border border-txsn-mint-soft bg-white p-8 text-center shadow-sm shadow-txsn-teal-deep/5">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-txsn-gold-soft text-txsn-gold">
                <Icon name="clock" size={26} />
              </div>
              <h1 className="font-serif text-2xl font-medium text-txsn-teal-deep">
                Complete your membership
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-[14.5px] leading-relaxed text-txsn-slate">
                You don&apos;t have an active membership yet. Choose a tier to
                finish joining TSN.
              </p>
              <div className="mt-4 rounded-lg bg-txsn-wash px-4 py-3 text-left">
                <div className="text-[12px] uppercase tracking-wide text-txsn-slate">
                  Signed in as
                </div>
                <div className="mt-0.5 text-[14.5px] font-medium text-txsn-teal-deep">
                  {user.email}
                </div>
              </div>
              <div className="mt-6 flex flex-col items-center gap-3">
                <Link
                  href="/join"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-txsn-teal px-5 py-3.5 text-[14.5px] font-semibold text-white shadow-sm shadow-txsn-teal-deep/20 transition-all duration-150 hover:bg-txsn-teal-mid hover:shadow-md"
                >
                  Join TSN
                  <Icon name="arrow" size={16} />
                </Link>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="text-[13px] font-medium text-txsn-slate transition-colors hover:text-txsn-teal"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  const isActive = profile.membership_status === "active";

  return (
    <div className="bg-txsn-paper">
      {/* Hero band */}
      <div className="relative overflow-hidden bg-txsn-teal-deep">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-txsn-mint/10 blur-3xl"
        />
        <Container className="relative py-12 lg:py-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-txsn-mint-soft">
                My account
              </div>
              <h1 className="mt-1.5 font-serif text-[2rem] font-medium leading-tight text-white">
                Welcome, {profile.first_name}
              </h1>
            </div>
            <StatusBadge status={profile.membership_status} />
          </div>
        </Container>
      </div>

      <Container className="py-12 lg:py-16">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-5">
          {/* Membership summary */}
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl border border-txsn-mint-soft bg-white shadow-sm shadow-txsn-teal-deep/5">
              <div className="border-b border-txsn-mint-soft/60 px-6 py-5">
                <h2 className="font-serif text-lg font-medium text-txsn-teal-deep">
                  Membership
                </h2>
              </div>

              <dl className="grid gap-x-6 gap-y-5 px-6 py-6 sm:grid-cols-2">
                <div>
                  <dt className="text-[12px] uppercase tracking-wide text-txsn-slate">
                    Tier
                  </dt>
                  <dd className="mt-1 text-[15px] font-semibold text-txsn-teal-deep">
                    {TIER_LABELS[profile.tier] ?? profile.tier}
                  </dd>
                </div>
                <div>
                  <dt className="text-[12px] uppercase tracking-wide text-txsn-slate">
                    Dues paid until
                  </dt>
                  <dd className="mt-1 text-[15px] font-semibold text-txsn-teal-deep">
                    {formatDate(profile.dues_paid_until)}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-[12px] uppercase tracking-wide text-txsn-slate">
                    Email
                  </dt>
                  <dd className="mt-1 text-[15px] font-semibold text-txsn-teal-deep">
                    {profile.email}
                  </dd>
                </div>
              </dl>

              {/* Status-specific actions */}
              {profile.membership_status === "pending_payment" && (
                <div className="border-t border-txsn-mint-soft/60 bg-txsn-wash/60 px-6 py-4">
                  <Link
                    href="/membership/payment"
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-txsn-teal hover:underline"
                  >
                    Complete your payment
                    <Icon name="arrow" size={14} />
                  </Link>
                </div>
              )}
              {!isActive &&
                profile.membership_status !== "pending_payment" && (
                  <div className="border-t border-txsn-mint-soft/60 bg-txsn-wash/60 px-6 py-4">
                    <Link
                      href="/member/renew"
                      className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-txsn-teal hover:underline"
                    >
                      Renew membership
                      <Icon name="arrow" size={14} />
                    </Link>
                  </div>
                )}

              {/* Auto-renewal control for active subscribers */}
              {isActive && profile.stripe_subscription_id && (
                <div className="border-t border-txsn-mint-soft/60 px-6 py-5">
                  {profile.cancel_at_period_end ? (
                    <p className="text-[13.5px] leading-relaxed text-txsn-slate">
                      Automatic renewal is off. Your membership stays active
                      until{" "}
                      <span className="font-semibold text-txsn-teal-deep">
                        {formatDate(profile.dues_paid_until)}
                      </span>
                      .
                    </p>
                  ) : (
                    <CancelRenewalButton />
                  )}
                </div>
              )}

              <div className="border-t border-txsn-mint-soft/60 px-6 py-4">
                <Link
                  href="/member/invoices"
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-txsn-teal hover:underline"
                >
                  View billing history
                  <Icon name="arrow" size={14} />
                </Link>
              </div>

              <div className="border-t border-txsn-mint-soft/60 px-6 py-4">
                <Link
                  href="/member/password"
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-txsn-teal hover:underline"
                >
                  Change password
                  <Icon name="arrow" size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Editable profile */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-txsn-mint-soft bg-white p-6 shadow-sm shadow-txsn-teal-deep/5">
              <h2 className="mb-4 font-serif text-lg font-medium text-txsn-teal-deep">
                Your details
              </h2>
              <ProfileForm
                firstName={profile.first_name}
                lastName={profile.last_name}
                profession={profile.profession}
                phone={profile.phone}
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-5xl justify-end border-t border-txsn-mint-soft/60 pt-6">
          <form action={signOut}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg border border-txsn-mint-soft px-5 py-2.5 text-[13.5px] font-medium text-txsn-slate transition-colors hover:bg-white hover:text-txsn-teal"
            >
              Sign out
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}
