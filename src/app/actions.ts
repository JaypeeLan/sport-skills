'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { api, ApiError, publicApi, SESSION_COOKIE } from '@/lib/api'

type AuthResult = { error: string } | undefined

async function startSession(path: '/auth/signup' | '/auth/login', email: string, password: string): Promise<AuthResult> {
  try {
    const { token, expiresAt } = await publicApi<{ token: string; expiresAt: string }>(path, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    ;(await cookies()).set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(expiresAt),
    })
  } catch (error) {
    if (error instanceof ApiError && error.status < 500) return { error: error.message }
    return { error: 'Something went wrong. Please try again.' }
  }
  revalidatePath('/', 'layout')
}

export async function signUpAction(email: string, password: string) {
  return startSession('/auth/signup', email, password)
}

export async function signInAction(email: string, password: string) {
  return startSession('/auth/login', email, password)
}

// Generates the curriculum and saves the track in one API call.
// Returns the error message, because Next.js hides thrown errors from the client in production.
export async function createTrackAction(input: {
  activity: string
  goal: string
  experience: string
}): Promise<{ id: string } | { error: string }> {
  try {
    const { id } = await api<{ id: string }>('/tracks', { method: 'POST', body: JSON.stringify(input) })
    revalidatePath('/dashboard')
    return { id }
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error:
          error.status === 429
            ? 'Too many tracks at once. Wait a minute and try again.'
            : 'Could not build your track',
      }
    }
    // redirect() for an expired session works by throwing, so let it through.
    throw error
  }
}

export async function toggleCompleteAction(trackId: string, m: number, l: number) {
  const { completed } = await api<{ completed: boolean }>(
    `/tracks/${encodeURIComponent(trackId)}/lessons/${m}/${l}/complete`,
    { method: 'POST' },
  )
  revalidatePath(`/track/${trackId}`)
  revalidatePath('/dashboard')
  return completed
}

export async function signOutAction() {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (token) {
    // Sign out locally even if the API cannot be reached.
    await publicApi('/auth/logout', { method: 'POST' }, token).catch(() => {})
    store.delete(SESSION_COOKIE)
  }
  revalidatePath('/', 'layout')
  redirect('/')
}
