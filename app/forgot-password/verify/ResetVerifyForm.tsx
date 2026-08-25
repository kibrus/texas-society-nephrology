"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  FieldLabel,
  FormError,
  SubmitButton,
  authField,
} from "@/components/auth/AuthUI";
import {
  verifyResetCode,
  resendResetCode,
  type ResetVerifyState,
} from "./actions";

const initialState: ResetVerifyState = {};

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

export function ResetVerifyForm({ email }: { email: string }) {
  const [state, formAction] = useFormState(verifyResetCode, initialState);
  const [resendState, resendAction] = useFormState(resendResetCode, initialState);

  return (
    <div className="space-y-5">
      <p className="text-[14px] text-txsn-slate">
        We sent a 6-digit code to{" "}
        <span className="font-medium text-txsn-teal-deep">{email}</span>. Enter it
        below to reset your password.
      </p>

      <p className="rounded-lg bg-txsn-wash px-3.5 py-2.5 text-[12.5px] text-txsn-slate">
        <span className="font-medium text-txsn-teal-deep">Don&apos;t see it?</span>{" "}
        Check your spam or junk folder — it can take a minute to arrive.
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
        <SubmitButton label="Verify code" pendingLabel="Verifying..." />
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
