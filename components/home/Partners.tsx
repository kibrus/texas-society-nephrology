"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { corporatePartners } from "@/lib/site";
import { SponsorLogo } from "./SponsorLogo";

const doubled = [...corporatePartners, ...corporatePartners];

export function Partners() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const pausedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  // thumb state stored in refs to avoid stale closures in drag handler
  const thumbLeftRef = useRef(0);
  const thumbWidthRef = useRef(0);
  const [thumbStyle, setThumbStyle] = useState({ left: 0, width: 0 });

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  // ── auto-scroll ──────────────────────────────────────────────────────────
  const animate = useCallback(() => {
    const el = trackRef.current;
    if (el && !pausedRef.current) {
      el.scrollLeft += 0.6;
      if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [animate]);

  // ── sync scrollbar thumb with scroll position ─────────────────────────
  const syncThumb = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const visible = el.clientWidth;
    const total = el.scrollWidth;
    const w = Math.max(48, (visible / total) * visible);
    const maxScroll = total - visible;
    const l = maxScroll > 0 ? (el.scrollLeft / maxScroll) * (visible - w) : 0;
    thumbWidthRef.current = w;
    thumbLeftRef.current = l;
    setThumbStyle({ left: l, width: w });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", syncThumb, { passive: true });
    syncThumb();
    return () => el.removeEventListener("scroll", syncThumb);
  }, [syncThumb]);

  // ── drag handlers ─────────────────────────────────────────────────────
  const onThumbMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartScroll.current = trackRef.current?.scrollLeft ?? 0;
    pausedRef.current = true;
    e.preventDefault();
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current || !trackRef.current) return;
      const el = trackRef.current;
      const dx = e.clientX - dragStartX.current;
      const scrollableTrack = el.clientWidth - thumbWidthRef.current;
      const ratio = scrollableTrack > 0 ? (el.scrollWidth - el.clientWidth) / scrollableTrack : 1;
      el.scrollLeft = dragStartScroll.current + dx * ratio;
    };
    const onUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      // resume auto-scroll only if still hovered
      setTimeout(() => { if (!isDragging.current) pausedRef.current = false; }, 400);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <section
      className="relative py-6 border-b border-txsn-mint-soft/40"
      onMouseEnter={() => { setHovered(true); pausedRef.current = true; }}
      onMouseLeave={() => { setHovered(false); if (!isDragging.current) pausedRef.current = false; }}
    >
      <p className="text-center text-[10px] tracking-[0.2em] text-txsn-slate/50 font-medium mb-5 uppercase">
        Supported by our corporate partners
      </p>

      {/* Logo track */}
      <div
        ref={trackRef}
        className="hide-scrollbar overflow-x-scroll flex items-center gap-x-14 px-7"
      >
        {doubled.map((p, i) => (
          <SponsorLogo
            key={`${p.slug}-${i}`}
            name={p.name}
            slug={p.slug}
            url={p.url}
            ext={p.ext}
            imgClassName={p.slug === "partner11" ? "h-7" : "h-10"}
          />
        ))}
      </div>

      {/* Draggable scrollbar — fades in on hover */}
      <div
        className={`mx-7 mt-3 h-1.5 rounded-full bg-gray-100 relative select-none transition-opacity duration-200 ${
          hovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute top-0 h-full rounded-full bg-txsn-slate/30 hover:bg-txsn-slate/50 cursor-grab active:cursor-grabbing transition-colors"
          style={{ left: thumbStyle.left, width: thumbStyle.width }}
          onMouseDown={onThumbMouseDown}
        />
      </div>
    </section>
  );
}
