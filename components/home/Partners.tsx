"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { corporatePartners } from "@/lib/site";
import { SponsorLogo } from "./SponsorLogo";

const visible = corporatePartners.filter((p) => !p.hidden);
const doubled = [...visible, ...visible];

export function Partners() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [touching, setTouching] = useState(false);
  const hoveredRef = useRef(false);
  const pausedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const offsetRef = useRef(0);

  const thumbWidthRef = useRef(0);
  const [thumbStyle, setThumbStyle] = useState({ left: 0, width: 0 });

  // Mouse drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);

  // Touch swipe state
  const isTouching = useRef(false);
  const touchStartX = useRef(0);
  const touchStartOffset = useRef(0);

  const syncThumb = useCallback(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    const containerW = container.clientWidth;
    const halfTrack = track.scrollWidth / 2;
    const maxOffset = Math.max(0, halfTrack - containerW);
    const thumbW = Math.max(48, (containerW / halfTrack) * containerW);
    const l = maxOffset > 0 ? (offsetRef.current / maxOffset) * (containerW - thumbW) : 0;
    thumbWidthRef.current = thumbW;
    setThumbStyle({ left: l, width: thumbW });
  }, []);

  // ── auto-scroll via RAF + transform ────────────────────────────────────
  const animate = useCallback(() => {
    const track = trackRef.current;
    if (track && !pausedRef.current) {
      offsetRef.current += 0.6;
      const halfTrack = track.scrollWidth / 2;
      if (offsetRef.current >= halfTrack) offsetRef.current = 0;
      track.style.transform = `translateX(-${offsetRef.current}px)`;
      syncThumb();
    }
    rafRef.current = requestAnimationFrame(animate);
  }, [syncThumb]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [animate]);

  // ── touch swipe on the logo track (mobile) ────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onTouchStart = (e: TouchEvent) => {
      isTouching.current = true;
      touchStartX.current = e.touches[0].clientX;
      touchStartOffset.current = offsetRef.current;
      pausedRef.current = true;
      setTouching(true);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isTouching.current || isDragging.current || !trackRef.current) return;
      e.preventDefault(); // prevent page from scrolling vertically while swiping logos
      const dx = touchStartX.current - e.touches[0].clientX;
      const track = trackRef.current;
      const halfTrack = track.scrollWidth / 2;
      const containerW = container.clientWidth;
      const newOffset = Math.max(0, Math.min(halfTrack - containerW, touchStartOffset.current + dx));
      offsetRef.current = newOffset;
      track.style.transform = `translateX(-${newOffset}px)`;
      syncThumb();
    };

    const onTouchEnd = () => {
      isTouching.current = false;
      // keep scrollbar visible briefly then resume auto-scroll
      setTimeout(() => {
        setTouching(false);
        if (!isDragging.current && !hoveredRef.current) pausedRef.current = false;
      }, 1500);
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [syncThumb]);

  // ── mouse drag on scrollbar thumb (desktop) ───────────────────────────
  const onThumbMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetRef.current;
    pausedRef.current = true;
    e.preventDefault();
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current || !trackRef.current) return;
      const container = containerRef.current;
      const track = trackRef.current;
      const halfTrack = track.scrollWidth / 2;
      const containerW = container.clientWidth;
      const thumbW = thumbWidthRef.current;
      const dx = e.clientX - dragStartX.current;
      const scrollableTrack = containerW - thumbW;
      const ratio = scrollableTrack > 0 ? Math.max(0, halfTrack - containerW) / scrollableTrack : 1;
      const newOffset = Math.max(0, Math.min(halfTrack - containerW, dragStartOffset.current + dx * ratio));
      offsetRef.current = newOffset;
      track.style.transform = `translateX(-${newOffset}px)`;
      syncThumb();
    };
    const onUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      if (!hoveredRef.current) pausedRef.current = false;
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [syncThumb]);

  const showScrollbar = hovered || touching;

  return (
    <section
      className="relative py-6 border-b border-txsn-mint-soft/40"
      onMouseEnter={() => { setHovered(true); hoveredRef.current = true; pausedRef.current = true; }}
      onMouseLeave={() => { setHovered(false); hoveredRef.current = false; if (!isDragging.current) pausedRef.current = false; }}
    >
      <p className="text-center text-[10px] tracking-[0.2em] text-txsn-slate/50 font-medium mb-5 uppercase">
        Supported by our corporate partners
      </p>

      <div ref={containerRef} className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-center gap-x-14 px-7"
          style={{ willChange: "transform" }}
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
      </div>

      {/* Scrollbar — fades in on hover (desktop) or touch (mobile) */}
      <div
        className={`mx-7 mt-3 h-1.5 rounded-full bg-gray-100 relative select-none transition-opacity duration-200 ${
          showScrollbar ? "opacity-100" : "opacity-0 pointer-events-none"
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
