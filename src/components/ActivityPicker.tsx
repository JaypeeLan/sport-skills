'use client'

import { useMemo, useState } from 'react'
import { ACTIVITIES, CATEGORY_LABELS, type Category } from '@/lib/activities'
import { Search } from 'lucide-react'

interface Props {
  onSelect: (id: string) => void
}

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[]

export default function ActivityPicker({ onSelect }: Props) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category | null>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ACTIVITIES.filter((a) => {
      if (category && a.category !== category) return false
      if (!q) return true
      // Match the goals too, so "marathon" or "handstand" finds its sport.
      return (
        a.name.toLowerCase().includes(q) ||
        a.goals.some((g) => g.toLowerCase().includes(q))
      )
    })
  }, [query, category])

  return (
    <>
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a sport or a goal…"
          aria-label="Search activities"
          className="w-full rounded-xl border border-slate-800 bg-slate-900/60 py-3 pl-11 pr-4 text-white placeholder:text-slate-500 focus:border-emerald-500/60 focus:outline-none"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setCategory(null)}
          className={`rounded-full border px-3 py-1.5 text-sm transition ${
            category === null
              ? 'border-emerald-500 bg-emerald-500 text-slate-950'
              : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
          }`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(category === c ? null : c)}
            className={`rounded-full border px-3 py-1.5 text-sm transition ${
              category === c
                ? 'border-emerald-500 bg-emerald-500 text-slate-950'
                : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
            }`}
          >
            {CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-800 px-6 py-12 text-center text-slate-400">
          No activity matches “{query}”. Try a broader term.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {results.map((a) => (
            <button
              key={a.id}
              onClick={() => onSelect(a.id)}
              className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-4 text-left transition hover:border-emerald-500/60 hover:bg-slate-900"
            >
              <span className="text-2xl" aria-hidden>
                {a.icon}
              </span>
              <span className="min-w-0">
                <span className="block font-medium">{a.name}</span>
                <span className="block text-xs text-slate-500">
                  {CATEGORY_LABELS[a.category]}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </>
  )
}
