import 'server-only'
import { completeJson } from './llm'
import { findVideo } from './video'
import type { LessonContent } from './types'

const LESSON_SYSTEM = `You are an expert coach writing a single practical lesson for a physical skill.

Return JSON with this exact shape:
{
  "objective": "2-3 sentences on what the learner will be able to do after this lesson",
  "equipment": ["item", "item"],
  "videoQuery": "a YouTube search query that would surface a good coaching demonstration of this exact skill",
  "visualPrompt": "a precise description of the body position and movement a demonstration should show",
  "steps": [ { "instruction": "short imperative step", "detail": "one sentence explaining how it should feel or look", "focus": "the single body part or cue to concentrate on, 1-3 words" } ],
  "mistakes": [ { "mistake": "what learners commonly do wrong", "fix": "how to correct it" } ],
  "practice": "a specific, measurable practice instruction with reps, time or distance"
}

Rules:
- 4 to 7 steps. Each step must be physically actionable, not conceptual.
- "focus" is a short anchor like "Head position", "Shoulders", "Lead hand" — not a sentence.
- 3 to 4 common mistakes with concrete fixes.
- Detail how the movement should FEEL, since the learner cannot see themselves.
- Flag any genuine safety risk inside the relevant step rather than as a separate warning.
- The practice instruction must be measurable so the learner knows when they are done.
- videoQuery should read like what a coach would title the clip, e.g. "freestyle breathing technique drill beginner".`

export async function generateLesson(input: {
  activity: string
  goal: string
  experience: string | null
  moduleTitle: string
  lessonTitle: string
  lessonSummary: string
}): Promise<LessonContent | null> {
  const parsed = await completeJson(
    [
      { role: 'system', content: LESSON_SYSTEM },
      {
        role: 'user',
        content: `Activity: ${input.activity}
Learner's goal: ${input.goal}
Experience level: ${input.experience ?? 'not specified'}
Module: ${input.moduleTitle}
Lesson: ${input.lessonTitle}
Lesson summary: ${input.lessonSummary}

Write this lesson.`,
      },
    ],
    2500,
  )

  const lesson = parsed as unknown as LessonContent
  if (!lesson.steps?.length) return null

  lesson.video = await findVideo(lesson.videoQuery)
  return lesson
}
