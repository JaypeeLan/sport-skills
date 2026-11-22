import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BadgeMedal from '@/components/badges/BadgeMedal'
import { Button } from '@/components/ui/button'
import { BADGE_LABEL, formatEarned } from '@/lib/badges'
import { getSharedBadge } from '@/lib/db'
import { SITE } from '@/lib/site'

type Props = { params: Promise<{ shareId: string }> }

function heading(name: string | null) {
  return name ? `${name} earned a badge` : 'A SportPath learner earned a badge'
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const badge = await getSharedBadge((await params).shareId)
  if (!badge) return { title: 'Badge not found', robots: { index: false, follow: false } }
  const title = `${badge.title}: ${BADGE_LABEL[badge.kind]}`
  const description = `${heading(badge.name)} on ${SITE.name}. ${SITE.tagline}, step by step.`
  // A personal page: shareable, but kept out of search results.
  return {
    title,
    description,
    robots: { index: false, follow: false },
    alternates: { canonical: null },
    openGraph: { title, description, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

// A shared badge, public to anyone with the link.
export default async function SharedBadgePage({ params }: Props) {
  const badge = await getSharedBadge((await params).shareId)
  if (!badge) notFound()

  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-white">
      <header className="mx-auto w-full max-w-3xl px-6 py-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {SITE.name}
        </Link>
      </header>

      <section className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center px-6 pb-16 pt-6 text-center">
        <BadgeMedal kind={badge.kind} emoji={badge.activity?.icon} size="lg" />
        <p className="mt-8 text-sm font-medium uppercase tracking-wider text-emerald-400">{BADGE_LABEL[badge.kind]}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">{badge.title}</h1>
        <p className="mt-2 text-slate-300">{badge.subtitle}</p>
        <p className="mt-6 text-sm text-slate-400">
          {heading(badge.name)} on {formatEarned(badge.earnedAt)}.
        </p>

        <div className="mt-12 w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="font-semibold">Learn a new skill, one step at a time</p>
          <p className="mt-1 text-sm text-slate-400">{SITE.description}</p>
          <Link href="/">
            <Button className="mt-5 bg-emerald-500 text-slate-950 hover:bg-emerald-400">Start learning on {SITE.name}</Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
