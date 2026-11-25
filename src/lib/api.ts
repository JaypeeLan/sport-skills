import 'server-only'

// The site has no sign-in. It calls the SportPath API only for public data (shared badges).

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message)
  }
}

function apiUrl(path: string) {
  const base = process.env.API_URL
  if (!base) throw new Error('API_URL is not set')
  return `${base.replace(/\/$/, '')}${path}`
}

async function errorMessage(res: Response) {
  const body = (await res.json().catch(() => null)) as { message?: string | string[] } | null
  const message = Array.isArray(body?.message) ? body.message[0] : body?.message
  return message ?? `Request failed (${res.status})`
}

export async function publicApi<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(apiUrl(path), {
    ...init,
    cache: 'no-store',
    headers: { ...init.headers, ...(init.body ? { 'Content-Type': 'application/json' } : {}) },
  })
  if (!res.ok) throw new ApiError(res.status, await errorMessage(res))
  return (res.status === 204 ? undefined : await res.json()) as T
}
