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
    <div className="bg-txsn-paper">
      <Container className="py-14 lg:py-20">
        <div className="mx-auto max-w-md">
          {/* Heading */}
          <div className="mb-8 text-center">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-txsn-gold">
              Membership · Step 3 of 3
            </div>
            <h1 className="font-serif text-[2rem] font-medium leading-tight text-txsn-teal-deep">
              Complete your payment
            </h1>
            <p className="mx-auto mt-2.5 max-w-sm text-[14.5px] leading-relaxed text-txsn-slate">
              Enter your card details to activate your TSN membership.
            </p>
          </div>

          {/* Order summary */}
          <div className="rounded-xl border border-txsn-mint-soft bg-white shadow-sm shadow-txsn-teal-deep/5">
            <div className="flex items-center justify-between px-6 py-5">
              <div>
                <div className="text-[12px] uppercase tracking-wide text-txsn-slate">
                  Membership tier
                </div>
                <div className="mt-0.5 text-[16px] font-semibold text-txsn-teal-deep">
                  {tier?.label ?? profile.tier}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[20px] font-bold text-txsn-teal-deep">
                  {tier?.priceLabel}
                </div>
                <div className="text-[12px] text-txsn-slate">per year</div>
              </div>
            </div>
            <div className="flex items-center gap-2 border-t border-txsn-mint-soft/50 bg-txsn-wash/60 px-6 py-3">
              <Icon name="clock" size={14} className="text-txsn-teal" />
              <span className="text-[12.5px] text-txsn-slate">
                Renews automatically each year. Cancel anytime from your account.
              </span>
            </div>
          </div>

          {/* Payment */}
          <div className="mt-6 rounded-xl border border-txsn-mint-soft bg-white p-6 shadow-sm shadow-txsn-teal-deep/5">
            {"error" in result ? (
              <div className="rounded-lg bg-txsn-gold-soft p-5">
                <p className="text-[14px] text-txsn-teal-deep">
                  {result.error} If this keeps happening, please contact us.
                </p>
              </div>
            ) : (
              <>
                <PaymentForm clientSecret={result.clientSecret} returnUrl={returnUrl} />
                <p className="mt-4 text-[11.5px] leading-relaxed text-txsn-slate">
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
          <div className="mt-5 flex items-center justify-center gap-2 text-[12px] text-txsn-slate">
            <Icon name="check" size={14} className="text-txsn-teal" />
            <span>
              Secured by{" "}
              <a
                href="https://stripe.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-txsn-teal hover:underline"
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
