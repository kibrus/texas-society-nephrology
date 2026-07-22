import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-heritage-navy text-white mt-auto">
      <div className="mx-auto max-w-content px-5 lg:px-8 py-16">

        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand — spans 2 cols on sm so logo has room */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5 min-w-0">
              <Image
                src="/images/logo.png"
                alt="TxSN logo"
                width={68}
                height={46}
                className="object-contain flex-shrink-0"
              />
              <div className="leading-tight min-w-0">
                <div className="text-[9px] font-semibold tracking-widest uppercase text-white/60 whitespace-nowrap">
                  Texas Society of
                </div>
                <div className="text-[14px] font-extrabold tracking-wide uppercase leading-none text-white whitespace-nowrap">
                  Nephrology
                </div>
                <div className="text-[8px] tracking-widest font-medium uppercase mt-0.5 text-white/50 whitespace-nowrap">
                  Advancing Kidney Care
                </div>
              </div>
            </div>
            <p className="text-white/60 text-[13px] leading-relaxed">
              The Texas Society of Nephrology is dedicated to advancing kidney care through education, advocacy, and collaboration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[11px] tracking-widest text-amber-accent font-semibold uppercase mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "About Us",   href: "/about" },
                { label: "Membership", href: "/membership" },
                { label: "Education",  href: "/resources/education" },
                { label: "Events",     href: "/events" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[13px] text-white/70 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-[11px] tracking-widest text-amber-accent font-semibold uppercase mb-5">
              Resources
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Clinical Resources", href: "/resources/clinical" },
                { label: "Education & CME",    href: "/resources/education" },
                { label: "Member Resources",   href: "/resources/member" },
                { label: "Careers",            href: "/careers" },
                { label: "News",               href: "/news" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[13px] text-white/70 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Informed */}
          <div>
            <h3 className="text-[11px] tracking-widest text-amber-accent font-semibold uppercase mb-5">
              Stay Informed
            </h3>
            <p className="text-[13px] text-white/60 leading-relaxed mb-5">
              Subscribe to receive updates on events, news, and more.
            </p>
            <div className="flex mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 text-[13px] bg-white/10 text-white placeholder-white/40 px-3 py-2.5 rounded-l-sm border border-white/20 focus:outline-none focus:border-amber-accent"
              />
              <button className="bg-amber-accent hover:opacity-90 px-3.5 py-2.5 rounded-r-sm transition-colors flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </button>
            </div>
            <div className="flex gap-3">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-accent flex items-center justify-center transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-accent flex items-center justify-center transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a
                href={siteConfig.social.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-accent flex items-center justify-center transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Email"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-accent flex items-center justify-center transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M22 7l-10 7L2 7"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[12px] text-white/50">
            © {new Date().getFullYear()} Texas Society of Nephrology. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-[12px] text-white/50 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[12px] text-white/50 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-[12px] text-white/50 hover:text-white transition-colors">
              Site Map
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
