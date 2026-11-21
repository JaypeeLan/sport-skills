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
2. A light model on OpenRouter generates a progressive curriculum — 4–6 modules from foundations to
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
| Web | Next.js 16 (App Router, server components, server actions) |
| Backend | The SkillPath API in the private `skillpath-api` repository |
| Styling | Tailwind CSS v4 + shadcn/ui |

```
Browser -> Next.js (httpOnly session cookie) -> SkillPath API (Bearer token) -> Postgres
```

The browser never calls the API directly. Next.js server code calls it with the
session token from an httpOnly cookie. The web app holds no secrets and has no
database access. Accounts, tracks, lessons, progress and AI generation all live
in the API.

After the mobile app (`skillpath-mobile`) ships, this web app becomes a landing page.

## Environments

The web app runs on Vercel. Each environment uses the matching API.

| Environment | Branch | Vercel | `API_URL` |
|---|---|---|---|
| Staging | `staging` | Preview deployment of the `staging` branch | The staging API, `.../v1` |
| Production | `main` | Production deployment | The production API, `.../v1` |

Changes go through pull requests: feature branch → `staging` → `main`.

In Vercel, set `API_URL` for Production to the production API. Set it for Preview, limited to the `staging` branch, to the staging API.

## Running locally

1. Start the API. Its README explains the setup.
2. Configure and start the web app. It runs on http://localhost:3000.

   ```bash
   npm install
   ```

   ```bash
   cp .env.example .env.local
   ```

   ```bash
   npm run dev
   ```

### Environment variables

| Variable | Purpose |
|---|---|
| `API_URL` | Base URL of the API, including the version. Default: `http://localhost:4000/v1` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Public Google OAuth web client id. Without it, the "Sign in with Google" button is hidden |

## Adding a sport

Add an entry to `ACTIVITIES` in `src/activities/catalog.ts` in the API, with an
id, name, icon, category and its own list of goals. Then copy the same entry to
`src/lib/activities.ts` here. The web app keeps its own copy until it reads the
catalog from the API's `/activities` route.
