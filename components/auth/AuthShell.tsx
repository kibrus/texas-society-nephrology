import Link from "next/link";
import { ReactNode } from "react";
import { Icon } from "@/components/ui";

// Value props shown on the branded panel — mirrors the membership benefits so
// the auth flow reinforces why someone is signing in / joining.
const TRUST_POINTS = [
  {
    title: "Education & CME",
    body: "Year-round accredited content that keeps your practice current.",
  },
  {
    title: "A statewide community",
    body: "Connect with nephrology peers and leaders across Texas.",
  },
  {
    title: "A unified voice",
    body: "Advocacy on the issues shaping kidney care.",
  },
];

// Professional split-screen auth layout (à la Stripe / Linear / Vercel):
// a branded navy panel with trust signals beside a clean, centered form.
// On mobile the brand panel drops away and the form fills a single column.
export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-[560px] lg:min-h-[calc(100vh-124px)] lg:grid-cols-[1.05fr_1fr]">
      {/* Brand panel — desktop only */}
      <aside className="relative hidden overflow-hidden bg-txsn-teal-deep px-12 py-14 text-white lg:flex lg:flex-col lg:justify-between">
        {/* Layered ambient glows for depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(90,159,212,0.28),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(186,117,23,0.18),transparent_45%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 top-10 h-96 w-96 rounded-full border border-white/5"
        />

        <div className="relative z-10">
          <Link
            href="/"
            className="inline-flex flex-col leading-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-txsn-mint rounded-sm"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
              Texas Society of
            </span>
            <span className="text-2xl font-extrabold uppercase leading-none tracking-wide">
              Nephrology
            </span>
            <span className="mt-1 text-[8.5px] font-medium uppercase tracking-[0.22em] text-txsn-mint-soft/80">
              Advancing Kidney Care
            </span>
          </Link>
        </div>

        <div className="relative z-10 max-w-sm">
          <h2 className="font-serif text-[2rem] font-medium leading-[1.2] text-white">
            The professional home for kidney care in Texas.
          </h2>
          <ul className="mt-9 space-y-5">
            {TRUST_POINTS.map((point) => (
              <li key={point.title} className="flex gap-3.5">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-txsn-gold/20 text-txsn-gold-soft">
                  <Icon name="check" size={14} />
                </span>
                <span>
                  <span className="block text-[14px] font-semibold text-white">
                    {point.title}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-relaxed text-white/60">
                    {point.body}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 text-[12px] text-white/45">
          &copy; {new Date().getFullYear()} Texas Society of Nephrology
        </div>
      </aside>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-txsn-paper px-5 py-12 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">
          {/* Mobile-only wordmark (brand panel is hidden below lg) */}
          <Link
            href="/"
            className="mb-8 inline-flex flex-col leading-tight lg:hidden"
          >
            <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-txsn-slate/60">
              Texas Society of
            </span>
            <span className="text-lg font-extrabold uppercase leading-none tracking-wide text-txsn-teal-deep">
              Nephrology
            </span>
          </Link>

          {eyebrow && (
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-txsn-gold">
              {eyebrow}
            </div>
          )}
          <h1 className="font-serif text-[2rem] font-medium leading-tight text-txsn-teal-deep">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-txsn-slate">
              {subtitle}
            </p>
          )}

          <div className="mt-8">{children}</div>

          {footer && (
            <div className="mt-8 border-t border-txsn-mint-soft/50 pt-6">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
