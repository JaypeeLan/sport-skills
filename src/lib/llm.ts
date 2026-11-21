import 'server-only'

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const DEFAULT_MODEL = 'openai/gpt-oss-20b'

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string }

type ChatResponse = {
  choices?: { message?: { content?: string | null } }[]
  error?: { message?: string }
}

// Sends a chat request to OpenRouter and returns the parsed JSON reply.
export async function completeJson(
  messages: ChatMessage[],
  maxTokens: number,
): Promise<Record<string, unknown>> {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) throw new Error('OPENROUTER_API_KEY is not set')

  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || DEFAULT_MODEL,
      response_format: { type: 'json_object' },
      messages,
      max_tokens: maxTokens,
    }),
  })

  const data = (await res.json()) as ChatResponse
  if (!res.ok) {
    throw new Error(`OpenRouter request failed (${res.status}): ${data.error?.message ?? 'unknown error'}`)
  }

  return JSON.parse(data.choices?.[0]?.message?.content ?? '{}')
}
