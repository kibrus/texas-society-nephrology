-- 0003_signup_drafts.sql
-- Temporary holding table for signup Step 1 data, keyed by the (unconfirmed)
-- auth user id. The profiles row is NOT created until the email OTP is verified
-- (signup Step 3); until then the pending details live here. Passwords are
-- never stored -- they go straight to Supabase Auth on user creation.
--
-- A later stage adds a nightly job that deletes drafts (and their unconfirmed
-- auth users) that never completed payment within 24h.
--
-- RLS: enabled with NO policies, so browser sessions cannot read or write it.
-- Only the signup server routes (service_role, secret key) touch this table.

create table public.signup_drafts (
  id           uuid primary key references auth.users(id) on delete cascade,
  first_name   text not null,
  last_name    text not null,
  profession   text not null,
  email        text not null,
  phone        text,
  created_at   timestamptz not null default now()
);

alter table public.signup_drafts enable row level security;
