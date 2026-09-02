alter table public.admin_users enable row level security;

drop policy if exists "Admins can verify own membership" on public.admin_users;
create policy "Admins can verify own membership"
on public.admin_users
for select
to authenticated
using (user_id = auth.uid());
