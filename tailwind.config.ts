import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pulled directly from the TxSN logo — teal mark + gold gradient
        txsn: {
          teal: "#1A56A0",        // primary brand blue
          "teal-deep": "#0D1F3C", // dark navy — header, footer, headings
          "teal-mid": "#2568B8",  // hover blue
          mint: "#5A9FD4",        // borders, soft accents
          "mint-soft": "#B3D4ED", // lighter borders
          wash: "#F0F6FC",        // soft blue section backgrounds
          gold: "#BA7517",        // accent — CTAs, highlights
          "gold-soft": "#FAF3E6", // warm gold-tinted backgrounds
          sand: "#F6EFE2",        // warm neutral background
          ink: "#0d1e30",         // body text
          slate: "#3a4f65",       // secondary text (blue-gray)
          paper: "#FCFCFF",       // page background
        },
        "heritage-navy": "#002855",
        "clinical-blue": "#E8F1F8",
        "amber-accent":  "#C5934C",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
