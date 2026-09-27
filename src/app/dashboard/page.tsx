import Link from 'next/link'
import { listTracks, getCompleted, getUser } from '@/lib/db'
import { getActivity } from '@/lib/activities'
import { trackCover } from '@/lib/images'
import { Button } from '@/components/ui/button'
import SignOutButton from '@/components/SignOutButton'
import { Plus, Trophy, Flame, BookOpen } from 'lucide-react'

export default async function DashboardPage() {
  const user = await getUser()
  const tracks = await listTracks()

  const withProgress = await Promise.all(
    tracks.map(async (track) => {
      const completed = await getCompleted(track.id)
      const total = track.curriculum?.modules.reduce((n, m) => n + m.lessons.length, 0) ?? 0
      const done = completed.length

      // The next lesson is the first incomplete one in curriculum order.
      const doneKeys = new Set(completed.map((c) => `${c.module_index}:${c.lesson_index}`))
      const next =
        track.curriculum?.modules
          .flatMap((mod, mi) => mod.lessons.map((les, li) => ({ m: mi, l: li, title: les.title })))
          .find(({ m, l }) => !doneKeys.has(`${m}:${l}`)) ?? null

      return { track, done, total, next }
    })
  )

  const totalDone = withProgress.reduce((n, t) => n + t.done, 0)
  const finished = withProgress.filter((t) => t.total > 0 && t.done === t.total).length

  const stats = [
    { icon: BookOpen, label: 'Active tracks', value: tracks.length },
    { icon: Flame, label: 'Lessons completed', value: totalDone },
    { icon: Trophy, label: 'Tracks finished', value: finished },
  ]

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/dashboard" className="text-lg font-semibold tracking-tight">
            SkillPath
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/onboarding">
              <Button size="sm" className="bg-emerald-500 text-slate-950 hover:bg-emerald-400">
                <Plus className="mr-1.5 h-4 w-4" /> New track
              </Button>
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Your training</h1>
        <p className="mt-1 text-slate-400">{user?.email}</p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <Icon className="mb-3 h-5 w-5 text-emerald-400" />
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-sm text-slate-400">{label}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-4 mt-12 text-sm font-semibold uppercase tracking-wider text-slate-500">
          Enrolled skills
        </h2>

        {withProgress.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-800 px-6 py-16 text-center">
            <p className="text-slate-400">You haven&apos;t started a track yet.</p>
            <Link href="/onboarding">
              <Button className="mt-5 bg-emerald-500 text-slate-950 hover:bg-emerald-400">
                Build your first track
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {withProgress.map(({ track, done, total, next }) => {
              const activity = getActivity(track.activity)
              const pct = total ? Math.round((done / total) * 100) : 0
              const complete = total > 0 && done === total

              return (
                <div
                  key={track.id}
                  className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60"
                >
                  <Link href={`/track/${track.id}`} className="block">
                    <div className="relative h-32 bg-slate-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={trackCover(activity?.name ?? track.activity, track.goal, 800)}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                      <span className="absolute bottom-3 left-4 flex items-center gap-2">
                        <span className="text-2xl" aria-hidden>
                          {activity?.icon}
                        </span>
                        <span>
                          <span className="block font-semibold leading-tight">
                            {activity?.name}
                          </span>
                          <span className="block text-xs text-slate-300">{track.goal}</span>
                        </span>
                      </span>
                    </div>
                  </Link>

                  <div className="p-5">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-slate-400">
                        {done} of {total} lessons
                      </span>
                      <span className="font-medium text-emerald-400">{pct}%</span>
                    </div>
                    <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    {complete ? (
                      <p className="flex items-center gap-2 text-sm text-emerald-400">
                        <Trophy className="h-4 w-4" /> Track complete
                      </p>
                    ) : next ? (
                      <Link
                        href={`/track/${track.id}/lesson/${next.m}/${next.l}`}
                        className="block rounded-lg border border-slate-800 px-4 py-3 transition hover:border-emerald-500/50 hover:bg-slate-900"
                      >
                        <span className="block text-xs uppercase tracking-wide text-slate-500">
                          Up next
                        </span>
                        <span className="mt-0.5 block truncate text-sm font-medium">
                          {next.title}
                        </span>
                      </Link>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
