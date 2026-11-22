import { BookOpen, Flame, Medal, Trophy } from 'lucide-react'
import type { BadgeKind } from '@/lib/types'

const ICON = { track: Trophy, module: Medal, lessons: BookOpen, streak: Flame } satisfies Record<BadgeKind, unknown>

// The round badge emblem. Track and module badges show the activity's emoji.
export default function BadgeMedal({
  kind,
  emoji,
  size = 'md',
}: {
  kind: BadgeKind
  emoji?: string | null
  size?: 'md' | 'lg'
}) {
  const Icon = ICON[kind]
  const box = size === 'lg' ? 'h-32 w-32' : 'h-14 w-14'
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-700 ring-4 ring-emerald-500/20 ${box}`}
    >
      {emoji ? (
        <span aria-hidden className={size === 'lg' ? 'text-6xl' : 'text-2xl'}>
          {emoji}
        </span>
      ) : (
        <Icon aria-hidden className={`text-slate-950 ${size === 'lg' ? 'h-14 w-14' : 'h-6 w-6'}`} />
      )}
    </span>
  )
}
