"use client";

import { useFormState } from "react-dom";
import {
  FieldLabel,
  FormError,
  SubmitButton,
  authField,
} from "@/components/auth/AuthUI";
import { updatePassword, type ResetState } from "./actions";

const initialState: ResetState = {};

export function ResetPasswordForm() {
  const [state, formAction] = useFormState(updatePassword, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <FieldLabel htmlFor="password">New password</FieldLabel>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
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
          minLength={8}
          className={authField}
        />
      </div>

      <FormError message={state.error} />

      <SubmitButton label="Update password" pendingLabel="Updating..." />
    </form>
  );
}
