"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { PageHeader, Icon } from "@/components/ui";
import {
  AuthCard,
  FieldLabel,
  FormError,
  SubmitButton,
  authField,
} from "@/components/auth/AuthUI";
import { requestPasswordReset, type ForgotState } from "./actions";

const initialState: ForgotState = {};

export default function ForgotPasswordPage() {
  const [state, formAction] = useFormState(
    requestPasswordReset,
    initialState,
  );

  return (
    <>
      <PageHeader
        eyebrow="MEMBER ACCESS"
        title="Reset your password"
        intro="Enter your email and we'll send you a link to set a new password."
      />
      <AuthCard>
        {state.sent ? (
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-txsn-teal flex items-center justify-center text-white mx-auto mb-3">
              <Icon name="check" size={24} />
            </div>
            <h2 className="font-serif text-xl text-txsn-teal-deep font-medium mb-1">
              Check your email
            </h2>
            <p className="text-[14px] text-txsn-slate">
              If an account exists for that address, a password reset link is on
              its way.
            </p>
          </div>
        ) : (
          <form action={formAction} className="space-y-4">
            <div>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={authField}
              />
            </div>

            <FormError message={state.error} />

            <SubmitButton label="Send reset link" pendingLabel="Sending..." />
          </form>
        )}

        <p className="mt-6 text-center text-[13px] text-txsn-slate">
          <Link href="/sign-in" className="text-txsn-teal font-medium hover:underline">
            Back to sign in
          </Link>
        </p>
      </AuthCard>
    </>
  );
}
