-- ==========================================================================
-- Pupil progress saved on the server (run ONCE in Supabase SQL Editor, after
-- schema.sql has been run).
-- --------------------------------------------------------------------------
-- A pupil's progress used to live only in their own browser. Now a logged-in
-- pupil's browser also saves a copy here, in one row per pupil. The adult who
-- owns that pupil can read it, for the pupil reports and the PDF.
--
-- The rules below mean:
--   • a pupil can read and save only their own row;
--   • an adult can read the rows of their own pupils, and only with a plan.
-- ==========================================================================

create table if not exists public.pupil_progress (
  student_id  uuid primary key references public.students (id) on delete cascade,
  data        jsonb not null,
  updated_at  timestamptz not null default now()
);

alter table public.pupil_progress enable row level security;

-- The pupil saves and reads their own progress.
create policy "Pupils read own progress"
  on public.pupil_progress for select to authenticated
  using (student_id in (select s.id from public.students s where s.auth_user_id = (select auth.uid())));

create policy "Pupils save own progress"
  on public.pupil_progress for insert to authenticated
  with check (student_id in (select s.id from public.students s where s.auth_user_id = (select auth.uid())));

create policy "Pupils update own progress"
  on public.pupil_progress for update to authenticated
  using (student_id in (select s.id from public.students s where s.auth_user_id = (select auth.uid())))
  with check (student_id in (select s.id from public.students s where s.auth_user_id = (select auth.uid())));

-- The adult reads the progress of their own pupils, only while their plan is active.
create policy "Adults read own pupils progress"
  on public.pupil_progress for select to authenticated
  using (
    public.account_has_access()
    and student_id in (select s.id from public.students s where s.owner_id = (select auth.uid()))
  );

-- Table permissions: logged-in users only, and the policies above decide what they can reach.
grant select, insert, update on public.pupil_progress to authenticated;
grant select, insert, update, delete on public.pupil_progress to service_role;
