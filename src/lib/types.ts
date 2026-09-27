export interface Track {
  id: string
  user_id: string
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

export interface Module {
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

export interface Lesson {
  id: string
  track_id: string
  module_index: number
  lesson_index: number
  title: string
  content: LessonContent | null
  created_at: string
}

export interface Progress {
  id: string
  user_id: string
  track_id: string
  module_index: number
  lesson_index: number
  completed_at: string
}
