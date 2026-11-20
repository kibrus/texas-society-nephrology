import { redirect } from "next/navigation";
import { Container, Icon } from "@/components/ui";
import { getSessionContext } from "@/lib/auth";
import { ensurePaymentClientSecret } from "@/lib/stripe/subscription";
import { publicEnv } from "@/lib/env/public";
import { TIER_OPTIONS } from "@/lib/membership";
import { PaymentForm } from "./PaymentForm";

export const metadata = { title: "Complete payment · TSN" };

// Creates/reads a Stripe subscription per request; must never be cached.
export const dynamic = "force-dynamic";

export default async function PaymentPage() {
  const { user, profile } = await getSessionContext();
  if (!user) redirect("/sign-in");
  if (!profile) redirect("/join");
  if (profile.membership_status === "active") redirect("/member");

  const result = await ensurePaymentClientSecret(profile);
  if ("alreadyActive" in result) redirect("/member");

  const tier = TIER_OPTIONS.find((t) => t.value === profile.tier);
  const returnUrl = `${publicEnv.NEXT_PUBLIC_SITE_URL}/membership/payment/return`;

  return (
    <div>
      <Container className="py-14 lg:py-20">
        <div className="mx-auto max-w-lg">
          {/* Heading */}
          <div className="mb-8 text-center">
            <div className="mb-3 text-[14px] font-semibold text-navy">
              Membership · Step 3 of 3
            </div>
            <h1 className="font-serif text-[clamp(1.9rem,3vw,2.4rem)] font-bold leading-tight tracking-[-0.015em] text-navy">
              Complete your payment
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-[16px] leading-relaxed text-slate">
              Enter your card details to activate your TSN membership.
            </p>
          </div>

          {/* Order summary */}
          <div className="card">
            <div className="flex items-center justify-between gap-4 px-6 py-5 sm:px-7">
              <div>
                <div className="text-[14px] text-slate">Membership tier</div>
                <div className="mt-0.5 font-serif text-[20px] font-bold text-navy">
                  {tier?.label ?? profile.tier}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[22px] font-bold text-navy">
                  {tier?.priceLabel}
                </div>
                <div className="text-[14px] text-slate">per year</div>
              </div>
            </div>
            <div className="flex items-start gap-2.5 border-t border-line bg-surface-2 px-6 py-3.5 sm:px-7">
              <Icon name="clock" size={16} className="mt-0.5 flex-shrink-0 text-navy" />
              <span className="text-[14px] text-slate">
                Renews automatically each year. Cancel anytime from your account.
              </span>
            </div>
          </div>

          {/* Payment */}
          <div className="card mt-6 p-6 sm:p-7">
            {"error" in result ? (
              <div
                role="alert"
                className="rounded-[10px] border border-[#fecdca] bg-[#fef3f2] p-5"
              >
                <p className="text-[15px] text-[#b42318]">
                  {result.error} If this keeps happening, please contact us.
                </p>
              </div>
            ) : (
              <>
                <PaymentForm clientSecret={result.clientSecret} returnUrl={returnUrl} />
                <p className="mt-5 text-[14px] leading-relaxed text-slate">
                  By providing your card information, you allow Texas Society of
                  Nephrology sandbox to charge your card for the amount above and
                  to automatically renew your membership each year until you
                  cancel. You can cancel automatic renewal anytime from your
                  account.
                </p>
              </>
            )}
          </div>

          {/* Trust footer */}
          <div className="mt-6 flex items-center justify-center gap-2 text-[14px] text-slate">
            <Icon name="lock" size={15} className="text-navy" />
            <span>
              Secured by{" "}
              <a
                href="https://stripe.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy"
              >
                Stripe
              </a>
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
}
