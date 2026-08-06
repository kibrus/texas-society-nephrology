"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { Icon } from "@/components/ui";
import {
  FieldLabel,
  FormError,
  SubmitButton,
  authField,
} from "@/components/auth/AuthUI";
import { requestPasswordReset, type ForgotState } from "./actions";

const initialState: ForgotState = {};

export default function ForgotPasswordPage() {
  const [state, formAction] = useFormState(requestPasswordReset, initialState);

  return (
    <AuthShell
      eyebrow="Member access"
      title="Reset your password"
      subtitle="Enter your email and we'll send you a link to set a new password."
      footer={
        <p className="text-center text-[13.5px] text-txsn-slate">
          <Link
            href="/sign-in"
            className="font-semibold text-txsn-teal hover:underline"
          >
            Back to sign in
          </Link>
        </p>
      }
    >
      {state.sent ? (
        <div className="rounded-xl border border-txsn-mint-soft bg-white p-7 text-center shadow-sm shadow-txsn-teal-deep/5">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-txsn-teal text-white">
            <Icon name="check" size={24} />
          </div>
          <h2 className="mb-1 font-serif text-xl font-medium text-txsn-teal-deep">
            Check your email
          </h2>
          <p className="text-[14px] text-txsn-slate">
            If an account exists for that address, a password reset link is on
            its way.
          </p>
        </div>
      ) : (
        <form action={formAction} className="space-y-5">
          <div>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className={authField}
            />
          </div>

          <FormError message={state.error} />

          <SubmitButton label="Send reset link" pendingLabel="Sending..." />
        </form>
      )}
    </AuthShell>
  );
}
