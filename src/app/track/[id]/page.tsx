import { cache } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTrack, getCompleted } from '@/lib/db'
import { isModuleUnlocked } from '@/lib/progression'
import { getActivity } from '@/lib/activities'
import { trackCover } from '@/lib/images'
import { Badge } from '@/components/ui/badge'
import { Check, ChevronRight, Lock } from 'lucide-react'

const LEVEL_STYLES: Record<string, string> = {
  beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  advanced: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
}

// Shared between generateMetadata and the page so the track is fetched once.
const loadTrack = cache(getTrack)

// Tracks are personal, signed-in content — keep them out of search results.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const track = await loadTrack(id)
  if (!track?.curriculum) return { title: 'Track' }

  const activity = getActivity(track.activity)
  return {
    title: `${activity?.name ?? track.activity} — ${track.goal}`,
    description: track.curriculum.summary,
    robots: { index: false, follow: false },
  }
}

export default async function TrackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const track = await loadTrack(id)
  if (!track?.curriculum) notFound()

  const completed = await getCompleted(id)
  const doneKeys = new Set(completed.map((c) => `${c.module_index}:${c.lesson_index}`))

  const activity = getActivity(track.activity)
  const { modules } = track.curriculum
  const total = modules.reduce((n, m) => n + m.lessons.length, 0)
  const pct = total ? Math.round((doneKeys.size / total) * 100) : 0

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-900">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
          <Link href="/dashboard" className="text-lg font-semibold tracking-tight">
            SkillPath
          </Link>
          <Link href="/onboarding" className="text-sm text-slate-400 hover:text-white">
            New track
          </Link>
        </div>
      </header>

      <div className="relative h-56 bg-slate-900 sm:h-64">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={trackCover(activity?.name ?? track.activity, track.goal, 1600)}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto flex max-w-4xl items-center gap-3 px-6 pb-6">
            <span className="text-4xl" aria-hidden>
              {activity?.icon}
            </span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{activity?.name}</h1>
              <p className="text-slate-300">{track.goal}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <p className="mb-8 max-w-2xl leading-relaxed text-slate-300">{track.curriculum.summary}</p>

        <div className="mb-12 rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-slate-400">Your progress</span>
            <span className="font-medium">
              {doneKeys.size} of {total} lessons
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="space-y-10">
          {modules.map((module, mi) => {
            const open = isModuleUnlocked(track.curriculum!, doneKeys.size, mi)
            return (
              <section key={mi} className={open ? '' : 'opacity-50'}>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <span className="text-sm font-medium text-slate-500">Level {mi + 1}</span>
                      <Badge
                        variant="outline"
                        className={LEVEL_STYLES[module.level] ?? LEVEL_STYLES.beginner}
                      >
                        {module.level}
                      </Badge>
                    </div>
                    <h2 className="text-xl font-semibold">{module.title}</h2>
                    <p className="mt-1 text-sm text-slate-400">{module.description}</p>
                  </div>
                  {!open && <Lock className="mt-1 h-4 w-4 shrink-0 text-slate-600" />}
                </div>

                <div className="space-y-2">
                  {module.lessons.map((lesson, li) => {
                    const complete = doneKeys.has(`${mi}:${li}`)
                    const body = (
                      <div
                        className={`flex items-center gap-4 rounded-xl border px-5 py-4 transition ${
                          open
                            ? 'border-slate-800 bg-slate-900/60 hover:border-emerald-500/50 hover:bg-slate-900'
                            : 'border-slate-900 bg-slate-900/30'
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium ${
                            complete
                              ? 'border-emerald-500 bg-emerald-500 text-slate-950'
                              : 'border-slate-700 text-slate-500'
                          }`}
                        >
                          {complete ? <Check className="h-4 w-4" /> : li + 1}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-medium">{lesson.title}</span>
                          <span className="mt-0.5 block text-sm text-slate-400">
                            {lesson.summary}
                          </span>
                        </span>
                        {open && <ChevronRight className="h-4 w-4 shrink-0 text-slate-600" />}
                      </div>
                    )

                    return open ? (
                      <Link key={li} href={`/track/${id}/lesson/${mi}/${li}`} className="block">
                        {body}
                      </Link>
                    ) : (
                      <div key={li}>{body}</div>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </main>
  )
}
