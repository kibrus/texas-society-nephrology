import Link from "next/link";
import Image from "next/image";

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
                alt="TSN logo"
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
                { label: "Resources",  href: "/resources" },
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
                { label: "Member Resources",   href: "/resources/member" },
                { label: "News",               href: "/news" },
                { label: "Careers",            href: "/careers" },
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
          </div>
        </div>

      </div>
    </footer>
  );
}
