import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const SESSION_COOKIE = 'sp_session'

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

// Calls the API with the signed-in user's session token.
// A 401 sends the user to sign in again, through a route that also clears the stale cookie.
export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  if (!token) redirect('/auth/expired')

  const res = await fetch(apiUrl(path), {
    ...init,
    cache: 'no-store',
    headers: {
      ...init.headers,
      Authorization: `Bearer ${token}`,
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
    },
  })

  if (res.status === 401) redirect('/auth/expired')
  if (!res.ok) throw new ApiError(res.status, await errorMessage(res))
  return (res.status === 204 ? undefined : await res.json()) as T
}

// For calls made before there is a session (sign-in, sign-up) or where a
// missing session is a normal answer (the public home page).
export async function publicApi<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  const res = await fetch(apiUrl(path), {
    ...init,
    cache: 'no-store',
    headers: {
      ...init.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
    },
  })
  if (!res.ok) throw new ApiError(res.status, await errorMessage(res))
  return (res.status === 204 ? undefined : await res.json()) as T
}
