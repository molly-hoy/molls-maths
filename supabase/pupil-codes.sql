-- ==========================================================================
-- pupil-codes.sql
-- --------------------------------------------------------------------------
-- Lets two adults each have a pupil called the same username ("emma").
--
-- 1. Each adult (parent, teacher, tutor) gets a short PUPIL SIGN-IN CODE,
--    e.g. "k7mq2d". Pupils type it first when they log in. It is not secret:
--    it only tells the site which adult the pupil belongs to.
-- 2. A pupil's username only has to be unique within one adult's pupils.
--    The login email becomes "<code>-<username>@pupils...", which is unique.
--
-- Run this ONCE in the Supabase SQL Editor, after schema.sql.
-- It is safe to run again.
-- ==========================================================================

-- A random 6-character code: lower-case letters and digits that are easy to
-- read and type (no 0/o, 1/l/i).
create or replace function public.make_pupil_code()
returns text
language sql
volatile
as $$
  select string_agg(
    substr('abcdefghjkmnpqrstuvwxyz23456789', 1 + floor(random() * 32)::int, 1),
    ''
  )
  from generate_series(1, 6)
$$;

-- The code column. unique means no two adults share a code.
alter table public.profiles add column if not exists pupil_code text unique;

-- Give every existing adult a code.
update public.profiles set pupil_code = public.make_pupil_code() where pupil_code is null;

-- Give every new adult a code automatically.
alter table public.profiles alter column pupil_code set default public.make_pupil_code();

-- Usernames only need to be unique within one adult's pupils.
-- Drop the old "unique on username across everyone" rule (its name is the
-- default one Postgres gave it), then add the new rule.
alter table public.students drop constraint if exists students_username_key;
alter table public.students drop constraint if exists students_owner_username_key;
alter table public.students add constraint students_owner_username_key unique (owner_id, username);
