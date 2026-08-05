"use client";

import { useFormState } from "react-dom";
import {
  FieldLabel,
  FormError,
  SubmitButton,
  authField,
} from "@/components/auth/AuthUI";
import { PROFESSION_OPTIONS } from "@/lib/membership";
import { updateProfile, type ProfileState } from "./actions";

const initialState: ProfileState = {};

type Props = {
  firstName: string;
  lastName: string;
  profession: string;
  phone: string | null;
};

export function ProfileForm({ firstName, lastName, profession, phone }: Props) {
  const [state, formAction] = useFormState(updateProfile, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel htmlFor="first_name">First name</FieldLabel>
          <input
            id="first_name"
            name="first_name"
            defaultValue={firstName}
            required
            className={authField}
          />
        </div>
        <div>
          <FieldLabel htmlFor="last_name">Last name</FieldLabel>
          <input
            id="last_name"
            name="last_name"
            defaultValue={lastName}
            required
            className={authField}
          />
        </div>
      </div>
      <div>
        <FieldLabel htmlFor="profession">Profession</FieldLabel>
        <select
          id="profession"
          name="profession"
          defaultValue={profession}
          required
          className={authField}
        >
          {PROFESSION_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <FieldLabel htmlFor="phone">Phone (optional)</FieldLabel>
        <input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={phone ?? ""}
          className={authField}
        />
      </div>

      <FormError message={state.error} />
      {state.ok && (
        <p className="text-[13px] text-txsn-teal">Your changes have been saved.</p>
      )}

      <div className="pt-1">
        <SubmitButton label="Save changes" pendingLabel="Saving..." />
      </div>
    </form>
  );
}
