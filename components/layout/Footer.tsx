"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";

// Pages where a "Become a member" call to action makes no sense (already
// joining, signing in, or inside the member area).
const NO_JOIN = ["/join", "/membership/payment", "/membership/verify", "/sign-in", "/forgot-password", "/reset-password", "/member"];

const QUICK_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Membership", href: "/membership" },
  { label: "Resources", href: "/resources" },
  { label: "Events", href: "/events" },
  { label: "Annual Meeting", href: "/annual-meeting" },
];

const RESOURCE_LINKS = [
  { label: "Member Resources", href: "/resources/member" },
  { label: "News", href: "/news" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

// Join section + footer sharing one background photo: lighter behind Join,
// darkening into the footer so its links stay readable.
export function Closing() {
  const pathname = usePathname();
  const showJoin = !NO_JOIN.some((p) => pathname === p || pathname.startsWith(p + "/"));

  return (
    <div className={`closing${showJoin ? "" : " no-join flush"}`}>
      <Image
        className="closing-bg"
        src="/images/site/shared/closing.webp"
        alt=""
        fill
        sizes="100vw"
      />

      {showJoin && (
        <section className="join" aria-labelledby="joinTitle">
          <div className="wrap rv">
            <h2 id="joinTitle">Join the leading voice for Texas nephrology</h2>
            <p>
              Trainee and full membership tiers. Renew online, register for events, and access
              members-only resources to support your clinical practice.
            </p>
            <div className="ctas">
              <Link className="btn btn-white" href="/join">
                Become a member <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      <footer className="site-footer">
        <div className="wrap">
          <div className="foot">
            <div>
              <Link className="brand" href="/" aria-label="Texas Society of Nephrology, home">
                <Image src="/images/logo.png" alt="" width={84} height={56} style={{ height: 56, width: "auto" }} />
                <span>
                  <span className="t1">TEXAS SOCIETY OF</span>
                  <span className="t2">NEPHROLOGY</span>
                  <span className="t3">ADVANCING KIDNEY CARE</span>
                </span>
              </Link>
              <p className="about">
                The Texas Society of Nephrology is dedicated to advancing kidney care through
                education, advocacy, and collaboration.
              </p>
              <a className="contact" href={`mailto:${siteConfig.email}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                {siteConfig.email}
              </a>
            </div>
            <nav aria-label="Quick links">
              <h3>Quick Links</h3>
              <ul>
                {QUICK_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Resources">
              <h3>Resources</h3>
              <ul>
                {RESOURCE_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h3>Stay Informed</h3>
              <p>Subscribe to receive updates on events, news, and more.</p>
              {/* PLACEHOLDER: no newsletter service is connected yet; this form
                  does not send anywhere (same as before the redesign). */}
              <form className="sub" onSubmit={(e) => e.preventDefault()}>
                <label className="sr" htmlFor="footer-email">
                  Email address
                </label>
                <input id="footer-email" type="email" placeholder="Enter your email" maxLength={254} autoComplete="email" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="legal">
            <span>© {new Date().getFullYear()} Texas Society of Nephrology. All rights reserved.</span>
            <span>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
