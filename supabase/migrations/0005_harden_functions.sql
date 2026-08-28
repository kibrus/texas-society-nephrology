-- 0005_harden_functions.sql
-- Security hardening for the helper functions introduced in 0001/0002,
-- addressing Supabase database-linter warnings.
--
-- 1. Pin set_updated_at's search_path so it can't be hijacked via a mutable
--    search_path (lint 0011_function_search_path_mutable).
-- 2. Restrict is_admin() so the anon (signed-out) role cannot call it over the
--    REST RPC endpoint. It stays callable by `authenticated`, which the RLS
--    policies require (lint 0028/0029). is_admin only ever reveals the CALLER's
--    own admin status, so this is defense-in-depth, not a fix for a leak.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke execute on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;
