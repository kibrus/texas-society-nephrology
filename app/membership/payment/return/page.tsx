import Link from "next/link";
import { redirect } from "next/navigation";
import { PageHeader, Container, Icon } from "@/components/ui";
import { getSessionContext } from "@/lib/auth";
import { stripe } from "@/lib/stripe/server";

export const metadata = { title: "Payment status · TSN" };

// Reads the PaymentIntent status per request; never cached.
export const dynamic = "force-dynamic";

type Search = { [key: string]: string | string[] | undefined };

export default async function PaymentReturnPage({
  searchParams,
}: {
  searchParams: Search;
}) {
  const { user, profile } = await getSessionContext();
  if (!user) redirect("/sign-in");
  if (!profile) redirect("/membership/join");

  const piParam = searchParams.payment_intent;
  const paymentIntentId = Array.isArray(piParam) ? piParam[0] : piParam;

  let status: string | null = null;
  if (paymentIntentId) {
    try {
      const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
      // Only trust an intent that belongs to this member's Stripe customer.
      if (intent.customer && intent.customer === profile.stripe_customer_id) {
        status = intent.status;
      }
    } catch {
      status = null;
    }
  }

  const succeeded = status === "succeeded" || status === "processing";

  return (
    <>
      <PageHeader eyebrow="MEMBERSHIP" title="Payment status" />
      <Container className="py-14">
        <div className="max-w-md">
          {succeeded ? (
            <div className="flex items-start gap-3 bg-txsn-wash rounded-xl p-6">
              <div className="text-txsn-teal mt-0.5">
                <Icon name="check" size={20} />
              </div>
              <div>
                <div className="text-[15px] font-medium text-txsn-teal-deep">
                  Payment received
                </div>
                <p className="text-[14px] text-txsn-slate mt-1">
                  Thanks for joining TSN. Your membership is being activated —
                  this usually takes a few moments. You can check your status on
                  your account page.
                </p>
                <Link
                  href="/member"
                  className="inline-flex items-center gap-2 mt-4 bg-txsn-teal hover:bg-txsn-teal-mid text-white text-[14px] font-medium px-5 py-2.5 rounded-md transition-colors"
                >
                  Go to my account
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-txsn-gold-soft rounded-xl p-6 space-y-4">
              <p className="text-[14px] text-txsn-teal-deep">
                Your payment wasn&apos;t completed. No charge was made. You can
                try again to finish activating your membership.
              </p>
              <Link
                href="/membership/payment"
                className="inline-flex items-center gap-2 bg-txsn-teal hover:bg-txsn-teal-mid text-white text-[14px] font-medium px-5 py-2.5 rounded-md transition-colors"
              >
                Return to payment
              </Link>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
