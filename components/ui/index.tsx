import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

/* =====================================================================
   Shared UI primitives for the TSN design system.
   Visual rules (from the approved mockup): navy #002855 + white, no gold,
   no pill-shaped tags (use <MetaRow>/<Status>), pill-shaped buttons,
   Merriweather headings, Inter body. Styles live in app/globals.css.
   ===================================================================== */

// Minimal inline icon set (stroke-based) so we don't depend on an icon lib.
const paths: Record<string, ReactNode> = {
  school: <path d="M22 10L12 5 2 10l10 5 10-5zM6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5" />,
  speakerphone: <path d="M18 8a3 3 0 010 6M3 9v6h4l6 4V5L7 9H3z" />,
  users: <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />,
  "user-plus": <path d="M2 21a7 7 0 0114 0M9 12a4 4 0 100-8 4 4 0 000 8zM19 8v6M22 11h-6" />,
  research: <path d="M9 2v6l-4 7a2 2 0 002 3h10a2 2 0 002-3l-4-7V2M8 2h8M7 16h10" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  calendar: <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />,
  pin: <path d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />,
  video: <path d="M16 10l6-3v10l-6-3M4 6h10a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />,
  "play-screen": <path d="M4 5h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2zM10 9l5 3-5 3z" />,
  file: <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6" />,
  briefcase: <path d="M20 7h-4V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM10 5h4v2h-4z" />,
  mail: <path d="M4 5h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2zM3 7l9 6 9-6" />,
  phone: <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" />,
  globe: <path d="M12 22a10 10 0 100-20 10 10 0 000 20zM2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" />,
  check: <path d="M20 6L9 17l-5-5" />,
  clock: <path d="M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z" />,
  external: <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />,
  play: <path d="M7 4l13 8-13 8V4z" />,
  lock: <path d="M5 11h14a1 1 0 011 1v8a1 1 0 01-1 1H5a1 1 0 01-1-1v-8a1 1 0 011-1zM8 11V7a4 4 0 018 0v4" />,
  download: <path d="M12 3v12M7 10l5 5 5-5M4 21h16" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  star: <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z" />,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
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

/* ---------- Layout ---------- */

// 1280px content column with the mockup's side padding (20/32/40px).
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`wrap ${className}`}>{children}</div>;
}

