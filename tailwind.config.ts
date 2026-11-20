import type { Config } from "tailwindcss";

// Design tokens from the approved home mockup (navy #002855 + white, warm-free
// neutrals, Merriweather headings, Inter body, 1280px content width).
//
// New code should use the semantic tokens (navy, ink, slate, muted, line,
// surface). The legacy `txsn-*`, `heritage-navy`, `clinical-blue` and
// `amber-accent` names are kept as aliases mapped onto the new palette so any
// page not yet restyled still renders on-brand (no gold, no beige).
const navy = "#002855";
const navyHover = "#0d3a70";
const ink = "#14202d";
const slate = "#475a6d";
const muted = "#5f6f80";
const line = "#e2e8ef";
const surface = "#f7f9fb";
const surface2 = "#f3f5f8";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: navy, hover: navyHover, 900: "#0b2547", 950: "#06162c" },
        ink,
        slate,
        muted,
        line,
        surface: { DEFAULT: surface, 2: surface2 },
        // Legacy aliases → new palette
        txsn: {
          teal: navy,
          "teal-deep": navy,
          "teal-mid": navyHover,
          mint: "#c3ccd6",
          "mint-soft": line,
          wash: surface,
          gold: navy,
          "gold-soft": surface2,
          sand: surface2,
          ink,
          slate,
          paper: "#ffffff",
        },
        "heritage-navy": navy,
        "clinical-blue": surface2,
        "amber-accent": navy,
      },
      fontFamily: {
        serif: ["var(--font-merriweather)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      maxWidth: {
        content: "1280px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(7,26,51,.06),0 12px 32px -16px rgba(7,26,51,.22)",
        "card-lg": "0 2px 4px rgba(7,26,51,.06),0 30px 60px -28px rgba(7,26,51,.45)",
      },
    },
  },
  plugins: [],
};

export default config;
