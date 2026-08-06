"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Icon } from "@/components/ui";

// Shared field styling. Slightly taller with a clear focus ring for a modern,
// accessible feel across all auth + membership forms.
export const authField =
  "w-full bg-white border border-txsn-mint-soft rounded-lg px-4 py-3 text-[14.5px] text-txsn-ink placeholder:text-txsn-slate/40 shadow-sm shadow-txsn-teal-deep/[0.03] focus:outline-none focus:border-txsn-teal focus:ring-4 focus:ring-txsn-mint/25 transition-all duration-150";

export function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[13px] font-medium text-txsn-teal-deep mb-1.5"
    >
      {children}
    </label>
  );
}

// Centered card the auth pages render their form into.
export function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-md py-14 px-5">
      <div className="bg-white border border-txsn-mint-soft rounded-xl shadow-sm shadow-txsn-teal-deep/5 p-7">
        {children}
      </div>
    </div>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13px] text-red-700"
    >
      <span
        aria-hidden
        className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500"
      />
      {message}
    </p>
  );
}

// Submit button that reflects the enclosing form's pending state.
export function SubmitButton({
  label,
  pendingLabel,
}: {
  label: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-txsn-teal px-5 py-3.5 text-[14.5px] font-semibold text-white shadow-sm shadow-txsn-teal-deep/20 transition-all duration-150 hover:bg-txsn-teal-mid hover:shadow-md hover:shadow-txsn-teal-deep/25 focus:outline-none focus-visible:ring-4 focus-visible:ring-txsn-mint/30 disabled:opacity-60 disabled:shadow-none"
    >
      {pending ? pendingLabel : label}
      <Icon
        name="arrow"
        size={16}
        className="transition-transform duration-150 group-hover:translate-x-0.5"
      />
    </button>
  );
}
