import { redirect } from "next/navigation";
import { PageHeader, Container } from "@/components/ui";
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
  if (!profile) redirect("/membership/join");
  if (profile.membership_status === "active") redirect("/member");

  const result = await ensurePaymentClientSecret(profile);
  if ("alreadyActive" in result) redirect("/member");

  const tier = TIER_OPTIONS.find((t) => t.value === profile.tier);
  const returnUrl = `${publicEnv.NEXT_PUBLIC_SITE_URL}/membership/payment/return`;

  return (
    <>
      <PageHeader
        eyebrow="MEMBERSHIP"
        title="Complete your payment"
        intro="Enter your payment details to activate your TSN membership."
      />
      <Container className="py-14">
        <div className="max-w-md space-y-6">
          <div className="bg-txsn-wash rounded-xl p-5 flex items-center justify-between">
            <div>
              <div className="text-[12px] text-txsn-slate">Membership tier</div>
              <div className="text-[15px] font-medium text-txsn-teal-deep">
                {tier?.label ?? profile.tier}
              </div>
            </div>
            <div className="text-[15px] font-medium text-txsn-gold">
              {tier?.priceLabel}
            </div>
          </div>

          {"error" in result ? (
            <div className="bg-txsn-gold-soft rounded-xl p-5">
              <p className="text-[14px] text-txsn-teal-deep">
                {result.error} If this keeps happening, please contact us.
              </p>
            </div>
          ) : (
            <PaymentForm clientSecret={result.clientSecret} returnUrl={returnUrl} />
          )}

          <p className="text-[12px] text-txsn-slate">
            Dues renew automatically each year. You can cancel anytime from your
            account.
          </p>
        </div>
      </Container>
    </>
  );
}
