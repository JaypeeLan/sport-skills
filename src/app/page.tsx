import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ACTIVITIES } from '@/lib/activities'
import { getUser } from '@/lib/db'
import { SITE } from '@/lib/site'
import { Button } from '@/components/ui/button'
import HeroCarousel from '@/components/HeroCarousel'
import { ArrowRight } from 'lucide-react'

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

export default async function Home() {
  // Signed-in learners belong on their dashboard, not the marketing page.
  if (await getUser()) redirect('/dashboard')

  return (
    <main className="relative flex h-dvh flex-col overflow-hidden bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroCarousel />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-lg font-semibold tracking-tight">SkillPath</span>
        <div className="flex items-center gap-4">
          <Link href="/auth?mode=login" className="text-sm text-slate-300 hover:text-white">
            Sign in
          </Link>
          <Link href="/auth">
            <Button size="sm" className="bg-emerald-500 text-slate-950 hover:bg-emerald-400">
              Get started
            </Button>
          </Link>
        </div>
      </header>

      <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-emerald-400">
          Learn any physical skill
        </p>

        <h1 className="max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          From complete beginner to advanced — in any sport
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-base text-slate-300 sm:text-lg">
          Tell us what you want to learn and why. SkillPath builds a personalised, step-by-step
          track — real technique, real demonstrations, and the mistakes to avoid.
        </p>

        <Link href="/auth" className="mt-8">
          <Button size="lg" className="bg-emerald-500 text-slate-950 hover:bg-emerald-400">
            Build my track <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>

        <div className="mt-12 hidden max-w-3xl flex-wrap items-center justify-center gap-2 sm:flex">
          {ACTIVITIES.slice(0, 10).map((a) => (
            <span
              key={a.id}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 backdrop-blur-sm"
            >
              <span aria-hidden>{a.icon}</span>
              {a.name}
            </span>
          ))}
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400 backdrop-blur-sm">
            +{ACTIVITIES.length - 10} more
          </span>
        </div>
      </section>
    </main>
  )
}
