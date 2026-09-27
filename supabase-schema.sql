-- A track is one learner pursuing one goal inside one activity.
-- The AI-generated curriculum (modules + lesson stubs) lives in `curriculum`.
create table tracks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  activity text not null,
  goal text not null,
  experience text,
  level text not null default 'beginner',
  curriculum jsonb,
  created_at timestamptz default now()
);

-- Lessons are generated on demand and cached here so a learner
-- returning to a lesson sees the same content they practiced against.
create table lessons (
  id uuid primary key default gen_random_uuid(),
  track_id uuid references tracks on delete cascade not null,
  module_index int not null,
  lesson_index int not null,
  title text not null,
  content jsonb,
  created_at timestamptz default now(),
  unique (track_id, module_index, lesson_index)
);

create table progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  track_id uuid references tracks on delete cascade not null,
  module_index int not null,
  lesson_index int not null,
  completed_at timestamptz default now(),
  unique (user_id, track_id, module_index, lesson_index)
);

alter table tracks enable row level security;
alter table lessons enable row level security;
alter table progress enable row level security;

create policy "own tracks" on tracks for all using (auth.uid() = user_id);
create policy "own progress" on progress for all using (auth.uid() = user_id);

-- Lessons have no user_id of their own; ownership is inherited from the track.
create policy "lessons of own tracks" on lessons for all using (
  exists (select 1 from tracks where tracks.id = lessons.track_id and tracks.user_id = auth.uid())
);

create index tracks_user_idx on tracks (user_id);
create index lessons_track_idx on lessons (track_id);
create index progress_track_idx on progress (track_id);
