export function TexasMark({
  className = "",
  size = 32,
  color = "#0F6E56",
  opacity = 0.92,
}: {
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 105"
      width={size}
      height={size * 1.05}
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 8 L58 8 L60 20 L72 22 L74 14 L88 18 L84 40 L92 52 L80 72 L70 68 L58 88 L46 96 L40 82 L30 80 L24 64 L12 56 L16 36 L10 24 Z"
        fill={color}
        opacity={opacity}
      />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <TexasMark size={30} color={light ? "#9FE1CB" : "#0F6E56"} />
      <div className="leading-tight">
        <div
          className={`text-[13px] font-medium ${
            light ? "text-white" : "text-txsn-teal-deep"
          }`}
        >
          Texas Society of Nephrology
        </div>
        <div
          className={`text-[9px] tracking-wide ${
            light ? "text-txsn-mint-soft" : "text-txsn-slate/70"
          }`}
        >
          EDUCATION · ADVOCACY · COMMUNITY
        </div>
      </div>
    </div>
  );
}
