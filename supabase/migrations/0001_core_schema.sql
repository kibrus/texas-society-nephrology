-- 0001_core_schema.sql
-- Core membership tables: profiles (1:1 with auth.users) and payments.
-- Matches the build spec section 4 data model. Enum-like text columns are
-- constrained with CHECKs for integrity (money/authorization fields).

-- Shared helper: keep updated_at current on UPDATE.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id                       uuid primary key references auth.users(id) on delete cascade,
  first_name               text not null,
  last_name                text not null,
  profession               text not null
    check (profession in ('md_do','nurse','medical_trainee','dietician','social_worker','student')),
  email                    text not null,
  phone                    text,
  tier                     text not null
    check (tier in ('trainee','full')),
  membership_status        text not null default 'pending_payment'
    check (membership_status in ('pending_payment','active','expired','cancelled')),
  role                     text not null default 'member'
    check (role in ('member','admin')),
  dues_paid_until          date,
  stripe_customer_id       text,
  stripe_subscription_id   text,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

-- The webhook looks up profiles by Stripe identifiers; index them.
create index profiles_stripe_customer_id_idx on public.profiles (stripe_customer_id);
create index profiles_stripe_subscription_id_idx on public.profiles (stripe_subscription_id);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create table public.payments (
  id                          uuid primary key default gen_random_uuid(),
  profile_id                  uuid not null references public.profiles(id) on delete cascade,
  amount_cents                integer not null,
  tier                        text not null
    check (tier in ('trainee','full')),
  stripe_invoice_id           text unique,
  stripe_payment_intent_id    text,
  stripe_hosted_invoice_url   text,
  stripe_invoice_pdf_url      text,
  drive_file_id               text,
  status                      text not null
    check (status in ('succeeded','failed','refunded')),
  period_start                date not null,
  period_end                  date not null,
  created_at                  timestamptz not null default now()
);

create index payments_profile_id_idx on public.payments (profile_id);
