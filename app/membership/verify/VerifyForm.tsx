"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  FieldLabel,
  FormError,
  FormSuccess,
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
      className="font-semibold text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy disabled:cursor-not-allowed disabled:opacity-60"
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
      <p className="text-[16px] leading-relaxed text-slate">
        We sent a 6-digit code to{" "}
        <span className="font-semibold text-ink">{email}</span>. Enter it
        below to confirm your email.
      </p>

      <p className="rounded-[10px] border border-line bg-surface px-4 py-3 text-[15px] text-slate">
        <span className="font-semibold text-ink">Don&apos;t see it?</span>{" "}
        Please check your spam or junk folder.
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
            className={`${authField} text-center !text-[20px] font-semibold tracking-[0.3em]`}
          />
        </div>
        <FormError message={state.error} />
        <SubmitButton label="Verify email" pendingLabel="Verifying..." />
      </form>

      <div className="flex flex-wrap items-center gap-2 text-[15px] text-slate">
        <span>Didn&apos;t get it?</span>
        <form action={resendAction}>
          <ResendButton />
        </form>
      </div>
      {resendState.resent && <FormSuccess>A new code is on its way.</FormSuccess>}
      <FormError message={resendState.error} />
    </div>
  );
}
