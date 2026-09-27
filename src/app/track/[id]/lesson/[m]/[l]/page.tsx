import { cache } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTrack, getCompleted, getLesson, saveLesson } from '@/lib/db'
import { generateLesson } from '@/lib/generate'
import { isModuleUnlocked } from '@/lib/progression'
import { getActivity } from '@/lib/activities'
import { Button } from '@/components/ui/button'
import Demonstration from '@/components/Demonstration'
import CompleteButton from './CompleteButton'
import { ArrowLeft, Lock, Package, Repeat, TriangleAlert } from 'lucide-react'

// Shared between generateMetadata and the page so the track is fetched once.
const loadTrack = cache(getTrack)

// Lessons live behind an account, so they are never indexed.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; m: string; l: string }>
}): Promise<Metadata> {
  const { id, m, l } = await params
  const track = await loadTrack(id)
  const lesson = track?.curriculum?.modules[Number(m)]?.lessons[Number(l)]
  if (!lesson) return { title: 'Lesson' }

  return {
    title: lesson.title,
    description: lesson.summary,
    robots: { index: false, follow: false },
  }
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string; m: string; l: string }>
}) {
  const { id, m, l } = await params
  const mi = Number(m)
  const li = Number(l)

  const track = await loadTrack(id)
  if (!track?.curriculum) notFound()

  const currentModule = track.curriculum.modules[mi]
  const lesson = currentModule?.lessons[li]
  if (!lesson) notFound()

  const completed = await getCompleted(id)
  const doneKeys = new Set(completed.map((c) => `${c.module_index}:${c.lesson_index}`))

  if (!isModuleUnlocked(track.curriculum, doneKeys.size, mi)) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
        <Lock className="mb-4 h-7 w-7 text-slate-600" />
        <h1 className="text-2xl font-semibold">Not unlocked yet</h1>
        <p className="mt-2 max-w-sm text-slate-400">
          Finish the earlier lessons in this track first — they build the foundation this one
          relies on.
        </p>
        <Link href={`/track/${id}`} className="mt-6 text-emerald-400 hover:text-emerald-300">
          Back to track
        </Link>
      </main>
    )
  }

  // Generated once, then cached, so returning to a lesson shows the same
  // content the learner practised against.
  let content = await getLesson(id, mi, li)
  if (!content) {
    content = await generateLesson({
      activity: getActivity(track.activity)?.name ?? track.activity,
      goal: track.goal,
      experience: track.experience,
      moduleTitle: currentModule.title,
      lessonTitle: lesson.title,
      lessonSummary: lesson.summary,
    })
    if (content) await saveLesson(id, mi, li, lesson.title, content)
  }

  const complete = doneKeys.has(`${mi}:${li}`)
  const next = currentModule.lessons[li + 1]
    ? { m: mi, l: li + 1 }
    : track.curriculum.modules[mi + 1]
      ? { m: mi + 1, l: 0 }
      : null

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-900">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link
            href={`/track/${id}`}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> {currentModule.title}
          </Link>
          <span className="text-sm text-slate-500">
            Lesson {li + 1} of {currentModule.lessons.length}
          </span>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-bold leading-tight tracking-tight">{lesson.title}</h1>

        {!content ? (
          <p className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            This lesson could not be prepared. Reload to try again.
          </p>
        ) : (
          <>
            <section className="mt-6">
              <p className="text-lg leading-relaxed text-slate-300">{content.objective}</p>
            </section>

            <Demonstration
              query={content.videoQuery}
              description={content.visualPrompt}
              video={content.video ?? null}
            />

            {content.equipment?.length > 0 && (
              <section className="mt-10">
                <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                  <Package className="h-4 w-4" /> What you need
                </h2>
                <div className="flex flex-wrap gap-2">
                  {content.equipment.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-sm text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-10">
              <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500">
                Steps
              </h2>
              <ol className="space-y-1">
                {content.steps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-semibold text-slate-950">
                        {i + 1}
                      </span>
                      {i < content.steps.length - 1 && (
                        <span className="my-1 w-px flex-1 bg-slate-800" />
                      )}
                    </div>
                    <div className="pb-6 pt-0.5">
                      {step.focus && (
                        <span className="mb-2 inline-block rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-emerald-400">
                          {step.focus}
                        </span>
                      )}
                      <p className="font-medium">{step.instruction}</p>
                      <p className="mt-1 leading-relaxed text-slate-400">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {content.mistakes?.length > 0 && (
              <section className="mt-10">
                <h2 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                  <TriangleAlert className="h-4 w-4" /> Common mistakes
                </h2>
                <div className="space-y-3">
                  {content.mistakes.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4"
                    >
                      <p className="font-medium text-amber-200">{item.mistake}</p>
                      <p className="mt-1 leading-relaxed text-slate-400">{item.fix}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {content.practice && (
              <section className="mt-10">
                <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                  <Repeat className="h-4 w-4" /> Practice
                </h2>
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-5 py-4">
                  <p className="leading-relaxed text-slate-200">{content.practice}</p>
                </div>
              </section>
            )}

            <div className="mt-12 flex items-center gap-3 border-t border-slate-900 pt-8">
              <CompleteButton
                trackId={id}
                moduleIndex={mi}
                lessonIndex={li}
                complete={complete}
                next={next}
                curriculum={track.curriculum}
                doneCount={doneKeys.size}
              />
              <Link href={`/track/${id}`}>
                <Button variant="ghost" size="lg" className="text-slate-400 hover:text-white">
                  Back to track
                </Button>
              </Link>
            </div>
          </>
        )}
      </article>
    </main>
  )
}
