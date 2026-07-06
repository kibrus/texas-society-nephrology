function EmblemMark({ size = 44, light = false }: { size?: number; light?: boolean }) {
  const ring = light ? "#9FE1CB" : "#1A56A0";
  const fill = light ? "#9FE1CB" : "#1A56A0";
  return (
    <svg viewBox="0 0 44 44" width={size} height={size} aria-hidden="true">
      {/* Outer circle */}
      <circle cx="22" cy="22" r="20" fill="none" stroke={ring} strokeWidth="1.8" />
      {/* 5-pointed star */}
      <polygon
        points="22,7 24.9,16.2 34.5,16.2 27.0,21.8 29.9,31.0 22,25.4 14.1,31.0 17.0,21.8 9.5,16.2 19.1,16.2"
        fill={fill}
      />
    </svg>
  );
}

export function TexasMark({
  className = "",
  size = 32,
  color = "#1A56A0",
  opacity = 0.92,
}: {
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <svg
      viewBox="0 0 44 44"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <circle cx="22" cy="22" r="20" fill="none" stroke={color} strokeWidth="1.8" opacity={opacity} />
      <polygon
        points="22,7 24.9,16.2 34.5,16.2 27.0,21.8 29.9,31.0 22,25.4 14.1,31.0 17.0,21.8 9.5,16.2 19.1,16.2"
        fill={color}
        opacity={opacity}
      />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <EmblemMark size={42} light={light} />
      <div className="leading-tight">
        <div className={`text-[10px] font-semibold tracking-widest uppercase ${light ? "text-white/70" : "text-txsn-slate/70"}`}>
          Texas Society of
        </div>
        <div className={`text-[17px] font-extrabold tracking-wide uppercase leading-none ${light ? "text-white" : "text-txsn-teal-deep"}`}>
          Nephrology
        </div>
        <div className={`text-[8.5px] tracking-widest font-medium uppercase mt-0.5 ${light ? "text-txsn-mint-soft/80" : "text-txsn-slate/50"}`}>
          Advancing Kidney Care
        </div>
      </div>
    </div>
  );
}
