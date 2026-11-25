# SportPath

The SportPath website at https://sportpath.app. It is a landing page only: learning happens in the
iPhone and Android apps (the `skillpath-mobile` repository). The web app with sign-in, tracks and lessons
was removed on 25 November 2026. Its old addresses (`/auth`, `/dashboard`, `/onboarding`, `/track`)
redirect to the landing page.

## Pages

| Page | Purpose |
|---|---|
| `/` | The landing page, with App Store and Google Play buttons (`src/lib/stores.ts`) |
| `/privacy`, `/terms` | Legal pages that the stores link to |
| `/delete-account` | How to delete an account. Google Play requires this page. |
| `/b/<shareId>` | A badge a learner shared from the app. It reads the badge from the API. |

## Stack

| Layer | Choice |
|---|---|
| Web | Next.js 16 (App Router, server components) |
| Backend | The SportPath API in the private `skillpath-api` repository, for shared badges only |
| Styling | Tailwind CSS v4 |

The browser never calls the API directly. The site has no sign-in, no secrets and no database access.

## Environments

The site runs on Cloudflare Workers, through the OpenNext adapter. `wrangler.jsonc` defines both workers.

| Environment | Branch | Worker | URL | API |
|---|---|---|---|---|
| Staging | `staging` | `sportpath-web-staging` | https://staging.sportpath.app | https://api-staging.sportpath.app/v1 |
| Production | `main` | `sportpath-web` | https://sportpath.app | https://api.sportpath.app/v1 |

Changes go through pull requests: feature branch → `staging` → `main`. A push to either branch runs `.github/workflows/deploy.yml`, which deploys that branch's worker. The workflow needs the repository secret `CLOUDFLARE_API_TOKEN`, a Cloudflare API token that may edit Workers scripts and the `sportpath.app` zone's Workers routes.

`www.sportpath.app` redirects to `https://sportpath.app` (see `next.config.ts`).

Runtime values (`API_URL`, `APP_ENV`) are Worker variables in `wrangler.jsonc`, read at request time. One build serves both environments. On staging, `robots.txt` blocks all crawlers.

## Running locally

1. Start the API, if you work on the badge pages. Its README explains the setup.
2. Configure and start the site. It runs on http://localhost:3000.

   ```bash
   npm install
   ```

   ```bash
   cp .env.example .env.local
   ```

   ```bash
   npm run dev
   ```

   To run it on the Workers runtime instead, put the same values in `.dev.vars` and run `npm run preview`.

### Environment variables

| Variable | Purpose |
|---|---|
| `API_URL` | Base URL of the API, including the version, for the badge pages. Default: `http://localhost:4000/v1` |

## Adding a sport

Sports are added in the API (`src/activities/catalog.ts`). The landing page lists them from its own
copy in `src/lib/activities.ts`, so copy a new entry there too.