// Inner-page hero band: full-bleed photo with a navy tint and white text.
// The fixed header sits see-through on top of it (data-hero). Without an
// image it renders as a plain navy band. Keeps the old PageHeader props, so
// existing pages upgrade automatically.
export function PageHeader({
  eyebrow,
  title,
  intro,
  image,
  imagePosition,
  actions,
  tall = false,
  children,
}: {
  eyebrow?: ReactNode; // small line above the title (section / breadcrumb)
  title: string;
  intro?: ReactNode;
  image?: string; // e.g. "/images/site/about/hero.webp"
  imagePosition?: string; // CSS object-position, e.g. "center 30%"
  actions?: ReactNode; // buttons under the intro
  tall?: boolean;
  children?: ReactNode; // extra content inside the band (e.g. facts row)
}) {
  return (
    <section className={`page-hero${image ? "" : " plain"}${tall ? " tall" : ""}`} data-hero>
      {image && (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
          data-parallax
        />
      )}
      <div className="wrap">
        {eyebrow && <div className="crumb fade-up">{eyebrow}</div>}
        <h1 className="fade-up" style={{ animationDelay: ".08s" }}>
          {title}
        </h1>
        {intro && (
          <div className="intro fade-up" style={{ animationDelay: ".18s" }}>
            {intro}
          </div>
        )}
        {actions && (
          <div className="actions fade-up" style={{ animationDelay: ".28s" }}>
            {actions}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
export const PageHero = PageHeader;

// Section heading: title on the left, intro + optional action on the right.
export function SectionHead({
  title,
  intro,
  action,
  as: Tag = "h2",
  id,
  className = "",
}: {
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
}) {
  return (
    <div className={`shead rv ${className}`}>
      <Tag id={id} className="h-display">
        {title}
      </Tag>
      {(intro || action) && (
        <div className="side">
          {intro && <p>{intro}</p>}
          {action}
        </div>
      )}
    </div>
  );
}

/* ---------- Actions ---------- */

type ButtonVariant = "navy" | "white" | "glass" | "outline";

// Pill button. Renders a Next <Link> for internal hrefs, <a> for external /
// mailto / file links, or a <button> when no href is given.
export function Button({
  href,
  variant = "navy",
  size,
  arrow = false,
  external,
  className = "",
  children,
  ...rest
}: {
  href?: string;
  variant?: ButtonVariant;
  size?: "sm";
  arrow?: boolean;
  external?: boolean; // force new tab
  className?: string;
  children: ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">) {
  const cls = `btn btn-${variant}${size === "sm" ? " btn-sm" : ""} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && (
        <span className="arrow" aria-hidden="true">
          →
        </span>
      )}
    </>
  );
  if (!href) {
    return (
      <button className={cls} type={rest.type ?? "button"} {...rest}>
        {inner}
      </button>
    );
  }
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  const isFile = /\.(pdf|webp|jpe?g|png)$/i.test(href);
  if (isExternal || isFile) {
    const newTab = isFile || /^https?:/.test(href);
    return (
      <a
        className={cls}
        href={href}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {inner}
    </Link>
  );
}

// Navy text link with a nudging arrow.
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const content = (
    <>
      {children}
      <span className="arrow" aria-hidden="true">
        →
      </span>
    </>
  );
  if (/^(https?:|mailto:)/.test(href)) {
    return (
      <a className={`link ${className}`} href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link className={`link ${className}`} href={href}>
      {content}
    </Link>
  );
}

/* ---------- Meta / labels (no pills) ---------- */

// "Category · Date" line. Pass any parts; empty ones are skipped.
export function MetaRow({
  category,
  date,
  extra,
  className = "",
}: {
  category?: ReactNode;
  date?: ReactNode;
  extra?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`meta ${className}`}>
      {category && <span className="cat">{category}</span>}
      {date && <span className="date">{date}</span>}
      {extra && <span className="date">{extra}</span>}
    </div>
  );
}

// Plain status text with a dot (e.g. "Upcoming", "Past event", "Members only").
export function Status({
  children,
  tone = "default",
  className = "",
}: {
  children: ReactNode;
  tone?: "default" | "live" | "past";
  className?: string;
}) {
  return <span className={`status${tone === "default" ? "" : ` ${tone}`} ${className}`}>{children}</span>;
}

export function PastBadge({ label = "Past event" }: { label?: string }) {
  return <Status tone="past">{label}</Status>;
}

// Calendar tile: MON / DAY (/ year). Pass an ISO date (YYYY-MM-DD).
export function DateTile({
  iso,
  showYear = false,
  past = false,
  tba = false,
  className = "",
}: {
  iso: string;
  showYear?: boolean;
  past?: boolean;
  tba?: boolean;
  className?: string;
}) {
  if (tba || !iso) {
    return (
      <span className={`cal${past ? " past" : ""} ${className}`} aria-hidden="true">
        <span className="m">DATE</span>
        <span className="d" style={{ fontFamily: "var(--font-inter)", fontSize: 13, padding: "10px 0" }}>
          TBA
        </span>
      </span>
    );
  }
  const d = new Date(iso + "T00:00:00");
  const m = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  return (
    <span className={`cal${past ? " past" : ""} ${className}`} aria-hidden="true">
      <span className="m">{m}</span>
      <span className="d">{d.getDate()}</span>
      {showYear && <span className="y">{d.getFullYear()}</span>}
    </span>
  );
}

/* ---------- Motion helpers ---------- */

// Headline that rises in word by word. Screen readers get the plain text.
export function RiseWords({
  text,
  as: Tag = "h1",
  className = "",
  delay = 0.12,
}: {
  text: string;
  as?: "h1" | "h2";
  className?: string;
  delay?: number;
}) {
  const words = text.trim().split(/\s+/);
  return (
    <Tag className={`rise ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="w">
            <span style={{ animationDelay: `${delay + i * 0.06}s` }}>{w}</span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

// Placeholder for pages not yet built. Intentionally blank.
export function EmptySpace() {
  return <div className="min-h-[40vh]" aria-hidden="true" />;
}
