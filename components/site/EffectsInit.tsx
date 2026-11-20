"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// One small script for the site-wide effects (no animation libraries).
// Markup hooks:
//   .rv            fade + rise when scrolled into view
//   .settle        wrapper whose <img> fades in and settles from a slight zoom
//   [data-reveal]  legacy reveal hook (adds .revealed)
//   .spot          cursor spotlight (sets --mx / --my)
//   [data-tilt]    card whose .tilt child leans toward the cursor
//   [data-parallax] image that drifts slowly while scrolling (heroes)
//   .toc a[href^="#"]  table-of-contents links highlighted by scroll-spy
// Everything is skipped under prefers-reduced-motion (content stays visible).
export function EffectsInit() {
  const pathname = usePathname();

  // Delegated pointer effects: bound once.
  useEffect(() => {
    document.documentElement.classList.add("fx");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target || !(target instanceof Element)) return;
      const spot = target.closest<HTMLElement>(".spot");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
      if (!reduce) {
        const card = target.closest<HTMLElement>("[data-tilt]");
        const ph = card?.querySelector<HTMLElement>(".tilt");
        if (ph) {
          const r = ph.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          ph.style.setProperty("--ry", `${x * 6}deg`);
          ph.style.setProperty("--rx", `${-y * 6}deg`);
        }
      }
    };
    const onOut = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.("[data-tilt]");
      const related = e.relatedTarget as Node | null;
      if (card && !(related && card.contains(related))) {
        const ph = card.querySelector<HTMLElement>(".tilt");
        ph?.style.setProperty("--ry", "0deg");
        ph?.style.setProperty("--rx", "0deg");
      }
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });

    // Parallax on hero photos
    let ticking = false;
    const onScroll = () => {
      if (reduce || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((img) => {
            img.style.transform = `translateY(${y * 0.25}px) scale(1.06)`;
          });
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Observers: re-run whenever the page changes.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observers: IntersectionObserver[] = [];
    const cleanups: (() => void)[] = [];

    const reveal = (selector: string, cls: string, margin = "0px 0px -8% 0px") => {
      const els = Array.from(document.querySelectorAll(selector)).filter((el) => !el.classList.contains(cls));
      if (reduce || !("IntersectionObserver" in window)) {
        els.forEach((el) => el.classList.add(cls));
        return;
      }
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add(cls);
              io.unobserve(en.target);
            }
          }),
        { rootMargin: margin },
      );
      els.forEach((el) => io.observe(el));
      observers.push(io);
    };

    // Wait a frame so the new page's DOM is in place.
    const raf = requestAnimationFrame(() => {
      reveal(".rv", "in");
      reveal(".settle", "in");
      reveal("[data-reveal]", "revealed", "0px");

      // Scroll-spy for tables of contents
      const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.toc a[href^="#"]'));
      const sections = links
        .map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1))))
        .filter((el): el is HTMLElement => !!el);
      if (sections.length) {
        // Active = the last section whose top has passed 30% of the viewport
        // (the first section while still above it).
        let spyTick = false;
        const spy = () => {
          spyTick = false;
          const line = window.innerHeight * 0.3;
          let active = sections[0];
          for (const sec of sections) if (sec.getBoundingClientRect().top <= line) active = sec;
          links.forEach((a) =>
            a.setAttribute("aria-current", a.hash === `#${active.id}` ? "true" : "false"),
          );
        };
        const onSpyScroll = () => {
          if (!spyTick) {
            spyTick = true;
            requestAnimationFrame(spy);
          }
        };
        spy();
        window.addEventListener("scroll", onSpyScroll, { passive: true });
        cleanups.push(() => window.removeEventListener("scroll", onSpyScroll));
      }
    });

    return () => {
      cancelAnimationFrame(raf);
      observers.forEach((o) => o.disconnect());
      cleanups.forEach((c) => c());
    };
  }, [pathname]);

  return null;
}
