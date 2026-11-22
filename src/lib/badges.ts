import type { BadgeKind } from './types'

export const BADGE_LABEL: Record<BadgeKind, string> = {
  track: 'Track complete',
  module: 'Module complete',
  lessons: 'Lesson milestone',
  streak: 'Practice streak',
}

export function formatEarned(earnedAt: string) {
  return new Date(earnedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}
