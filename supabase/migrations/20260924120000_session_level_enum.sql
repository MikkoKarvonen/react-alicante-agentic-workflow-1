-- Issue #2: show each session's level (beginner / intermediate / advanced)
-- in the schedule UI. Adds a `level` enum column to `public.sessions`,
-- backfills the 8 existing rows, then enforces NOT NULL.
--
-- No RLS change needed: the existing "Sessions are publicly readable" policy
-- on public.sessions is per-row (using (true)) and already covers this
-- column for anon/authenticated selects.

do $$
begin
  if not exists (
    select 1
    from pg_type
    where typname = 'session_level'
      and typnamespace = 'public'::regnamespace
  ) then
    create type public.session_level as enum (
      'beginner',
      'intermediate',
      'advanced'
    );
  end if;
end $$;

alter table public.sessions
  add column if not exists level public.session_level;

update public.sessions set level = 'beginner' where id = 'opening-keynote' and level is null;
update public.sessions set level = 'intermediate' where id = 'build-your-agentic-workflow' and level is null;
update public.sessions set level = 'advanced' where id = 'server-components-deep-dive' and level is null;
update public.sessions set level = 'advanced' where id = 'rsc-payload-budget' and level is null;
update public.sessions set level = 'intermediate' where id = 'agent-context-windows' and level is null;
update public.sessions set level = 'advanced' where id = 'micro-frontends-2026' and level is null;
update public.sessions set level = 'intermediate' where id = 'testing-ai-generated-code' and level is null;
update public.sessions set level = 'beginner' where id = 'closing-panel' and level is null;

alter table public.sessions
  alter column level set not null;
