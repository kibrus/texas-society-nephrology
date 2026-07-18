"use client";

import { useState } from "react";
import Link from "next/link";
import { navigation } from "@/lib/site";
import { Logo } from "./Logo";
import { useAuth } from "@/lib/auth-context";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50">

      {/* Top utility bar — white */}
      <div className="hidden lg:block bg-white border-b border-gray-200">
        <div className="mx-auto max-w-content px-5 lg:px-8">
          <div className="flex items-center justify-end gap-5 h-9">
            {user ? (
              <button
                onClick={() => signOut()}
                className="text-[12px] text-txsn-slate hover:text-txsn-teal transition-colors"
              >
                Sign out
              </button>
            ) : (
              <Link href="/sign-in" className="text-[12px] text-txsn-slate hover:text-txsn-teal transition-colors">
                Sign in
              </Link>
            )}
            <span className="text-gray-300">|</span>
            <Link href="/contact" className="text-[12px] text-txsn-slate hover:text-txsn-teal transition-colors">
              Contact Us
            </Link>
            <span className="text-gray-300">|</span>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-txsn-slate hover:text-txsn-teal transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="mailto:info@txsn.org" aria-label="Email" className="text-txsn-slate hover:text-txsn-teal transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 7l-10 7L2 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main nav — dark navy */}
      <div className="bg-txsn-teal-deep border-b border-white/10">
        <div className="mx-auto max-w-content px-5 lg:px-8">
          <div className="flex items-center justify-between h-[88px]">
            <Link href="/" aria-label="TxSN home">
              <Logo light />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
              {navigation.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-3 py-2.5 text-[15px] font-medium text-white/80 hover:text-white rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-txsn-mint"
                  >
                    {item.label}
                    {item.children && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </Link>

                  {item.children && openDropdown === item.label && (
                    <div className="absolute left-0 top-full pt-1 w-56">
                      <div className="bg-white rounded-md border border-txsn-mint-soft/50 shadow-lg shadow-txsn-teal-deep/10 py-1.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-[13px] text-txsn-slate hover:bg-txsn-wash hover:text-txsn-teal transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                        {item.label === "Membership" && user && (
                          <a
                            href="http://localhost:3001/member"
                            className="block px-4 py-2 text-[13px] text-txsn-slate hover:bg-txsn-wash hover:text-txsn-teal transition-colors"
                          >
                            Account
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <a
                href={user ? "http://localhost:3001/member" : "http://localhost:3001/sign-up"}
                className="ml-3 bg-txsn-gold hover:bg-txsn-gold/90 text-white text-[15px] font-medium px-4 py-2 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-txsn-gold/50"
              >
                {user ? "My Account" : "Join TxSN"}
              </a>
            </nav>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 bg-txsn-teal-deep max-h-[80vh] overflow-y-auto">
            <nav className="px-5 py-3" aria-label="Mobile">
              {navigation.map((item) => (
                <div key={item.label} className="py-1">
                  <Link
                    href={item.href}
                    className="block py-2 text-[15px] font-medium text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4 pb-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-1.5 text-[13px] text-white/70"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex gap-2 mt-3 mb-2">
                {user ? (
                  <button
                    onClick={() => { signOut(); setMobileOpen(false); }}
                    className="flex-1 text-center text-white border border-white/30 text-[14px] font-medium px-4 py-2.5 rounded-md"
                  >
                    Sign out
                  </button>
                ) : (
                  <Link
                    href="/sign-in"
                    className="flex-1 text-center text-white border border-white/30 text-[14px] font-medium px-4 py-2.5 rounded-md"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign in
                  </Link>
                )}
                <a
                  href={user ? "http://localhost:3001/member" : "http://localhost:3001/sign-up"}
                  className="flex-1 text-center bg-txsn-gold text-white text-[14px] font-medium px-4 py-2.5 rounded-md"
                >
                  {user ? "My Account" : "Join TxSN"}
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>

    </header>
  );
}
