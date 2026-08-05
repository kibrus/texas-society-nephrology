"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { publicEnv } from "@/lib/env/public";

const stripePromise = loadStripe(publicEnv.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ returnUrl }: { returnUrl: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setError(undefined);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl },
    });

    // Only reached if confirmation fails before redirect (e.g. validation or
    // card errors). On success the browser is redirected to return_url.
    if (error) {
      setError(error.message ?? "Payment could not be completed. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement />
      {error && <p className="text-[13px] text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="inline-flex w-full items-center justify-center gap-2 bg-txsn-teal hover:bg-txsn-teal-mid disabled:opacity-60 text-white text-[14px] font-medium px-5 py-3 rounded-md transition-colors"
      >
        {submitting ? "Processing..." : "Pay & activate membership"}
      </button>
    </form>
  );
}

export function PaymentForm({
  clientSecret,
  returnUrl,
}: {
  clientSecret: string;
  returnUrl: string;
}) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: { colorPrimary: "#0e7c7b" },
        },
      }}
    >
      <CheckoutForm returnUrl={returnUrl} />
    </Elements>
  );
}
