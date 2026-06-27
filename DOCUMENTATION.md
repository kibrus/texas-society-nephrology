# Texas Society of Nephrology — Phase 1 Documentation

**Project:** TxSN public website
**Phase:** 1 of 3 (public website)
**Stack:** Next.js 14 · Tailwind CSS · MDX · Resend · Vercel
**Status:** Mockup / foundation build — navigable, production-grade code

---

## Table of contents

1. [Overview](#1-overview)
2. [Phase scope](#2-phase-scope)
3. [Technology stack & rationale](#3-technology-stack--rationale)
4. [Project structure](#4-project-structure)
5. [Pages reference](#5-pages-reference)
6. [Content system](#6-content-system)
7. [Design system](#7-design-system)
8. [The contact form](#8-the-contact-form)
9. [Local setup](#9-local-setup)
10. [Deployment](#10-deployment)
11. [Maintenance & content updates](#11-maintenance--content-updates)
12. [Roadmap: Phases 2 & 3](#12-roadmap-phases-2--3)
13. [Known limitations](#13-known-limitations)

---

## 1. Overview

This is the Phase 1 build of the Texas Society of Nephrology (TxSN) website — a public-facing site that presents the society, its annual meeting, news, resources, and membership information to physicians, fellows, and kidney care professionals across Texas.

Phase 1 deliberately contains **no login, no payments, and no database**. All content is stored as text files in the codebase. This keeps the build fast, cheap to host, and simple to maintain. Features that require accounts and payment processing — member login, online dues, event registration, abstract submission — are scoped to later phases and appear in the navigation as "coming soon" placeholders so the site's structure is complete from day one.

The audience for this document is whoever maintains or extends the site: the developer, and any technically comfortable team member who needs to understand how it is put together.

---

## 2. Phase scope

### In scope for Phase 1

| Area | What's included |
|------|-----------------|
| Homepage | Hero, four pillars, latest news, upcoming events, partner rail, join CTA |
| About | Mission, leadership, corporate partners, contact |
| Membership | Why join, tier comparison (informational) |
| Annual Meeting | Overview, schedule |
| Resources | Clinical resources, education & CME |
| News | News index + individual article pages |
| Careers | Curated job board |
| Contact | Working contact form (email via Resend) |
| Site-wide | Responsive design, dropdown navigation, 404 page, SEO metadata |

### Out of scope (later phases, shown as placeholders)

| Feature | Phase |
|---------|-------|
| Member login & member-only portal | 2 |
| Online membership application & dues (Stripe) | 2 |
| Automatic renewal reminder emails | 2 |
| Member-only resources | 2 |
| Event registration with payment | 3 |
| Abstract submission portal | 3 |
| Self-service job posting | 3 |

### Explicitly excluded (per client requirements)

Member directory, public physician finder, online store, donation form, public-policy/legislative page, mass email newsletter, event waitlist, and automated invoicing. These were marked "no" by the client and are not built in any phase unless requested later.

---

## 3. Technology stack & rationale

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js 14 (App Router)** | One codebase serves the public site and (later) the member portal; server-rendered pages are fast and rank well in search; built-in API routes handle the contact form without a separate backend. |
| Styling | **Tailwind CSS** | Brand colors and fonts defined once as tokens; consistent styling without separate CSS files. |
| Content | **MDX** (Markdown + components) | News and events are plain text files the developer edits — no database or CMS needed for a single editor. |
| Email | **Resend** | Sends contact-form submissions. Generous free tier, simple API. |
| Hosting | **Vercel** | Zero-config Next.js hosting; auto-deploys on every Git push; free tier covers Phase 1. |

**Why Next.js over plain React:** the public site needs SEO (server-rendered HTML), and the contact form needs a backend endpoint. Next.js provides both out of the box; plain React provides neither. The site is written in React either way — Next.js is the framework around it.

**Running cost at Phase 1 scale:** effectively $0–25/month (Vercel Hobby + Resend free tier). The site is mostly static, so hosting is cheap.

---

## 4. Project structure

```
txsn-website/
├── app/                          # Pages — every folder is a route
│   ├── layout.tsx                # Root layout: fonts, header, footer
│   ├── page.tsx                  # Homepage (/)
│   ├── globals.css               # Global styles + brand CSS variables
│   ├── not-found.tsx             # 404 page
│   ├── about/
│   │   ├── page.tsx              # /about (mission)
│   │   ├── leadership/page.tsx   # /about/leadership
│   │   └── corporate-partners/page.tsx
│   ├── contact/page.tsx          # /contact (form, client component)
│   ├── membership/
│   │   ├── page.tsx              # /membership (why join)
│   │   ├── tiers/page.tsx        # /membership/tiers
│   │   └── join/page.tsx         # Phase 2 placeholder
│   ├── annual-meeting/
│   │   ├── page.tsx              # Overview
│   │   ├── schedule/page.tsx     # Timeline schedule
│   │   ├── abstracts/page.tsx    # Phase 3 placeholder
│   │   └── register/page.tsx     # Phase 3 placeholder
│   ├── resources/
│   │   ├── page.tsx              # Overview
│   │   ├── clinical/page.tsx
│   │   ├── education/page.tsx
│   │   └── member/page.tsx       # Phase 2 placeholder
│   ├── news/
│   │   ├── page.tsx              # News index
│   │   └── [slug]/page.tsx       # Individual article (dynamic)
│   ├── careers/page.tsx          # Job board
│   └── api/
│       └── contact/route.ts      # Contact form handler
│
├── content/                      # ALL editable content (no code)
│   ├── news/                     # News posts as .mdx files
│   └── events/                   # Events as .mdx files
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Nav with dropdowns + mobile menu
│   │   ├── Footer.tsx
│   │   └── Logo.tsx             # Texas silhouette mark + wordmark
│   ├── home/
│   │   └── sections.tsx          # Homepage sections
│   └── ui/
│       └── index.tsx             # Icon, PageHeader, Container, ComingSoon
│
├── lib/
│   ├── site.ts                   # Nav, leadership, partners, tiers, meeting data
│   └── content.ts                # Reads MDX from content/ folder
│
├── public/images/                # Logos, photos, downloadable docs
│
├── tailwind.config.ts            # Brand design tokens (colors, fonts)
├── package.json
├── README.md                     # Quick-start
└── DOCUMENTATION.md              # This file
```

**The key architectural line** is between `app/` + `components/` (the code, owned by the developer) and `content/` + `lib/site.ts` (the content and data, edited for updates). Routine updates touch only the latter.

### How routing works

In the Next.js App Router, every folder inside `app/` becomes a URL, and the `page.tsx` inside it renders that page. So `app/about/leadership/page.tsx` is served at `/about/leadership`. The one dynamic route is `app/news/[slug]/page.tsx` — the `[slug]` in brackets means it matches any news post, with the slug taken from the MDX filename.

---

## 5. Pages reference

| Route | Page | Phase | Notes |
|-------|------|-------|-------|
| `/` | Homepage | 1 | Pulls latest 3 news + 3 events automatically |
| `/about` | Mission | 1 | Links to sub-pages |
| `/about/leadership` | Board listing | 1 | Names/photos are placeholder |
| `/about/corporate-partners` | Partner showcase | 1 | Logos are placeholder |
| `/contact` | Contact form | 1 | Sends email via Resend |
| `/membership` | Why join | 1 | Benefit grid |
| `/membership/tiers` | Tier comparison | 1 | Trainee vs Full |
| `/membership/join` | Join / renew | 2 | "Coming soon" placeholder |
| `/annual-meeting` | Overview | 1 | Lists all events |
| `/annual-meeting/schedule` | Schedule | 1 | Timeline from `lib/site.ts` |
| `/annual-meeting/abstracts` | Abstract submission | 3 | "Coming soon" placeholder |
| `/annual-meeting/register` | Register | 3 | "Coming soon" placeholder |
| `/resources` | Resources overview | 1 | Links to sub-pages |
| `/resources/clinical` | Clinical resources | 1 | Document list (placeholder) |
| `/resources/education` | Education & CME | 1 | Webinar list |
| `/resources/member` | Member resources | 2 | "Coming soon" placeholder |
| `/news` | News index | 1 | All posts |
| `/news/[slug]` | Article | 1 | One per MDX file |
| `/careers` | Job board | 1 | Curated listings |

The "coming soon" pages render a consistent `ComingSoon` component that states the feature, the phase it arrives in, and a link to the contact page. This keeps the navigation complete while honestly signalling what is and isn't built.

---

## 6. Content system

All news and events live in the `content/` folder as MDX files. The site reads them at build time through helper functions in `lib/content.ts`. There is no database and no CMS — the developer edits these files directly. This is the right choice for Phase 1, where a single person handles all updates.

### Adding a news post

Create a new file in `content/news/`, for example `spring-symposium.mdx`:

```mdx
---
title: "Spring symposium registration is open"
date: "2026-04-01"
author: "TxSN"
excerpt: "One-line summary that appears on the news card."
category: "Education"
---

The body of the post, written in Markdown.

## Subheadings use double-hash

Regular paragraphs, **bold text**, and [links](https://example.com) all work.
```

The part between the `---` lines is "frontmatter" — metadata the site uses. The filename becomes the URL: `spring-symposium.mdx` → `/news/spring-symposium`. The homepage automatically shows the three newest posts (by date); the `/news` page lists them all. No code changes are needed to publish.

**Frontmatter fields for news:**

| Field | Required | Purpose |
|-------|----------|---------|
| `title` | Yes | Headline |
| `date` | Yes | `YYYY-MM-DD`, controls ordering |
| `excerpt` | Yes | Summary on cards |
| `author` | No | Byline |
| `category` | No | Label shown as a tag |

### Adding an event

Create a file in `content/events/`, for example `fall-webinar.mdx`:

```mdx
---
title: "Fall CME Webinar"
date: "2026-09-15"
location: "Online"
isFree: true
memberDiscount: false
excerpt: "One-line summary."
---

Event description in Markdown.
```

**Frontmatter fields for events:**

| Field | Required | Purpose |
|-------|----------|---------|
| `title` | Yes | Event name |
| `date` | Yes | `YYYY-MM-DD` |
| `location` | Yes | City, or "Online" |
| `isFree` | Yes | `true`/`false` |
| `memberDiscount` | No | `true` shows "Member discount" |
| `excerpt` | Yes | Summary |

### Editing site data

Navigation, leadership, corporate partners, membership tiers, and the annual-meeting schedule are not MDX — they live in `lib/site.ts` as structured data. To change a board member, a partner, or a schedule slot, edit that file. It is heavily commented and uses plain arrays of objects.

---

## 7. Design system

The visual identity is derived directly from the TxSN logo: a deep teal mark and wordmark over a teal-to-gold Texas silhouette. The site makes teal the primary color, gold the accent, and uses the Texas shape as a recurring motif.

### Color tokens

Defined in `tailwind.config.ts` under `colors.txsn`. Use them as Tailwind classes, e.g. `bg-txsn-teal`, `text-txsn-gold`.

| Token | Hex | Use |
|-------|-----|-----|
| `teal` | `#0F6E56` | Primary — buttons, mark, headings accents |
| `teal-deep` | `#0E4A4A` | Headings, dark sections, footer |
| `teal-mid` | `#1A8A6C` | Button hover |
| `mint` | `#5DCAA5` | Borders, soft accents |
| `mint-soft` | `#9FE1CB` | Lighter borders |
| `wash` | `#F0F7F4` | Soft teal section backgrounds |
| `gold` | `#BA7517` | Accent — CTAs, highlights |
| `gold-soft` | `#FAF3E6` | Warm gold-tinted backgrounds |
| `sand` | `#F6EFE2` | Warm neutral background |
| `ink` | `#1C2A2A` | Body text |
| `slate` | `#3A4A47` | Secondary text |
| `paper` | `#FCFBF8` | Page background (warm white) |

**To rebrand or adjust a color:** change the value in `tailwind.config.ts` once; it updates everywhere it's used.

### Typography

| Role | Font | Notes |
|------|------|-------|
| Display / headings | **Fraunces** (serif) | Editorial, signals an established institution |
| Body / UI | **Inter** (sans-serif) | Clean, highly readable |

Fonts load from Google Fonts via a `<link>` in `app/layout.tsx`, with `Georgia`/system fallbacks. Font families are exposed as the CSS variables `--font-fraunces` and `--font-inter` and mapped to Tailwind's `font-serif` / `font-sans`.

### Layout & motion

- Max content width is 1180px (`max-w-content`), centered with responsive padding.
- The page uses an alternating background rhythm (white → mint wash → deep teal) to separate sections.
- Motion is restrained: a subtle hero fade-in and gentle card hover-lifts. A `prefers-reduced-motion` rule disables animation for users who request it.

### Signature element

The Texas silhouette (`TexasMark` in `components/layout/Logo.tsx`) is the recurring identity device — it forms the header mark and appears as a faint watermark in the homepage hero. It ties every page back to the logo.

### Accessibility

Semantic HTML throughout, visible keyboard focus rings on interactive elements, `aria-label`s on icon-only controls, alt-free decorative SVGs marked `aria-hidden`, and reduced-motion support.

---

## 8. The contact form

The contact form (`/contact`) is the only interactive backend feature in Phase 1.

- The page (`app/contact/page.tsx`) is a client component that posts the form to `/api/contact`.
- The handler (`app/api/contact/route.ts`) validates the input and sends an email via Resend.
- **Fallback behavior:** if no `RESEND_API_KEY` is configured, the handler logs the submission and returns success, so the form flow works in local preview without setup.

To enable real email delivery, set two environment variables (see Deployment):

- `RESEND_API_KEY` — from a free account at resend.com
- `CONTACT_EMAIL` — the address that receives submissions

Sending from a custom domain (e.g. `noreply@txsn.org`) requires verifying that domain in Resend; until then, use Resend's test sender.

---

## 9. Local setup

Requirements: Node.js 18.17+ (Node 20+ recommended).

```bash
# 1. Unzip the project, then:
cd txsn-website

# 2. Install dependencies
npm install

# 3. (Optional) enable contact email
cp .env.example .env.local
# then edit .env.local and add your Resend key

# 4. Run the dev server
npm run dev
```

Open http://localhost:3000. Edits to files reload automatically.

To test a production build locally:

```bash
npm run build
npm start
```

---

## 10. Deployment

The site is built to deploy on **Vercel**.

1. Push the project to a GitHub repository.
2. Go to vercel.com, "Add New Project", and import the repo. Vercel auto-detects Next.js — no configuration needed.
3. Under the project's **Settings → Environment Variables**, add:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
4. Deploy. You'll get a URL like `txsn-website.vercel.app`.
5. To use a custom domain (e.g. `txsn.org`), add it under **Settings → Domains** and follow the DNS instructions.

After the first deploy, **every push to the main branch redeploys automatically.** This is also how content updates go live (see below).

---

## 11. Maintenance & content updates

This matches the ~monthly update cadence the client described, with the developer handling changes.

### Typical update flow (e.g. publishing a news post)

1. Create or edit a file in `content/news/` (or `content/events/`).
2. Add any images to `public/images/`.
3. Commit and push to GitHub.
4. Vercel redeploys automatically; the change is live in ~1 minute.

No database, no admin panel, no other files touched. Because content is version-controlled in Git, every change has history and can be reverted.

### What requires a developer

Because Phase 1 has no CMS, all content edits go through the codebase. That's intentional for a single editor. If the society later wants team members to publish without the developer, a CMS can be added (a Phase 2+ option) — the current MDX content migrates into it cleanly.

### Recommended cadence

- Monthly: post news, update events, refresh resources as needed.
- Before launch: replace placeholder content (board names/photos, partner logos, resource PDFs, real contact email).

---

## 12. Roadmap: Phases 2 & 3

Phase 1 is built so these add on without rework.

### Phase 2 — Membership system

- Member login & registration (Supabase Auth)
- Member-only portal and resources
- Two membership tiers (trainee/full) with access control
- Online membership application & dues renewal (Stripe Checkout)
- Automatic renewal reminder emails (Resend)
- Database introduced (Postgres via Supabase)

The placeholder pages at `/membership/join` and `/resources/member` become the real flows.

### Phase 3 — Events, abstracts & careers

- Event registration with member-discount pricing (Stripe)
- Automated event confirmation & reminder emails
- Abstract submission portal with admin review workflow
- Expanded job board with employer self-submission

The placeholder pages at `/annual-meeting/register` and `/annual-meeting/abstracts` become the real flows.

### Data model (arrives Phase 2/3)

Phase 1 needs no database. Phases 2–3 add Postgres tables for `members`, `payments`, `events`, `registrations`, `abstracts`, and `jobs`. The MDX content from Phase 1 continues to work alongside the database.

---

## 13. Known limitations

These are intentional Phase 1 boundaries, not defects:

- **Placeholder content.** Board members, corporate partners, resource documents, and some copy are realistic placeholders. They must be replaced with real data before public launch.
- **No accounts or payments.** Anything requiring login or a transaction is a "coming soon" placeholder by design.
- **Content edits require the developer.** No CMS in Phase 1 (single-editor model).
- **Contact email needs configuration.** Until `RESEND_API_KEY` and a verified sending domain are set, the form logs rather than emails.
- **Job board is curated.** Listings are maintained by the developer; employer self-posting is Phase 3.

---

*End of Phase 1 documentation.*
