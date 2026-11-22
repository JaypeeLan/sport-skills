import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { redirect } from 'next/navigation'
import { ArrowRight, Check, Play, TriangleAlert } from 'lucide-react'
import { ACTIVITIES, CATEGORY_LABELS } from '@/lib/activities'
import { getUser } from '@/lib/db'
import { HERO_IMAGES, unsplash } from '@/lib/images'
import { SITE } from '@/lib/site'
import CountUp from '@/components/landing/CountUp'
import PhoneDemo from '@/components/landing/PhoneDemo'
import Reveal from '@/components/landing/Reveal'
import BrandMark from '@/components/BrandMark'

// The brand typeface. It is scoped to this page, so the signed-in app keeps its own font.
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: {
    canonical: '/',
  },
}

// Structured data so search engines understand the product, not just the copy.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
    },
    {
      '@type': 'SoftwareApplication',
      name: SITE.name,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      description: SITE.description,
      url: SITE.url,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ],
}

const GOAL_COUNT = ACTIVITIES.reduce((total, activity) => total + activity.goals.length, 0)
const CATEGORY_COUNT = Object.keys(CATEGORY_LABELS).length
const HALF = Math.ceil(ACTIVITIES.length / 2)

const STEPS = [
  {
    title: 'Pick an activity',
    body: `Choose from ${ACTIVITIES.length} sports and physical skills, from swimming to skateboarding.`,
  },
  {
    title: 'Choose your goal',
    body: 'Every activity has its own goals. Your goal decides where your track starts and what it focuses on.',
  },
  {
    title: 'Follow your track',
    body: 'Work through short lessons in order. Mark each one complete and watch your progress grow.',
  },
]

const CARD = 'rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8'
const PRIMARY_CTA =
  'group inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-6 text-base font-semibold text-slate-950 transition hover:bg-emerald-300 active:scale-[0.98]'

function delay(ms: number): CSSProperties {
  return { '--d': `${ms}ms` } as CSSProperties
}

function Logo() {
  return (
    <span className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
      <BrandMark />
      {SITE.name}
    </span>
  )
}

