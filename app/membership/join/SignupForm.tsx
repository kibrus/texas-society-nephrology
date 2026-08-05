"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import {
  FieldLabel,
  FormError,
  SubmitButton,
  authField,
} from "@/components/auth/AuthUI";
import { PROFESSION_OPTIONS, TIER_OPTIONS } from "@/lib/membership";
import { startSignup, type SignupState } from "./actions";

const initialState: SignupState = {};

export function SignupForm() {
  const [state, formAction] = useFormState(startSignup, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel htmlFor="first_name">First name</FieldLabel>
          <input id="first_name" name="first_name" required className={authField} />
        </div>
        <div>
          <FieldLabel htmlFor="last_name">Last name</FieldLabel>
          <input id="last_name" name="last_name" required className={authField} />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <input id="email" name="email" type="email" required className={authField} />
      </div>

      <div>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          className={authField}
        />
        <p className="text-[12px] text-txsn-slate mt-1">At least 8 characters.</p>
      </div>

      <div>
        <FieldLabel htmlFor="profession">Profession</FieldLabel>
        <select id="profession" name="profession" required defaultValue="" className={authField}>
          <option value="" disabled>
            Select your profession
          </option>
          {PROFESSION_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <FieldLabel htmlFor="phone">Phone (optional)</FieldLabel>
        <input id="phone" name="phone" type="tel" className={authField} />
      </div>

      <fieldset>
        <legend className="block text-[13px] font-medium text-txsn-teal-deep mb-1.5">
          Membership tier
        </legend>
        <div className="grid sm:grid-cols-2 gap-3">
          {TIER_OPTIONS.map((tier, i) => (
            <label
              key={tier.value}
              className="flex cursor-pointer flex-col gap-1 rounded-lg border border-txsn-mint-soft bg-white p-4 has-[:checked]:border-txsn-teal has-[:checked]:ring-2 has-[:checked]:ring-txsn-mint/40 transition-colors"
            >
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tier"
                  value={tier.value}
                  defaultChecked={i === 0}
                  className="accent-txsn-teal"
                />
                <span className="text-[14px] font-medium text-txsn-teal-deep">
                  {tier.label}
                </span>
              </span>
              <span className="text-[13px] font-medium text-txsn-gold">
                {tier.priceLabel}
              </span>
              <span className="text-[12px] text-txsn-slate">{tier.blurb}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex items-start gap-2.5 text-[13px] text-txsn-slate">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 accent-txsn-teal"
        />
        {/* [PROD] Replace placeholder terms/privacy copy + links before launch. */}
        <span>
          I agree to the TSN membership terms and privacy policy, and to annual
          auto-renewing dues until I cancel.
        </span>
      </label>

      <FormError message={state.error} />

      <div className="pt-1">
        <SubmitButton label="Continue to verification" pendingLabel="Creating account..." />
      </div>

      <p className="text-[13px] text-txsn-slate text-center">
        Already a member?{" "}
        <Link href="/sign-in" className="text-txsn-teal font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
