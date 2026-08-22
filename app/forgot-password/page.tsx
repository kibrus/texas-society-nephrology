"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
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
      subtitle="Enter your email and we'll send you a 6-digit code to reset your password."
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

        <SubmitButton label="Send code" pendingLabel="Sending..." />
      </form>
    </AuthShell>
  );
}
