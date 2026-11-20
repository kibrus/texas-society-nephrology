"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Icon } from "@/components/ui";

// Shared field styling for all auth + membership forms. Builds on the global
// `.field` look (16px text, 10px radius, navy focus ring).
export const authField = "field placeholder:text-muted";

export function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="label">
      {children}
    </label>
  );
}

// Centered card the auth pages render their form into.
export function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-md px-5 py-14">
      <div className="card p-7 sm:p-8">{children}</div>
    </div>
  );
}

// Inline error. #b42318 on #fef3f2 is ~6.4:1 (passes WCAG AA).
export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="flex items-start gap-2.5 rounded-[10px] border border-[#fecdca] bg-[#fef3f2] px-4 py-3 text-[15px] leading-snug text-[#b42318]"
    >
      <span
        aria-hidden
        className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#b42318]"
      />
      {message}
    </p>
  );
}

// Inline success / confirmation message.
export function FormSuccess({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return (
    <p
      role="status"
      className="flex items-start gap-2.5 rounded-[10px] border border-line bg-surface px-4 py-3 text-[15px] leading-snug text-navy"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="success-check mt-px flex-shrink-0"
      >
        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{children}</span>
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
      aria-disabled={pending}
      className="btn btn-navy w-full"
    >
      {pending ? pendingLabel : label}
      {!pending && <Icon name="arrow" size={16} className="arrow" />}
    </button>
  );
}
