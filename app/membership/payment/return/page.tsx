import Link from "next/link";
import { redirect } from "next/navigation";
import { Container, Icon } from "@/components/ui";
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
  if (!profile) redirect("/join");

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
    <div className="bg-txsn-paper">
      <Container className="py-16 lg:py-24">
        <div className="mx-auto max-w-md">
          {succeeded ? (
            <div className="rounded-2xl border border-txsn-mint-soft bg-white p-8 text-center shadow-sm shadow-txsn-teal-deep/5">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-txsn-teal text-white">
                <Icon name="check" size={28} />
              </div>
              <h1 className="font-serif text-2xl font-medium text-txsn-teal-deep">
                Payment received
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-[14.5px] leading-relaxed text-txsn-slate">
                Thanks for joining TSN. Your membership is being activated — this
                usually takes just a few moments.
              </p>
              <div className="mt-7 flex flex-col items-center gap-3">
                <Link
                  href="/member"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-txsn-teal px-5 py-3.5 text-[14.5px] font-semibold text-white shadow-sm shadow-txsn-teal-deep/20 transition-all duration-150 hover:bg-txsn-teal-mid hover:shadow-md"
                >
                  Go to my account
                  <Icon name="arrow" size={16} />
                </Link>
                <Link
                  href="/member/invoices"
                  className="text-[13px] font-medium text-txsn-teal hover:underline"
                >
                  View invoice
                </Link>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-txsn-mint-soft bg-white p-8 text-center shadow-sm shadow-txsn-teal-deep/5">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-txsn-gold-soft text-txsn-gold">
                <Icon name="clock" size={26} />
              </div>
              <h1 className="font-serif text-2xl font-medium text-txsn-teal-deep">
                Payment not completed
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-[14.5px] leading-relaxed text-txsn-slate">
                No charge was made. You can try again to finish activating your
                membership.
              </p>
              <div className="mt-7">
                <Link
                  href="/membership/payment"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-txsn-teal px-5 py-3.5 text-[14.5px] font-semibold text-white shadow-sm shadow-txsn-teal-deep/20 transition-all duration-150 hover:bg-txsn-teal-mid hover:shadow-md"
                >
                  Return to payment
                  <Icon name="arrow" size={16} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
