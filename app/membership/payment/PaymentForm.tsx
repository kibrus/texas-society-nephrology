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
      <PaymentElement
        options={{ wallets: { applePay: "never", googlePay: "never" } }}
      />
      {error && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13px] text-red-700"
        >
          <span
            aria-hidden
            className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500"
          />
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-txsn-teal px-5 py-3.5 text-[14.5px] font-semibold text-white shadow-sm shadow-txsn-teal-deep/20 transition-all duration-150 hover:bg-txsn-teal-mid hover:shadow-md hover:shadow-txsn-teal-deep/25 focus:outline-none focus-visible:ring-4 focus-visible:ring-txsn-mint/30 disabled:opacity-60 disabled:shadow-none"
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
          variables: {
            colorPrimary: "#1A56A0",
            colorText: "#0d1e30",
            colorDanger: "#b91c1c",
            fontFamily: "Inter, system-ui, sans-serif",
            borderRadius: "8px",
            spacingUnit: "4px",
          },
          rules: {
            ".Input": {
              border: "1px solid #B3D4ED",
              boxShadow: "none",
              padding: "12px",
            },
            ".Input:focus": {
              border: "1px solid #1A56A0",
              boxShadow: "0 0 0 4px rgba(90,159,212,0.25)",
            },
            ".Label": {
              fontWeight: "500",
              color: "#0D1F3C",
            },
          },
        },
      }}
    >
      <CheckoutForm returnUrl={returnUrl} />
    </Elements>
  );
}