function ActivityMarquee({ items, reverse }: { items: typeof ACTIVITIES; reverse?: boolean }) {
  return (
    <div className="lp-marquee-wrap overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div
        className={`lp-marquee flex w-max gap-3 pr-3 ${reverse ? 'lp-marquee-reverse' : ''}`}
        style={{ '--speed': '70s' } as CSSProperties}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex gap-3" aria-hidden={copy === 1}>
            {items.map((activity) => (
              <li
                key={activity.id}
                className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200"
              >
                <span aria-hidden>{activity.icon}</span>
                {activity.name}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export default async function Home() {
  // Signed-in learners belong on their dashboard, not the marketing page.
  if (await getUser()) redirect('/dashboard')

  return (
    <main className={`lp-root relative overflow-x-clip bg-slate-950 text-white ${inter.className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="sticky top-0 z-30 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" aria-label={`${SITE.name} home`}>
            <Logo />
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <a href="#how" className="hidden rounded-lg px-3 py-2 text-sm text-slate-300 hover:text-white sm:block">
              How it works
            </a>
            <a href="#lesson" className="hidden rounded-lg px-3 py-2 text-sm text-slate-300 hover:text-white sm:block">
              Inside a lesson
            </a>
            <Link href="/auth?mode=login" className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:text-white">
              Sign in
            </Link>
            <Link
              href="/auth"
              className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* ------------------------------------------------------------ Hero */}
      <section className="relative">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="lp-drift absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-emerald-500/20 blur-[120px]" />
          <div
            className="lp-drift absolute -right-32 top-40 h-[28rem] w-[28rem] rounded-full bg-lime-300/10 blur-[120px]"
            style={{ animationDelay: '-9s' }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-6 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:pb-28 lg:pt-24">
          <div>
            <p
              className="lp-rise inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-300"
              style={delay(0)}
            >
              <span className="relative flex h-2 w-2">
                <span className="lp-ping absolute inset-0 rounded-full bg-emerald-400" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Learn any physical skill
            </p>

            <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="lp-rise block" style={delay(80)}>
                Learn any sport,
              </span>
              <span
                className="lp-rise block bg-gradient-to-r from-emerald-300 via-emerald-400 to-lime-300 bg-clip-text pb-2 text-transparent"
                style={delay(200)}
              >
                one lesson at a time.
              </span>
            </h1>

            <p className="lp-rise mt-6 max-w-xl text-pretty text-lg leading-relaxed text-slate-300" style={delay(320)}>
              Tell {SITE.name} what you want to learn and why. It builds a personal, step-by-step track with real
              technique, real demonstrations, and the mistakes to avoid.
            </p>

            <div className="lp-rise mt-8 flex flex-wrap items-center gap-3" style={delay(440)}>
              <Link href="/auth" className={PRIMARY_CTA}>
                Build my track
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#how"
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/15 px-6 text-base font-semibold text-white transition hover:bg-white/5"
              >
                See how it works
              </a>
            </div>

            <p className="lp-rise mt-6 text-sm text-slate-400" style={delay(560)}>
              {ACTIVITIES.length} activities and {GOAL_COUNT} goals to choose from.
            </p>
          </div>

          <div className="lp-rise relative" style={delay(300)}>
            {/* The rising path from the logo, drawn once on load. */}
            <svg
              aria-hidden
              viewBox="0 0 400 400"
              className="pointer-events-none absolute -inset-x-10 -top-6 h-[110%] w-[calc(100%+5rem)] text-emerald-400/40"
              fill="none"
            >
              <path
                d="M10 360 C 90 330, 110 250, 180 240 S 270 190, 300 120 S 360 50, 390 30"
                pathLength={1}
                className="lp-line lp-line-now"
                style={delay(600)}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <div className="lp-float">
              <PhoneDemo />
            </div>

            <div
              aria-hidden
              className="lp-float absolute -left-24 top-52 hidden w-48 rounded-2xl border border-amber-300/20 bg-slate-900/90 p-3 text-xs shadow-xl backdrop-blur lg:block"
              style={delay(-2000)}
            >
              <p className="flex items-center gap-1.5 font-semibold uppercase tracking-wider text-amber-300">
                <TriangleAlert className="h-3.5 w-3.5" /> Mistake
              </p>
              <p className="mt-1 text-slate-200">Stopping the ball dead under your foot.</p>
              <p className="mt-2 flex items-center gap-1.5 font-semibold uppercase tracking-wider text-emerald-300">
                <Check className="h-3.5 w-3.5" /> Fix
              </p>
              <p className="mt-1 text-slate-200">Cushion it one step forward.</p>
            </div>

            <div
              aria-hidden
              className="lp-float absolute -right-6 bottom-24 hidden items-center gap-2 rounded-full border border-white/10 bg-slate-900/90 px-4 py-2 text-xs shadow-xl backdrop-blur lg:flex"
              style={delay(-4000)}
            >
              <span className="text-slate-400">Focus</span>
              <span className="font-semibold text-white">Soft ankle</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Activities */}
      <section aria-label="Activities" className="space-y-3 border-y border-white/5 py-8">
        <ActivityMarquee items={ACTIVITIES.slice(0, HALF)} />
        <ActivityMarquee items={ACTIVITIES.slice(HALF)} reverse />
      </section>

      {/* ---------------------------------------------------- How it works */}
      <section id="how" className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">How it works</p>
          <h2 className="mt-3 max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            From &ldquo;I want to learn&rdquo; to your first lesson in under a minute.
          </h2>
        </Reveal>

        <Reveal className="relative mt-16">
          <svg
            aria-hidden
            viewBox="0 0 1000 40"
            preserveAspectRatio="none"
            className="absolute left-0 top-6 hidden h-10 w-full text-emerald-400/50 md:block"
            fill="none"
          >
            <path
              d="M30 20 H 970"
              pathLength={1}
              className="lp-line"
              style={delay(200)}
              stroke="currentColor"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={150 + i * 180}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400 text-lg font-bold text-slate-950 ring-8 ring-slate-950">
                    {i + 1}
                  </span>
                  <h3 className="mt-6 text-2xl font-bold tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-pretty leading-relaxed text-slate-300">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* ------------------------------------------------- Inside a lesson */}
      <section id="lesson" className="mx-auto w-full max-w-6xl px-6 pb-24 sm:pb-32">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">Inside a lesson</p>
          <h2 className="mt-3 max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Coaching you can use in the middle of practice.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <article className={`${CARD} h-full`}>
              <h3 className="text-2xl font-bold tracking-tight">Steps you can feel</h3>
              <p className="mt-2 max-w-lg text-slate-300">
                Each step says what to do, how it should feel when you get it right, and the one thing to focus on.
              </p>
              <ol className="mt-6 space-y-3">
                {[
                  ['Open your body to the field', 'Turn your hips so you can see both the ball and the space behind you.', 'Hips half-turned'],
                  ['Receive with your back foot', 'Let the ball roll across you and meet it with the foot farther from the passer.', 'Back foot, inside'],
                ].map(([instruction, detail, focus], i) => (
                  <li key={instruction} className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 font-semibold text-emerald-300">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{instruction}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-300">{detail}</p>
                      <p className="mt-2 inline-flex gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs">
                        <span className="text-slate-400">Focus</span>
                        <span className="font-medium text-white">{focus}</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          </Reveal>

          <Reveal delay={120}>
            <article className="h-full rounded-3xl border border-amber-300/20 bg-amber-300/[0.06] p-6 sm:p-8">
              <h3 className="text-2xl font-bold tracking-tight">Mistakes, with the fix</h3>
              <p className="mt-2 text-slate-300">Know what goes wrong before it becomes a habit.</p>
              <div className="mt-6 space-y-4 rounded-2xl bg-slate-950/60 p-4">
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300">
                    <TriangleAlert className="h-3.5 w-3.5" /> Mistake
                  </p>
                  <p className="mt-1.5 leading-relaxed">Facing the passer with square hips.</p>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300">
                    <Check className="h-3.5 w-3.5" /> Fix
                  </p>
                  <p className="mt-1.5 leading-relaxed">
                    Stand side-on before the pass arrives, with one shoulder toward the passer.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal>
            <article className={`${CARD} h-full`}>
              <h3 className="text-2xl font-bold tracking-tight">Watch it first</h3>
              <p className="mt-2 text-slate-300">A real demonstration to watch before you try the movement.</p>
              <div className="group mt-6 flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900">
                <span className="relative flex h-14 w-14 items-center justify-center">
                  <span className="lp-ping absolute inset-0 rounded-full bg-emerald-400" />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400 text-slate-950">
                    <Play className="h-6 w-6 translate-x-0.5 fill-current" />
                  </span>
                </span>
              </div>
            </article>
          </Reveal>

          <Reveal delay={120}>
            <article className={`${CARD} h-full`}>
              <h3 className="text-2xl font-bold tracking-tight">Practice right away</h3>
              <p className="mt-2 text-slate-300">Every lesson ends with a short drill and the equipment you need.</p>
              <p className="mt-6 rounded-2xl bg-emerald-400/10 p-4 leading-relaxed text-emerald-50">
                Do 3 rounds of 10 passes against the wall. Receive across your body each time, then switch feet.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2 text-xs text-slate-200">
                {['1 football', 'A wall or a partner', '2 cones'].map((item) => (
                  <li key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={240}>
            <article className={`${CARD} flex h-full flex-col`}>
              <h3 className="text-2xl font-bold tracking-tight">See your progress</h3>
              <p className="mt-2 text-slate-300">Mark a lesson complete and the next one is ready.</p>
              <div className="mt-6 flex flex-1 items-center gap-5">
                <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90" aria-hidden>
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    pathLength={1}
                    className="lp-line"
                    style={{ '--len': 0.625, ...delay(300) } as CSSProperties}
                    stroke="#34d399"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                </svg>
                <div>
                  <p className="text-4xl font-bold tracking-tight">5 of 8</p>
                  <p className="text-sm text-slate-400">lessons done</p>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- Gallery */}
      <section aria-label="Sports" className="lp-marquee-wrap overflow-hidden">
        <div className="lp-marquee flex w-max gap-4 pr-4" style={{ '--speed': '60s' } as CSSProperties}>
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex gap-4" aria-hidden={copy === 1}>
              {HERO_IMAGES.map((image) => (
                <li key={image.id} className="relative h-64 w-80 overflow-hidden rounded-3xl sm:h-80 sm:w-[26rem]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={unsplash(image.id, 900)}
                    alt={copy === 0 ? image.caption : ''}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent" />
                  <span className="absolute bottom-4 left-5 text-lg font-semibold">{image.caption}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------- Numbers */}
      <section className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <dl className="grid gap-10 text-center sm:grid-cols-3">
            {[
              [ACTIVITIES.length, 'activities'],
              [GOAL_COUNT, 'goals to choose from'],
              [CATEGORY_COUNT, 'categories, from water to winter'],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-col-reverse gap-2">
                <dt className="text-slate-400">{label}</dt>
                <dd className="bg-gradient-to-b from-white to-emerald-300 bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-7xl">
                  <CountUp value={value as number} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* ------------------------------------------------------------- CTA */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-500/20 via-slate-900 to-slate-950 px-6 py-16 text-center sm:px-16 sm:py-24">
            <svg
              aria-hidden
              viewBox="0 0 1000 300"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full text-emerald-400/30"
              fill="none"
            >
              <path
                d="M0 280 C 200 260, 260 180, 420 170 S 640 120, 760 70 S 920 20, 1000 10"
                pathLength={1}
                className="lp-line"
                style={delay(200)}
                stroke="currentColor"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <h2 className="relative mx-auto max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-6xl">
              Your first lesson is a few seconds away.
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-lg text-slate-300">
              Pick an activity, choose a goal, and start. iOS and Android apps are on the way.
            </p>
            <Link href="/auth" className={`${PRIMARY_CTA} relative mt-8`}>
              Build my track
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-white/5">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-400 sm:flex-row">
          <Logo />
          <p>&copy; {new Date().getFullYear()} Syntronware. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/auth?mode=login" className="hover:text-white">
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
