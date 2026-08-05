"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  FieldLabel,
  FormError,
  SubmitButton,
  authField,
} from "@/components/auth/AuthUI";
import { verifyEmail, resendCode, type VerifyState } from "./actions";

const initialState: VerifyState = {};

function ResendButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="text-[13px] text-txsn-teal font-medium hover:underline disabled:opacity-60"
    >
      {pending ? "Sending..." : "Resend code"}
    </button>
  );
}

export function VerifyForm({ email }: { email: string }) {
  const [state, formAction] = useFormState(verifyEmail, initialState);
  const [resendState, resendAction] = useFormState(resendCode, initialState);

  return (
    <div className="space-y-5">
      <p className="text-[14px] text-txsn-slate">
        We sent a 6-digit code to{" "}
        <span className="font-medium text-txsn-teal-deep">{email}</span>. Enter it
        below to confirm your email.
      </p>

      <form action={formAction} className="space-y-4">
        <div>
          <FieldLabel htmlFor="code">Verification code</FieldLabel>
          <input
            id="code"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            required
            placeholder="123456"
            className={`${authField} tracking-[0.3em] text-center`}
          />
        </div>
        <FormError message={state.error} />
        <SubmitButton label="Verify email" pendingLabel="Verifying..." />
      </form>

      <div className="flex items-center gap-2 text-[13px] text-txsn-slate">
        <span>Didn&apos;t get it?</span>
        <form action={resendAction}>
          <ResendButton />
        </form>
      </div>
      {resendState.resent && (
        <p className="text-[13px] text-txsn-teal">A new code is on its way.</p>
      )}
      <FormError message={resendState.error} />
    </div>
  );
}
