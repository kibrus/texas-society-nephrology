-- 0004_stripe_events.sql
-- Idempotency ledger for Stripe webhooks. Stripe may deliver the same event
-- more than once; the webhook handler inserts the event id here inside the same
-- transaction as its side effects and treats a unique-violation as "already
-- processed" -- preventing double-extending dues_paid_until or duplicate
-- payment rows.
--
-- Stores only Stripe's opaque event id and type -- no personal data, no payload.
--
-- RLS: enabled with NO policies. Only the webhook route (service_role) writes it.

create table public.stripe_events (
  id            text primary key,          -- Stripe event id, e.g. evt_123
  type          text not null,             -- e.g. invoice.paid
  processed_at  timestamptz not null default now()
);

alter table public.stripe_events enable row level security;
