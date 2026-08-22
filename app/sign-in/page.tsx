"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import {
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
    <AuthShell
      eyebrow="Member access"
      title="Welcome back"
      subtitle="Sign in to manage your TSN membership, invoices, and account."
      footer={
        <p className="text-center text-[13.5px] text-txsn-slate">
          Not a member yet?{" "}
          <Link
            href="/join"
            className="font-semibold text-txsn-teal hover:underline"
          >
            Join TSN
          </Link>
        </p>
      }
    >
      <form action={formAction} className="space-y-5">
        <div>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className={authField}
          />
        </div>
        <div>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className={authField}
          />
        </div>

        <FormError message={state.error} />

        <SubmitButton label="Sign in" pendingLabel="Signing in..." />

        <p className="text-center text-[13px]">
          <Link
            href="/forgot-password"
            className="font-medium text-txsn-teal hover:underline"
          >
            Forgot password?
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
