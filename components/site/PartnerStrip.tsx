"use client";

import { useEffect, useRef, useState } from "react";
import { corporatePartners } from "@/lib/site";

const visible = corporatePartners.filter((p) => !p.hidden);

// Moving partner logos with strong edge fades. Auto-scrolls, pauses on
// hover/focus, can be dragged or swiped, and has a Pause button (WCAG 2.2.2).
// Under prefers-reduced-motion it starts paused.
export function PartnerStrip({
  title = "Supported by our corporate partners",
  className = "",
}: {
  title?: string;
  className?: string;
}) {
  const secRef = useRef<HTMLElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [stopped, setStopped] = useState(false);
  const stoppedRef = useRef(false);
  const [touching, setTouching] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStopped(true);
      stoppedRef.current = true;
    }
  }, []);

  useEffect(() => {
    stoppedRef.current = stopped;
  }, [stopped]);

  useEffect(() => {
    const sec = secRef.current;
    const view = viewRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    const thumb = thumbRef.current;
    if (!sec || !view || !track || !bar || !thumb) return;

    let off = 0;
    let hover = false;
    let focused = false;
    let drag: { x: number; o: number; mode: "track" | "thumb"; moved: boolean } | null = null;
    let raf = 0;

    const half = () => track.scrollWidth / 2;
    const apply = () => {
      const h = half();
      if (h <= 0) return;
      off = ((off % h) + h) % h;
      track.style.transform = `translateX(${-off}px)`;
      const w = bar.clientWidth;
      const tw = Math.max(48, (w * view.clientWidth) / h);
      thumb.style.width = `${tw}px`;
      thumb.style.left = `${((w - tw) * off) / h}px`;
    };
    const tick = () => {
      if (!hover && !focused && !drag && !stoppedRef.current) off += 0.6;
      apply();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onEnter = () => (hover = true);
    const onLeave = () => (hover = false);
    const onFocusIn = () => (focused = true);
    const onFocusOut = () => (focused = false);
    const start = (x: number, mode: "track" | "thumb") => {
      drag = { x, o: off, mode, moved: false };
      view.classList.add("dragging");
      setTouching(true);
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 3) drag.moved = true;
      const k = drag.mode === "thumb" ? half() / Math.max(1, bar.clientWidth - thumb.offsetWidth) : -1;
      off = drag.o + dx * k;
    };
    const end = () => {
      if (!drag) return;
      const moved = drag.moved;
      drag = null;
      view.classList.remove("dragging");
      setTimeout(() => setTouching(false), 1200);
      if (moved) {
        // Swallow the click that follows a drag so logos don't open by accident.
        const swallow = (ev: Event) => {
          ev.preventDefault();
          view.removeEventListener("click", swallow, true);
        };
        view.addEventListener("click", swallow, true);
        setTimeout(() => view.removeEventListener("click", swallow, true), 50);
      }
    };
    const onViewDown = (e: PointerEvent) => start(e.clientX, "track");
    const onThumbDown = (e: PointerEvent) => {
      e.preventDefault();
      start(e.clientX, "thumb");
    };
    const noDrag = (e: Event) => e.preventDefault();

    sec.addEventListener("mouseenter", onEnter);
    sec.addEventListener("mouseleave", onLeave);
    view.addEventListener("focusin", onFocusIn);
    view.addEventListener("focusout", onFocusOut);
    view.addEventListener("pointerdown", onViewDown);
    thumb.addEventListener("pointerdown", onThumbDown);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    view.addEventListener("dragstart", noDrag);

    return () => {
      cancelAnimationFrame(raf);
      sec.removeEventListener("mouseenter", onEnter);
      sec.removeEventListener("mouseleave", onLeave);
      view.removeEventListener("focusin", onFocusIn);
      view.removeEventListener("focusout", onFocusOut);
      view.removeEventListener("pointerdown", onViewDown);
      thumb.removeEventListener("pointerdown", onThumbDown);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
      view.removeEventListener("dragstart", noDrag);
    };
  }, []);

  const logo = (p: (typeof visible)[number], clone: boolean) => {
    const img = (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/images/partners/${p.slug}.${p.ext ?? "png"}`}
        alt={clone ? "" : p.name}
        className={p.slug === "partner11" ? "short" : undefined}
        loading="lazy"
        draggable={false}
      />
    );
    return p.url ? (
      <a
        key={`${p.slug}-${clone ? "b" : "a"}`}
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        title={p.name}
        aria-hidden={clone || undefined}
        tabIndex={clone ? -1 : undefined}
      >
        {img}
      </a>
    ) : (
      <span key={`${p.slug}-${clone ? "b" : "a"}`} aria-hidden={clone || undefined}>
        {img}
      </span>
    );
  };

  return (
    <section ref={secRef} className={`strip${touching ? " touching" : ""} ${className}`} aria-labelledby="stripTitle">
      <div className="wrap">
        <div className="strip-head">
          <h2 id="stripTitle" className="strip-title">
            {title}
          </h2>
          <button
            type="button"
            className="strip-pause"
            aria-pressed={stopped}
            onClick={() => setStopped((s) => !s)}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              {stopped ? <path d="M7 4v16l13-8z" /> : <path d="M6 4h4v16H6zM14 4h4v16h-4z" />}
            </svg>
            <span>{stopped ? "Play" : "Pause"}</span>
          </button>
        </div>
      </div>
      <div className="strip-view" ref={viewRef}>
        <div className="strip-track" ref={trackRef}>
          {visible.map((p) => logo(p, false))}
          {visible.map((p) => logo(p, true))}
        </div>
      </div>
      <div className="wrap">
        <div className="strip-bar" aria-hidden="true" ref={barRef}>
          <div className="strip-thumb" ref={thumbRef} />
        </div>
      </div>
    </section>
  );
}
