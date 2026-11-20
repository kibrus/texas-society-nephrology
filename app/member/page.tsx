import { redirect } from "next/navigation";
import { PageHeader, Container, Icon, Button, ArrowLink, Status } from "@/components/ui";
import { getSessionContext } from "@/lib/auth";
import { TIER_LABELS, STATUS_LABELS } from "@/lib/membership";
import { ProfileForm } from "./ProfileForm";
import { CancelRenewalButton } from "./CancelRenewalButton";
import { signOut } from "./actions";

// Reads auth state per request.
export const dynamic = "force-dynamic";

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
        <PageHeader eyebrow="My account" title="Complete your membership" />
        <section className="pad">
          <Container>
            <div className="card mx-auto max-w-lg p-8 text-center md:p-10">
              <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-2 text-navy">
                <Icon name="clock" size={26} />
              </span>
              <p className="mx-auto max-w-sm text-[17px] leading-[1.65] text-slate">
                You don&apos;t have an active membership yet. Choose a tier to
                finish joining TSN.
              </p>
              <div className="mt-6 rounded-xl border border-line bg-surface px-5 py-4 text-left">
                <div className="text-[13.5px] font-semibold text-muted">Signed in as</div>
                <div className="mt-0.5 break-all text-[16px] font-semibold text-ink">
                  {user.email}
                </div>
              </div>
              <div className="mt-8 flex flex-col items-center gap-4">
                <Button href="/join" arrow className="w-full">
                  Join TSN
                </Button>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="text-[15px] font-semibold text-slate underline-offset-4 transition-colors hover:text-navy hover:underline"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            </div>
          </Container>
        </section>
      </>
    );
  }

  const isActive = profile.membership_status === "active";
  const statusLabel = STATUS_LABELS[profile.membership_status] ?? profile.membership_status;

  return (
    <>
      <PageHeader eyebrow="My account" title={`Welcome, ${profile.first_name}`} />

      <section className="pt-14 pb-4 md:pt-16">
        <Container>
          <div className="grid gap-7 lg:grid-cols-5">
            {/* Membership summary */}
            <div className="lg:col-span-3">
              <div className="card">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-7 py-6">
                  <h2 className="font-serif text-[22px] font-bold text-navy">Membership</h2>
                  <Status
                    tone={
                      isActive ? "live" : profile.membership_status === "pending_payment" ? "default" : "past"
                    }
                  >{statusLabel}</Status>
                </div>

                <dl className="grid gap-x-8 gap-y-6 px-7 py-7 sm:grid-cols-2">
                  <div>
                    <dt className="text-[13.5px] font-semibold text-muted">Tier</dt>
                    <dd className="mt-1 text-[17px] font-semibold text-ink">
                      {TIER_LABELS[profile.tier] ?? profile.tier}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[13.5px] font-semibold text-muted">Dues paid until</dt>
                    <dd className="mt-1 text-[17px] font-semibold text-ink">
                      {formatDate(profile.dues_paid_until)}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-[13.5px] font-semibold text-muted">Email</dt>
                    <dd className="mt-1 break-all text-[17px] font-semibold text-ink">
                      {profile.email}
                    </dd>
                  </div>
                </dl>

                {/* Status-specific actions */}
                {profile.membership_status === "pending_payment" && (
                  <div className="border-t border-line bg-surface px-7 py-5">
                    <Button href="/membership/payment" size="sm" arrow>
                      Complete your payment
                    </Button>
                  </div>
                )}
                {!isActive &&
                  profile.membership_status !== "pending_payment" && (
                    <div className="border-t border-line bg-surface px-7 py-5">
                      <Button href="/member/renew" size="sm" arrow>
                        Renew membership
                      </Button>
                    </div>
                  )}

                {/* Auto-renewal control for active subscribers */}
                {isActive && profile.stripe_subscription_id && (
                  <div className="border-t border-line px-7 py-5">
                    {profile.cancel_at_period_end ? (
                      <p className="text-[16px] leading-[1.65] text-slate">
                        Automatic renewal is off. Your membership stays active
                        until{" "}
                        <span className="font-semibold text-ink">
                          {formatDate(profile.dues_paid_until)}
                        </span>
                        .
                      </p>
                    ) : (
                      <CancelRenewalButton />
                    )}
                  </div>
                )}

                <div className="border-t border-line px-7 py-5">
                  <ArrowLink href="/member/invoices">View billing history</ArrowLink>
                </div>

                <div className="border-t border-line px-7 py-5">
                  <ArrowLink href="/member/password">Change password</ArrowLink>
                </div>
              </div>
            </div>

            {/* Editable profile */}
            <div className="lg:col-span-2">
              <div className="card p-7">
                <h2 className="mb-5 font-serif text-[22px] font-bold text-navy">Your details</h2>
                <ProfileForm
                  firstName={profile.first_name}
                  lastName={profile.last_name}
                  profession={profile.profession}
                  phone={profile.phone}
                />
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-end border-t border-line pt-8">
            <form action={signOut}>
              <Button type="submit" variant="outline" size="sm">
                Sign out
              </Button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}
