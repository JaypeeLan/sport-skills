import { getActivity } from '@/lib/activities'
import { BADGE_LABEL, formatEarned } from '@/lib/badges'
import type { Badge } from '@/lib/types'
import BadgeMedal from './BadgeMedal'
import ShareBadgeButton from './ShareBadgeButton'

export default function BadgeList({ badges }: { badges: Badge[] }) {
  if (!badges.length) {
    return (
      <p className="rounded-xl border border-dashed border-slate-800 px-6 py-8 text-center text-sm text-slate-400">
        Finish your first lesson to earn a badge.
      </p>
    )
  }
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {badges.map((badge) => (
        <li key={badge.id} className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <BadgeMedal kind={badge.kind} emoji={badge.activity ? getActivity(badge.activity)?.icon : null} />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-400">{BADGE_LABEL[badge.kind]}</p>
            <p className="truncate font-semibold">{badge.title}</p>
            <p className="truncate text-xs text-slate-400">
              {badge.subtitle} · {formatEarned(badge.earnedAt)}
            </p>
          </div>
          <ShareBadgeButton badgeId={badge.id} title={badge.title} />
        </li>
      ))}
    </ul>
  )
}
