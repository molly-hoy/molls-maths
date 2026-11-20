-- ==========================================================================
-- Lesson teaching text: members-only storage (run ONCE in Supabase SQL Editor,
-- after schema.sql has been run).
-- --------------------------------------------------------------------------
-- The teaching text of each lesson is stored in the table lesson_content.
-- Nobody can read the table directly. Logged-in members with a plan get the
-- text through the function get_lesson_content(), and that function checks
-- account_has_access() first, so the database decides, not the website.
--
-- The lesson text is written into this table by scripts/upload-lessons.mjs,
-- which uses the secret key on your own computer.
-- ==========================================================================

-- ---------- 1. The table ----------
-- One row per lesson. body holds the lesson's teaching text as JSON.
create table if not exists public.lesson_content (
  lesson_id   text primary key,
  body        jsonb not null,
  updated_at  timestamptz not null default now()
);

-- Switch on Row Level Security, and add NO policies. With no policy, nobody
-- can read or write the table through the website's login.
alter table public.lesson_content enable row level security;

-- Also remove any direct table access from logged-in users and visitors.
revoke all on public.lesson_content from anon, authenticated;

-- The upload script (scripts/upload-lessons.mjs) writes the rows with the secret
-- key, which uses the "service_role" database role. That role needs its own grant.
grant select, insert, update, delete on public.lesson_content to service_role;

-- ---------- 2. The members-only read ----------
-- Returns the lesson text for one lesson id, or raises an error if the caller
-- has no plan. security definer lets the function read the table even though
-- ordinary users cannot.
create or replace function public.get_lesson_content(p_lesson_id text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.account_has_access() then
    raise exception 'Members only';
  end if;

  return (
    select lc.body
    from public.lesson_content lc
    where lc.lesson_id = p_lesson_id
  );
end;
$$;

-- Only logged-in users may call it. Visitors may not.
revoke execute on function public.get_lesson_content(text) from public, anon;
grant execute on function public.get_lesson_content(text) to authenticated;
