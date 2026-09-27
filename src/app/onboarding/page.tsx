'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ACTIVITIES, EXPERIENCE_LEVELS, getActivity } from '@/lib/activities'
import { saveTrackAction } from '@/app/actions'
import ActivityPicker from '@/components/ActivityPicker'
import { ArrowLeft, Loader2 } from 'lucide-react'

function Onboarding() {
  const router = useRouter()
  const params = useSearchParams()

  const [activityId, setActivityId] = useState(params.get('activity') ?? '')
  const [goal, setGoal] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const activity = getActivity(activityId)
  const step = !activityId ? 1 : !goal ? 2 : 3

  async function build(exp: string) {
    if (!activity) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/generate-track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activity: activity.name, goal, experience: exp }),
      })
      if (!res.ok) throw new Error('Could not build your track')

      const curriculum = await res.json()
      if (!curriculum.modules?.length) throw new Error('Could not build your track')

      const id = await saveTrackAction({
        activity: activity.id,
        goal,
        experience: exp,
        curriculum,
      })
      router.push(`/track/${id}`)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
        <Loader2 className="mb-6 h-8 w-8 animate-spin text-emerald-400" />
        <h2 className="text-2xl font-semibold">Building your track</h2>
        <p className="mt-2 max-w-sm text-slate-400">
          Designing a progression for {activity?.name.toLowerCase()} based on your goal.
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          SkillPath
        </Link>
        <span className="text-sm text-slate-500">Step {step} of 3</span>
      </header>

      <div className="mx-auto max-w-3xl px-6 pb-24">
        {error && (
          <p className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        {step === 1 && (
          <>
            <h1 className="mb-2 text-3xl font-bold tracking-tight">What do you want to learn?</h1>
            <p className="mb-6 text-slate-400">
              {ACTIVITIES.length} activities — search or filter to find yours.
            </p>
            <ActivityPicker onSelect={setActivityId} />
          </>
        )}

        {step === 2 && activity && (
          <>
            <button
              onClick={() => setActivityId('')}
              className="mb-6 flex items-center gap-2 text-sm text-slate-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <h1 className="mb-2 text-3xl font-bold tracking-tight">
              What are you trying to achieve?
            </h1>
            <p className="mb-8 text-slate-400">
              Your goal decides where the track starts and what it focuses on.
            </p>
            <div className="space-y-3">
              {activity.goals.map((g) => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-4 text-left font-medium transition hover:border-emerald-500/60 hover:bg-slate-900"
                >
                  {g}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && activity && (
          <>
            <button
              onClick={() => setGoal('')}
              className="mb-6 flex items-center gap-2 text-sm text-slate-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <h1 className="mb-2 text-3xl font-bold tracking-tight">Where are you starting from?</h1>
            <p className="mb-8 text-slate-400">
              So we don&apos;t waste your time on skills you already have.
            </p>
            <div className="space-y-3">
              {EXPERIENCE_LEVELS.map((e) => (
                <button
                  key={e.id}
                  onClick={() => build(e.label)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-4 text-left transition hover:border-emerald-500/60 hover:bg-slate-900"
                >
                  <span className="block font-medium">{e.label}</span>
                  <span className="mt-0.5 block text-sm text-slate-400">{e.detail}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-950" />}>
      <Onboarding />
    </Suspense>
  )
}
