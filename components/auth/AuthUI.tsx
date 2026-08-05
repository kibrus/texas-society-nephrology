"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Icon } from "@/components/ui";

// Shared field styling, matching the contact form.
export const authField =
  "w-full bg-white border border-txsn-mint-soft rounded-md px-3.5 py-2.5 text-[14px] text-txsn-ink placeholder:text-txsn-slate/50 focus:outline-none focus:border-txsn-teal focus:ring-2 focus:ring-txsn-mint/40 transition-colors";

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
  return <p className="text-[13px] text-red-700">{message}</p>;
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
      className="inline-flex w-full items-center justify-center gap-2 bg-txsn-teal hover:bg-txsn-teal-mid disabled:opacity-60 text-white text-[14px] font-medium px-5 py-3 rounded-md transition-colors"
    >
      {pending ? pendingLabel : label} <Icon name="arrow" size={16} />
    </button>
  );
}
