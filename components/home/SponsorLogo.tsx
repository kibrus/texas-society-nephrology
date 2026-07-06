"use client";

import React from "react";

const LOGOS: Record<string, React.ReactElement> = {
  Genentech: (
    <svg viewBox="0 0 230 55" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <text x="0" y="38" fontFamily="'Arial Black',Arial,sans-serif" fontWeight="900" fontSize="33" fill="#1a1a1a">Genentech</text>
      <text x="2" y="52" fontFamily="Arial,sans-serif" fontSize="10" fill="#888888">A Member of the Roche Group</text>
    </svg>
  ),
  Apellis: (
    <svg viewBox="0 0 130 44" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <text x="0" y="31" fontFamily="Arial,sans-serif" fontWeight="400" fontSize="26" fill="#5a5a5a">Apellis</text>
    </svg>
  ),
  Ardelyx: (
    <svg viewBox="0 0 196 50" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <circle cx="24" cy="25" r="22" fill="#e8701a"/>
      <text x="14" y="33" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="26" fill="white">a</text>
      <text x="54" y="34" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="24" fill="#e8701a">ardelyx</text>
      <text x="184" y="18" fontFamily="Arial,sans-serif" fontSize="10" fill="#e8701a">®</text>
    </svg>
  ),
  Alnylam: (
    <svg viewBox="0 0 155 44" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <text x="0" y="31" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="26" fill="#00337f">Alnylam</text>
    </svg>
  ),
  Otsuka: (
    <svg viewBox="0 0 158 50" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <circle cx="22" cy="25" r="18" fill="none" stroke="#003087" strokeWidth="2.5"/>
      <circle cx="22" cy="25" r="8" fill="#003087"/>
      <text x="48" y="33" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="22" fill="#003087">Otsuka</text>
    </svg>
  ),
  Amgen: (
    <svg viewBox="0 0 160 50" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <text x="0" y="40" fontFamily="'Arial Black',Impact,sans-serif" fontWeight="900" fontSize="40" fill="#003da5" letterSpacing="1">AMGEN</text>
      <text x="148" y="20" fontFamily="Arial,sans-serif" fontSize="10" fill="#003da5">®</text>
    </svg>
  ),
};

export function SponsorLogo({
  name,
  color,
}: {
  name: string;
  logo: string;
  color: string;
}) {
  const svg = LOGOS[name];

  if (svg) {
    return (
      <div className="flex-1 flex items-center justify-center min-w-0 hover:scale-105 transition-transform duration-200">
        {svg}
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-gray-100">
      <span className="w-1 h-7 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
      <span className="text-[15px] font-bold tracking-tight whitespace-nowrap" style={{ color }}>{name}</span>
    </div>
  );
}
