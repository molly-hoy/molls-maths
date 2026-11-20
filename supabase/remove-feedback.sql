-- ==========================================================================
-- Removes the old teacher feedback feature (run ONCE in Supabase SQL Editor
-- if your project was set up before feedback was removed).
-- --------------------------------------------------------------------------
-- Deleting the table also deletes its rules and permissions.
-- ==========================================================================

drop table if exists public.feedback;
