"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { PageHeader } from "@/components/ui";
import {
  AuthCard,
  FieldLabel,
  FormError,
  SubmitButton,
  authField,
} from "@/components/auth/AuthUI";
import { signIn, type SignInState } from "./actions";

const initialState: SignInState = {};

export default function SignInPage() {
  const [state, formAction] = useFormState(signIn, initialState);

  return (
    <>
      <PageHeader
        eyebrow="MEMBER ACCESS"
        title="Sign in"
        intro="Sign in to manage your TSN membership, invoices, and account."
      />
      <AuthCard>
        <form action={formAction} className="space-y-4">
          <div>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={authField}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="text-[13px] font-medium text-txsn-teal-deep"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[12px] text-txsn-teal hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={authField}
            />
          </div>

          <FormError message={state.error} />

          <SubmitButton label="Sign in" pendingLabel="Signing in..." />
        </form>

        <p className="mt-6 text-center text-[13px] text-txsn-slate">
          Not a member yet?{" "}
          <Link
            href="/membership/join"
            className="text-txsn-teal font-medium hover:underline"
          >
            Join TSN
          </Link>
        </p>
      </AuthCard>
    </>
  );
}
