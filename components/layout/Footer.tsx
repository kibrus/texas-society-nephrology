import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-txsn-teal-deep text-white mt-auto">
      <div className="mx-auto max-w-content px-5 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-[1.8fr_1fr_1fr_1.4fr_1.6fr]">

          {/* Brand */}
          <div>
            <div className="mb-4">
              <Logo light />
            </div>
            <p className="text-white/60 text-[12.5px] leading-relaxed max-w-[220px]">
              The Texas Society of Nephrology is dedicated to advancing kidney care through education, advocacy, and collaboration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[11px] tracking-widest text-txsn-mint font-semibold uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: "About Us",   href: "/about" },
                { label: "Membership", href: "/membership" },
                { label: "Education",  href: "/resources/education" },
                { label: "Advocacy",   href: "/about" },
                { label: "Events",     href: "/events" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-white/70 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-[11px] tracking-widest text-txsn-mint font-semibold uppercase mb-4">Resources</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Clinical Resources",  href: "/resources/clinical" },
                { label: "Education & CME",     href: "/resources/education" },
                { label: "Member Resources",    href: "/resources/member" },
                { label: "Careers",             href: "/careers" },
                { label: "News",                href: "/news" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-white/70 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-[11px] tracking-widest text-txsn-mint font-semibold uppercase mb-4">Connect With Us</h3>
            <div className="flex items-center gap-3 mb-5">
              {/* LinkedIn */}
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-label="LinkedIn">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-label="Facebook">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              {/* X / Twitter */}
              <a href={siteConfig.social.x} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-label="X">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* Email */}
              <a href={`mailto:${siteConfig.email}`}
                className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Email">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M22 7l-10 7L2 7"/>
                </svg>
              </a>
            </div>
            <p className="text-[12px] text-white/60 leading-relaxed">
              [Address]<br />
              [Phone Number]<br />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">{siteConfig.email}</a>
            </p>
          </div>

          {/* Stay Informed */}
          <div>
            <h3 className="text-[11px] tracking-widest text-txsn-mint font-semibold uppercase mb-4">Stay Informed</h3>
            <p className="text-[12.5px] text-white/60 leading-relaxed mb-4">
              Subscribe to receive updates on events, news, and more.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 text-[13px] bg-white/10 text-white placeholder-white/40 px-3 py-2 rounded-l-md border border-white/20 focus:outline-none focus:border-txsn-mint"
              />
              <button className="bg-txsn-teal hover:bg-txsn-teal-mid px-3 py-2 rounded-r-md transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[12px] text-white/50">
            © {new Date().getFullYear()} Texas Society of Nephrology. All Rights Reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-[12px] text-white/50 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[12px] text-white/50 hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/sitemap" className="text-[12px] text-white/50 hover:text-white transition-colors">Site Map</Link>
          </div>
          <p className="text-[12px] text-white/30">Website by TxSN</p>
        </div>
      </div>
    </footer>
  );
}
