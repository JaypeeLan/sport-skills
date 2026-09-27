import type { Curriculum } from './types'

// Single source of truth for unlocking, shared by the track listing and the
// lesson route so they can't drift into disagreeing about what's accessible.
export function lessonsBefore(curriculum: Curriculum, moduleIndex: number) {
  return curriculum.modules.slice(0, moduleIndex).reduce((n, m) => n + m.lessons.length, 0)
}

export function isModuleUnlocked(
  curriculum: Curriculum,
  completedCount: number,
  moduleIndex: number
) {
  return completedCount >= lessonsBefore(curriculum, moduleIndex)
}
