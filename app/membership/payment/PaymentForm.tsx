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
          className="flex items-start gap-2.5 rounded-[10px] border border-[#fecdca] bg-[#fef3f2] px-4 py-3 text-[15px] leading-snug text-[#b42318]"
        >
          <span
            aria-hidden
            className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#b42318]"
          />
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={!stripe || submitting}
        aria-disabled={!stripe || submitting}
        className="btn btn-navy w-full"
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
            colorPrimary: "#002855",
            colorText: "#14202d",
            colorTextSecondary: "#475a6d",
            colorDanger: "#b42318",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSizeBase: "16px",
            borderRadius: "10px",
            spacingUnit: "4px",
          },
          rules: {
            ".Input": {
              border: "1px solid #cdd6e0",
              boxShadow: "none",
              padding: "12px",
            },
            ".Input:focus": {
              border: "1px solid #002855",
              boxShadow: "0 0 0 3px rgba(0,40,85,0.15)",
            },
            ".Label": {
              fontWeight: "600",
              color: "#14202d",
            },
          },
        },
      }}
    >
      <CheckoutForm returnUrl={returnUrl} />
    </Elements>
  );
}
