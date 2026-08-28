-- 0007_signup_drafts_tier.sql
-- The signup form lets the applicant self-select their tier (Trainee vs Full),
-- so the chosen tier must survive from Step 1 (draft) through email OTP
-- verification (Step 3), when the profiles row is finally created. A default is
-- set only so the ALTER succeeds on any stray rows; every insert passes it
-- explicitly.
alter table public.signup_drafts
  add column tier text not null default 'full'
  check (tier in ('trainee', 'full'));
