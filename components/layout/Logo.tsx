"use client";

import Image from "next/image";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 ml-2.5">
      <Image
        src="/images/logo.png"
        alt="TxSN logo"
        width={100}
        height={67}
        className="object-contain"
      />
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
