import Link from "next/link";
import { redirect } from "next/navigation";
import { Button, Container, Icon } from "@/components/ui";
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
    <div>
      <Container className="py-16 lg:py-24">
        <div className="mx-auto max-w-md">
          {succeeded ? (
            <div role="status" className="card p-8 text-center sm:p-10">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="success-check"
                >
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1 className="font-serif text-[clamp(1.7rem,2.6vw,2.1rem)] font-bold leading-tight text-navy">
                Payment received
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-[16px] leading-relaxed text-slate">
                Thanks for joining TSN. Your membership is being activated. This
                usually takes just a few moments.
              </p>
              <div className="mt-7 flex flex-col items-center gap-4">
                <Button href="/member" arrow className="w-full">
                  Go to my account
                </Button>
                <Link
                  href="/member/invoices"
                  className="text-[15px] font-semibold text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy"
                >
                  View invoice
                </Link>
              </div>
            </div>
          ) : (
            <div className="card p-8 text-center sm:p-10">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-line bg-surface-2 text-navy">
                <Icon name="clock" size={26} />
              </div>
              <h1 className="font-serif text-[clamp(1.7rem,2.6vw,2.1rem)] font-bold leading-tight text-navy">
                Payment not completed
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-[16px] leading-relaxed text-slate">
                No charge was made. You can try again to finish activating your
                membership.
              </p>
              <div className="mt-7">
                <Button href="/membership/payment" arrow className="w-full">
                  Return to payment
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
