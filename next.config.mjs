const isDev = process.env.NODE_ENV === "development";

// Content-Security-Policy tuned for this app's third parties:
//   - Stripe.js + Payment Element (scripts, frames, api.stripe.com)
//   - Supabase (auth + REST over https/wss)
//   - Google Fonts (Merriweather + Inter: CSS from fonts.googleapis.com, files from fonts.gstatic.com)
//   - Remote images (Unsplash / Clearbit / Wikimedia, plus https data/blob)
// 'unsafe-inline' is allowed for scripts/styles because Next.js injects inline
// hydration scripts and Tailwind injects styles; 'unsafe-eval' only in dev for
// React Fast Refresh. frame-ancestors 'none' blocks clickjacking.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval' " : ""}https://js.stripe.com`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://api.stripe.com https://*.supabase.co wss://*.supabase.co",
  "frame-src https://js.stripe.com https://hooks.stripe.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  // Report-only first: browsers log violations to the console but DON'T block,
  // so we can validate the policy risk-free. Flip the key to
  // "Content-Security-Policy" to enforce once the console is clean.
  { key: "Content-Security-Policy-Report-Only", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "logo.clearbit.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    // /join is now the canonical signup entry; keep old links working.
    return [{ source: "/membership/join", destination: "/join", permanent: true }];
  },
};
export default nextConfig;
