-- 0002_rls_policies.sql
-- Row-Level Security for profiles and payments.
--
-- Authorization model (server-authoritative, per the security playbook):
--   * Browser sessions (publishable key -> `authenticated` role) can only READ
--     their own data and UPDATE a narrow set of non-privileged profile columns.
--   * All privileged writes -- creating profiles, changing role/status/tier/
--     dues/stripe ids, inserting payments -- happen ONLY in server routes using
--     the secret key (`service_role`), which BYPASSES RLS. The webhook and the
--     admin update route are those server routes.
--   * `role`, `membership_status`, `tier`, `dues_paid_until`,
--     `stripe_customer_id`, `stripe_subscription_id` are never writable from a
--     browser session -- enforced with column-level GRANTs below, not just RLS.

-- SECURITY DEFINER helper so admin policies can check role without recursive
-- RLS evaluation against profiles.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;

-- A user can read their own row.
create policy profiles_select_own
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

-- Admins can read every row.
create policy profiles_select_admin
  on public.profiles for select
  to authenticated
  using (public.is_admin());

-- A user can update their own row. Which COLUMNS they may change is limited by
-- the column GRANTs below (privileged columns are revoked from authenticated).
create policy profiles_update_own
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- Restrict authenticated to updating only non-privileged columns.
revoke update on public.profiles from authenticated;
grant update (first_name, last_name, profession, phone, email)
  on public.profiles to authenticated;

-- ---------------------------------------------------------------------------
-- payments
-- ---------------------------------------------------------------------------
alter table public.payments enable row level security;

-- Members can read their own payment rows.
create policy payments_select_own
  on public.payments for select
  to authenticated
  using (profile_id = auth.uid());

-- Admins can read all payment rows.
create policy payments_select_admin
  on public.payments for select
  to authenticated
  using (public.is_admin());

-- No INSERT/UPDATE/DELETE policies for authenticated: those happen only via the
-- service_role (secret key) in the webhook handler, which bypasses RLS.
