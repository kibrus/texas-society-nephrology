# Texas Society of Nephrology — Website (Phase 1)

The public website for the Texas Society of Nephrology, built with Next.js.
This is the Phase 1 foundation: the full public site, with later-phase features
(membership payments, event registration, abstract submission) stubbed in the
navigation as "coming soon" so the structure is complete from day one.

## Stack

- **Next.js 14** (App Router) — framework
- **Tailwind CSS** — styling, with TxSN brand tokens in `tailwind.config.ts`
- **MDX** — news posts and events live as text files in `content/`
- **Resend** — contact form email delivery
- Deploys to **Vercel**

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To enable the contact form's email delivery, copy `.env.example` to `.env.local`
and add your Resend API key. Without a key, the form still works — submissions
are logged to the console so the flow can be previewed.

## Editing content

All editable content lives in two places, separate from the code:

### News posts — `content/news/`

Add a news post by copying an existing `.mdx` file and editing it:

```
---
title: "Your headline"
date: "2026-04-01"        # YYYY-MM-DD, controls ordering
author: "TxSN"
excerpt: "One-line summary shown on cards."
category: "Education"      # optional label
---

Your article body in Markdown. Use ## for subheadings.
```

The filename becomes the URL: `my-post.mdx` → `/news/my-post`.
The homepage shows the 3 newest automatically; `/news` lists all.

### Events — `content/events/`

```
---
title: "Event name"
date: "2026-07-09"
location: "Austin, TX"     # or "Online"
isFree: true               # false = paid
memberDiscount: false      # true shows "Member discount"
excerpt: "One-line summary."
---

Event description in Markdown.
```

### Site data — `lib/site.ts`

Navigation, leadership, corporate partners, membership tiers, and the annual
meeting schedule are edited in `lib/site.ts`.

## Updating the brand

Colors and fonts are defined once in `tailwind.config.ts` under `colors.txsn`.
Change a value there and it updates everywhere.

## Deploying

Push to GitHub and import the repo into Vercel. Set `RESEND_API_KEY` and
`CONTACT_EMAIL` as environment variables in the Vercel dashboard. Every push to
the main branch redeploys automatically.

## Phase roadmap

- **Phase 1 (this build):** public site, content via MDX, contact form
- **Phase 2:** member login, member-only resources, Stripe membership + renewals
- **Phase 3:** event registration, abstract submission, expanded job board
