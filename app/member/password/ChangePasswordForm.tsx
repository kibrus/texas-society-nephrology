"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui";
import {
  FieldLabel,
  FormError,
  SubmitButton,
  authField,
} from "@/components/auth/AuthUI";
import { changePassword, type ChangePasswordState } from "./actions";

const initialState: ChangePasswordState = {};

export function ChangePasswordForm() {
  const [state, formAction] = useFormState(changePassword, initialState);

  if (state.success) {
    return (
      <div className="text-center" role="status">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white">
          <svg className="success-check" width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 className="font-serif text-[22px] font-bold text-navy">
          Password updated
        </h2>
        <p className="mx-auto mt-2 max-w-xs text-[16px] text-slate">
          Your password has been changed successfully.
        </p>
        <div className="mt-7">
          <Button href="/member" arrow>
            Back to my account
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <FieldLabel htmlFor="current">Current password</FieldLabel>
        <input
          id="current"
          name="current"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          className={authField}
        />
      </div>
      <div>
        <FieldLabel htmlFor="password">New password</FieldLabel>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          placeholder="At least 8 characters"
          className={authField}
        />
      </div>
      <div>
        <FieldLabel htmlFor="confirm">Confirm new password</FieldLabel>
        <input
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          placeholder="Re-enter new password"
          className={authField}
        />
      </div>

      <FormError message={state.error} />

      <SubmitButton label="Update password" pendingLabel="Updating..." />

      <p className="text-center text-[14.5px] text-slate">
        Forgot your current password?{" "}
        <Link
          href="/forgot-password"
          className="font-semibold text-navy underline-offset-4 hover:underline"
        >
          Reset it by email
        </Link>
      </p>
    </form>
  );
}
