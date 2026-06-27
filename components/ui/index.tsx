import Link from "next/link";
import { ReactNode } from "react";

// Minimal inline icon set (stroke-based) so we don't depend on an icon lib.
const paths: Record<string, ReactNode> = {
  school: <path d="M22 10L12 5 2 10l10 5 10-5zM6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5" />,
  speakerphone: <path d="M18 8a3 3 0 010 6M3 9v6h4l6 4V5L7 9H3z" />,
  users: <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />,
  research: <path d="M9 2v6l-4 7a2 2 0 002 3h10a2 2 0 002-3l-4-7V2M8 2h8M7 16h10" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  calendar: <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />,
  pin: <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z" />,
  video: <path d="M23 7l-7 5 7 5V7zM1 5h13a2 2 0 012 2v10a2 2 0 01-2 2H1a2 2 0 01-2-2V7a2 2 0 012-2z" />,
  file: <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6" />,
  briefcase: <path d="M20 7h-4V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM10 5h4v2h-4z" />,
  mail: <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM22 6l-10 7L2 6" />,
  check: <path d="M20 6L9 17l-5-5" />,
  clock: <path d="M12 6v6l4 2M12 22a10 10 0 100-20 10 10 0 000 20z" />,
};

export function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? null}
    </svg>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="relative bg-txsn-wash border-b border-txsn-mint-soft/40 overflow-hidden">
      <div className="mx-auto max-w-content px-5 lg:px-8 py-14 lg:py-16 relative">
        <div className="max-w-2xl">
          {eyebrow && (
            <div className="text-[11px] tracking-wide text-txsn-gold font-medium mb-2">
              {eyebrow}
            </div>
          )}
          <h1 className="font-serif text-3xl lg:text-[2.5rem] leading-tight text-txsn-teal-deep font-medium">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 text-[15px] leading-relaxed text-txsn-slate max-w-xl">
              {intro}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-content px-5 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function PastBadge({ label = "Past event" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-txsn-slate/10 text-txsn-slate text-[11px] font-medium px-2.5 py-1 rounded-full">
      {label}
    </span>
  );
}

// Placeholder for pages not yet built. Intentionally blank — no internal
// build/phase notes are shown to site visitors.
export function EmptySpace() {
  return <div className="min-h-[40vh]" aria-hidden="true" />;
}
