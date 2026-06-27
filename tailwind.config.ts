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
          teal: "#0F6E56",       // primary brand — logo mark & wordmark
          "teal-deep": "#0E4A4A", // headings, deep sections
          "teal-mid": "#1A8A6C",  // hover states
          mint: "#5DCAA5",        // borders, soft accents
          "mint-soft": "#9FE1CB", // lighter borders
          wash: "#F0F7F4",        // soft teal section backgrounds
          gold: "#BA7517",        // accent — CTAs, highlights (logo gradient)
          "gold-soft": "#FAF3E6", // warm gold-tinted backgrounds
          sand: "#F6EFE2",        // warm neutral background
          ink: "#1C2A2A",         // body text (warm near-black)
          slate: "#3A4A47",       // secondary text
          paper: "#FCFBF8",       // page background (warm white)
        },
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
