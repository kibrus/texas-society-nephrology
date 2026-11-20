import Image from "next/image";
import { ReactNode } from "react";
import { Icon } from "@/components/ui";

// Plain navy text link used in auth footers and helper text. Lives here (not
// in the "use client" AuthUI module) so server pages can use the string.
export const authLink =
  "font-semibold text-navy underline underline-offset-4 decoration-navy/30 hover:text-navy-hover hover:decoration-navy";

// Value props shown on the photo panel — mirrors the membership benefits so
// the auth flow reinforces why someone is signing in / joining.
const TRUST_POINTS = [
  {
    title: "Special conference pricing",
    body: "Discounted registration for TSN conferences and events across Texas.",
  },
  {
    title: "Knowledge Library access",
    body: "World-class lectures on nephrology and medicine, available on demand.",
  },
  {
    title: "Education & community",
    body: "Accredited CME and a statewide network of kidney care peers.",
  },
];

// Split-screen auth layout: a full-height photo panel with navy tint and the
// membership benefits (at the top of the panel) beside a clean white form panel. On small screens the
// photo panel drops away and the form fills a single column. No data-hero:
// the fixed header is solid navy here and <main> is already offset below it.
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
    <div className="grid min-h-[560px] bg-white lg:min-h-[calc(100vh_-_var(--header-h))] lg:grid-cols-[1.05fr_1fr]">
      {/* Form panel */}
      <div className="flex items-center justify-center bg-white px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="w-full max-w-md">
          {eyebrow && (
            <div className="mb-3 text-[14px] font-semibold text-navy">
              {eyebrow}
            </div>
          )}
          <h1 className="font-serif text-[clamp(1.9rem,3vw,2.4rem)] font-bold leading-tight tracking-[-0.015em] text-navy">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-[16px] leading-relaxed text-slate">
              {subtitle}
            </p>
          )}

          <div className="mt-8">{children}</div>

          {footer && (
            <div className="mt-8 border-t border-line pt-6">{footer}</div>
          )}
        </div>
      </div>

      {/* Photo panel — desktop only; after the form in the DOM so the h1 comes first, shown on the left via order */}
      <aside className="relative hidden overflow-hidden bg-navy-900 text-white lg:order-first lg:flex lg:flex-col lg:justify-start">
        <Image
          src="/images/site/auth/panel.webp"
          alt=""
          fill
          sizes="(min-width:1024px) 50vw, 1px"
          className="object-cover"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,22,44,0.94)_0%,rgba(6,22,44,0.8)_45%,rgba(6,22,44,0.45)_100%)]"
        />

        <div className="relative z-10 px-12 pb-14 pt-16 xl:px-16 lg:sticky lg:top-6">
          <h2 className="fade-up font-serif text-[clamp(1.8rem,2.4vw,2.3rem)] font-bold leading-[1.2] tracking-[-0.015em] text-white">
            The benefits of membership.
          </h2>
          <ul className="mt-9 max-w-md space-y-6">
            {TRUST_POINTS.map((point, i) => (
              <li
                key={point.title}
                className="fade-up flex gap-4"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white">
                  <Icon name="check" size={15} />
                </span>
                <span>
                  <span className="block text-[16px] font-semibold text-white">
                    {point.title}
                  </span>
                  <span className="mt-1 block text-[15px] leading-relaxed text-white/80">
                    {point.body}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
