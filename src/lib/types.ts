export interface Track {
  id: string
  activity: string
  goal: string
  experience: string | null
  level: string
  curriculum: Curriculum | null
  created_at: string
}

export interface Curriculum {
  summary: string
  modules: Module[]
}

interface Module {
  title: string
  level: 'beginner' | 'intermediate' | 'advanced'
  description: string
  lessons: { title: string; summary: string }[]
}

export interface VideoResult {
  videoId: string
  title: string
  channel: string
}

export interface LessonContent {
  objective: string
  equipment: string[]
  // Drives a search for real coaching footage. Demonstrations come from actual
  // coaches rather than generated imagery, which can model wrong technique.
  videoQuery: string
  // Resolved once at generation time and cached with the lesson.
  video?: VideoResult | null
  visualPrompt: string
  steps: { instruction: string; detail: string; focus: string }[]
  mistakes: { mistake: string; fix: string }[]
  practice: string
}

export type BadgeKind = 'track' | 'module' | 'lessons' | 'streak'

export interface Badge {
  id: string
  kind: BadgeKind
  title: string
  subtitle: string
  // Activity id, for track and module badges.
  activity: string | null
  earnedAt: string
  shareId: string | null
}

// A badge as anyone with its link sees it.
export interface SharedBadge {
  kind: BadgeKind
  title: string
  subtitle: string
  earnedAt: string
  // The learner's display name, if they set one.
  name: string | null
  activity: { id: string; name: string | null; icon: string | null } | null
}
