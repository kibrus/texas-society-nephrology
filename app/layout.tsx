import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Closing } from "@/components/layout/Footer";
import { EffectsInit } from "@/components/site/EffectsInit";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Texas Society of Nephrology",
  description:
    "The professional home for kidney care professionals across Texas, advancing patient care, education, and the future of nephrology.",
  icons: {
    icon: [{ url: "/images/favicon2.png", sizes: "any", type: "image/png" }],
    apple: "/images/favicon2.png",
  },
};

// Re-render static pages at most hourly so "upcoming vs past" events switch
// over automatically without needing a redeploy.
export const revalidate = 3600;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <a href="#main" className="sr skip-link">
          Skip to content
        </a>
        <Header staging={process.env.VERCEL_ENV !== "production"} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Closing />
        <EffectsInit />
      </body>
    </html>
  );
}
