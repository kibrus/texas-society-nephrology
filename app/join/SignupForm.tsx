"use client";

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
      <div className="grid gap-4 sm:grid-cols-2">
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
          aria-describedby="password-hint"
          className={authField}
        />
        <p id="password-hint" className="mt-1.5 text-[14px] text-slate">
          At least 8 characters.
        </p>
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
        <legend className="label">
          Membership tier
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {TIER_OPTIONS.map((tier, i) => (
            <label
              key={tier.value}
              className="flex cursor-pointer flex-col gap-1 rounded-[12px] border border-[#cdd6e0] bg-white p-4 transition-[border-color,box-shadow] hover:border-navy/50 has-[:checked]:border-navy has-[:checked]:shadow-[0_0_0_3px_rgba(0,40,85,0.15)]"
            >
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tier"
                  value={tier.value}
                  defaultChecked={i === 0}
                  className="h-4 w-4 accent-navy"
                />
                <span className="text-[16px] font-semibold text-navy">
                  {tier.label}
                </span>
              </span>
              <span className="text-[15px] font-semibold text-ink">
                {tier.priceLabel}
              </span>
              <span className="text-[14px] leading-snug text-slate">{tier.blurb}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex items-start gap-3 text-[15px] leading-relaxed text-slate">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 flex-shrink-0 accent-navy"
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
    </form>
  );
}
