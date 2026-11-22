'use client'

import { useEffect, useState } from 'react'
import { Check, ChevronRight } from 'lucide-react'

const LESSONS = [
  'Control the ball with the inside of your foot',
  'Cushion a pass on the move',
  'Receive on your weaker foot',
  'Receive the ball across your body',
  'First touch away from pressure',
]

const STEP_MS = 1800
// Lessons already done when the loop starts, and the state shown to
// reduced-motion users.
const START_DONE = 1

// A looping preview of a track: lessons complete one by one and the progress
// bar follows. Decorative, so it is hidden from assistive technology.
export default function PhoneDemo() {
  const [done, setDone] = useState(START_DONE)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = setInterval(() => {
      // One extra tick holds the finished state before the loop restarts.
      setDone((d) => (d > LESSONS.length ? START_DONE : d + 1))
    }, STEP_MS)
    return () => clearInterval(timer)
  }, [])

  const completed = Math.min(done, LESSONS.length)

  return (
    <div
      aria-hidden
      className="relative mx-auto w-[300px] rounded-[2.75rem] border border-white/10 bg-slate-900 p-2.5 shadow-2xl shadow-emerald-500/10"
    >
      <div className="overflow-hidden rounded-[2.25rem] bg-slate-950 px-5 pb-6 pt-4">
        <div className="mb-5 flex items-center justify-between text-[11px] font-semibold text-slate-200">
          <span>9:41</span>
          <span className="h-5 w-20 rounded-full bg-slate-900" />
          <span className="flex gap-1">
            <span className="h-2 w-3 rounded-sm bg-slate-200" />
            <span className="h-2 w-4 rounded-sm bg-slate-200" />
          </span>
        </div>

        <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">Football</p>
        <p className="mt-1 text-lg font-bold leading-tight text-white">Improve your first touch</p>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-emerald-400 transition-[width] duration-700 ease-out"
            style={{ width: `${(completed / LESSONS.length) * 100}%` }}
          />
        </div>
        <p className="mt-1.5 text-[11px] text-slate-400">
          {completed} of {LESSONS.length} lessons done
        </p>

        <ul className="mt-4 space-y-2">
          {LESSONS.map((title, i) => {
            const isDone = i < done
            const isNext = i === done
            return (
              <li
                key={title}
                className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 transition-colors duration-500 ${
                  isNext ? 'border-emerald-400 bg-emerald-400/10' : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-all duration-500 ${
                    isDone
                      ? 'scale-100 bg-emerald-400 text-slate-950'
                      : isNext
                        ? 'bg-emerald-400 text-slate-950'
                        : 'bg-white/5 text-slate-400'
                  }`}
                >
                  {isDone ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                </span>
                <span
                  className={`flex-1 text-[12px] font-semibold leading-snug transition-colors duration-500 ${
                    isDone || isNext ? 'text-white' : 'text-slate-400'
                  }`}
                >
                  {title}
                </span>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-500" />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
