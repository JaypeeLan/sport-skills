# SkillPath

An interactive learning platform that takes someone from complete beginner to
advanced in any sport or physical skill, through personalised, visual,
step-by-step learning tracks.

The interesting part isn't the number of sports. It's that there is **one
learning engine**: adding a sport means adding its goals to a data file, not
building a separate experience. Onboarding, curriculum generation and lesson
rendering are all activity-agnostic.

## How it works

```
Activity → Goal → Experience → Track → Module → Lesson
```

1. The learner picks an activity (62 available), then a goal specific to that
   activity, then their current experience level.
2. Groq generates a progressive curriculum — 4–6 modules from foundations to
   advanced, each with concrete, practisable lessons.
3. Lessons are generated on demand and cached, so returning to a lesson shows
   the same content the learner practised against.
4. Modules unlock in order, so foundations can't be skipped.

Goals matter: *"learn to swim from scratch"* and *"improve freestyle"* produce
genuinely different tracks. Experience level shifts where the track starts — an
experienced learner's track opens at intermediate rather than wasting their time.

## The visual layer

Physical skills can't be taught as a wall of text, but they also can't be taught
with wrong information. Demonstrations resolve to **real coaching footage** via
the YouTube Data API rather than generated imagery — a generated body position
that is subtly wrong teaches bad technique, which is worse than no image at all.

AI-generated art is used only for track cover images, where being decorative is
the whole job.

Each step also carries a short body-focus cue ("Head position", "Lead hand") so
the learner knows what to concentrate on, plus the common mistakes that quietly
build bad habits.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, server components, server actions) |
| Auth + DB | Supabase (Postgres + Row Level Security) |
| AI | Groq (`openai/gpt-oss-20b`) for curriculum and lesson generation |
| Video | YouTube Data API v3 |
| Styling | Tailwind CSS v4 + shadcn/ui |

## Running locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Run `supabase-schema.sql` in the Supabase SQL editor to create the tables and
row-level security policies.

### Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `GROQ_API_KEY` | Curriculum and lesson generation |
| `YOUTUBE_API_KEY` | Resolves lessons to real coaching videos |

`YOUTUBE_API_KEY` is optional — without it, lessons fall back to a search link
instead of an embedded video.

## Data model

- `tracks` — one learner pursuing one goal in one activity, with the generated
  curriculum stored as JSON
- `lessons` — generated lesson content, cached per track/module/lesson
- `progress` — one row per completed lesson

Every table is protected by row-level security keyed on `auth.uid()`, so a
learner can only ever read their own data.

## Adding a sport

Add an entry to `ACTIVITIES` in `src/lib/activities.ts` with an id, name, icon,
category and its own list of goals. Nothing else needs to change.
