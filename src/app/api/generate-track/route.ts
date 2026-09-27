import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: Request) {
  const { activity, goal, experience } = await req.json()

  const chat = await groq.chat.completions.create({
    model: 'openai/gpt-oss-20b',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `You are an expert coach who designs progressive learning curricula for physical skills.

Return JSON with this exact shape:
{
  "summary": "one sentence describing what this track will take the learner through",
  "modules": [
    {
      "title": "Module name",
      "level": "beginner" | "intermediate" | "advanced",
      "description": "one sentence on what this module builds",
      "lessons": [ { "title": "Lesson name", "summary": "one short sentence" } ]
    }
  ]
}

Rules:
- Produce 4 to 6 modules that progress in difficulty.
- Each module has 3 to 5 lessons.
- Start at the learner's stated experience level; do not waste their time on skills they already have.
- Lesson titles must name a concrete, practisable skill, not a vague topic.
- Order matters: each lesson should build on the one before it.
- Safety-critical foundations come before performance work.`,
      },
      {
        role: 'user',
        content: `Activity: ${activity}
Goal: ${goal}
Current experience: ${experience ?? 'not specified'}

Design the learning track.`,
      },
    ],
    max_tokens: 2500,
  })

  const raw = chat.choices[0].message.content ?? '{}'
  return NextResponse.json(JSON.parse(raw))
}
