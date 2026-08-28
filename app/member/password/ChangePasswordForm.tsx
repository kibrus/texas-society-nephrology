"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { Icon } from "@/components/ui";
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
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-txsn-teal text-white">
          <Icon name="check" size={24} />
        </div>
        <h2 className="font-serif text-xl font-medium text-txsn-teal-deep">
          Password updated
        </h2>
        <p className="mx-auto mt-2 max-w-xs text-[14px] text-txsn-slate">
          Your password has been changed successfully.
        </p>
        <Link
          href="/member"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-txsn-teal px-5 py-3 text-[14.5px] font-semibold text-white shadow-sm shadow-txsn-teal-deep/20 transition-all duration-150 hover:bg-txsn-teal-mid hover:shadow-md"
        >
          Back to my account
          <Icon name="arrow" size={16} />
        </Link>
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

      <p className="text-center text-[13px] text-txsn-slate">
        Forgot your current password?{" "}
        <Link
          href="/forgot-password"
          className="font-medium text-txsn-teal hover:underline"
        >
          Reset it by email
        </Link>
      </p>
    </form>
  );
}
