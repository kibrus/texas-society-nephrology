"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { navigation, siteConfig } from "@/lib/site";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

// Nav items shown in the menus. Phase-3 pages (not built yet) stay hidden,
// matching the approved mockup.
const NAV = navigation.map((item) => ({
  ...item,
  children: item.children?.filter((c) => c.phase < 3),
}));

function Chevron() {
  return (
    <svg className="chev" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m2 4 4 4 4-4" />
    </svg>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Header({ staging = false }: { staging?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasHero, setHasHero] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [hiddenUp, setHiddenUp] = useState(false);

  // Auth state is read on the client so marketing pages stay static.
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }) => setSignedIn(!!data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setSignedIn(!!session?.user);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // On every route change: close the menu and check whether this page starts
  // with a dark hero (header see-through) or not (header solid navy).
  useEffect(() => {
    setMenuOpen(false);
    setHasHero(!!document.querySelector("[data-hero]"));
  }, [pathname]);

  // Keep --header-h equal to the header's full (top-of-page) height so pages
  // without a hero are pushed below it, including when the staging banner shows.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const measure = () => {
      if (window.scrollY < 10 && !el.classList.contains("compact")) {
        document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [pathname]);

  // Scroll effects: solid/compact state, hide on scroll down, progress line.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastY = window.scrollY;
    let ticking = false;
    let isScrolled = window.scrollY > 80;
    const update = () => {
      const y = window.scrollY;
      // Hysteresis: turn solid after 80px, only go see-through again near the
      // very top, so the header doesn't flicker around a single threshold.
      if (!isScrolled && y > 80) isScrolled = true;
      else if (isScrolled && y < 16) isScrolled = false;
      setScrolled(isScrolled);
      if (!reduce) {
        if (y > lastY + 6 && y > 300) setHiddenUp(true);
        else if (y < lastY - 6 || y < 300) setHiddenUp(false);
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      }
      lastY = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  async function handleSignOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    setSignedIn(false);
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  const classes = [
    "masthead",
    !hasHero || scrolled ? "solid" : "",
    scrolled ? "compact" : "",
    menuOpen ? "menu" : "",
    hiddenUp && !menuOpen ? "hidden-up" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header ref={headerRef} className={classes}>
      <div className="progress" ref={progressRef} aria-hidden="true" />

      {staging && (
        <div className="staging-banner" role="note">
          Test site: this is a staging copy for testing only. Payments and data here are not
          real. For the live site, visit{" "}
          <a href="https://www.txsocietyofnephrology.org">www.txsocietyofnephrology.org</a>
        </div>
      )}

      <div className="topbar">
        <div className="wrap">
          <a className="mail" href={`mailto:${siteConfig.email}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            {siteConfig.email}
          </a>
          <div className="right">
            {signedIn ? (
              <>
                <Link href="/member">My Account</Link>
                <button type="button" onClick={handleSignOut}>
                  Sign out
                </button>
              </>
            ) : (
              <Link href="/sign-in">Sign in</Link>
            )}
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
      </div>

      <div className="mainbar">
        <div className="wrap">
          <Link className="brand" href="/" aria-label="Texas Society of Nephrology, home">
            <Image src="/images/logo.png" alt="" width={93} height={62} priority />
            <span>
              <span className="t1">TEXAS SOCIETY OF</span>
              <span className="t2">NEPHROLOGY</span>
              <span className="t3">ADVANCING KIDNEY CARE</span>
            </span>
          </Link>

          <nav className="primary" aria-label="Main">
            <ul>
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  >
                    {item.label}
                    {item.children && item.children.length > 0 && <Chevron />}
                  </Link>
                  {item.children && item.children.length > 0 && (
                    <div className="dropdown">
                      <ul>
                        {item.children.map((child) => (
                          <li key={child.href + child.label}>
                            <Link href={child.href}>{child.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <Link className="btn join-btn" href="/join">
              Join TSN
            </Link>
            <button
              className="menu-btn"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobileNav"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                {menuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
              {menuOpen ? "Close" : "Menu"}
            </button>
          </nav>
        </div>
      </div>

      <div className="mobile-nav" id="mobileNav" hidden={!menuOpen}>
        <div className="inner">
          {NAV.map((item) =>
            item.children && item.children.length > 0 ? (
              <details key={item.label}>
                <summary>
                  {item.label} <Chevron />
                </summary>
                {item.children.map((child) => (
                  <Link key={child.href + child.label} href={child.href}>
                    {child.label}
                  </Link>
                ))}
              </details>
            ) : (
              <Link key={item.label} className="solo" href={item.href}>
                {item.label}
              </Link>
            ),
          )}
          <div className="btns">
            {signedIn ? (
              <>
                <Link className="btn btn-outline" href="/member">
                  My Account
                </Link>
                <button type="button" className="btn btn-outline" onClick={handleSignOut}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline" href="/sign-in">
                  Sign in
                </Link>
                <Link className="btn join-btn" href="/join">
                  Join TSN
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
