-- 0006_revoke_is_admin_from_anon.sql
-- Supabase grants EXECUTE on new public functions to anon and authenticated by
-- default (via ALTER DEFAULT PRIVILEGES), so revoking from PUBLIC in 0005 did
-- not remove anon's explicit grant. Revoke it directly. `authenticated` keeps
-- EXECUTE because the profiles admin RLS policies call is_admin() during query
-- evaluation under the caller's role.
revoke execute on function public.is_admin() from anon;
