'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { api, ApiError, publicApi, SESSION_COOKIE } from '@/lib/api'

type AuthResult = { error: string } | undefined
type SessionPath = '/auth/signup' | '/auth/login' | '/auth/google' | '/auth/password/reset'

// Calls an API route that returns a session, and stores the token in an httpOnly cookie.
async function startSession(path: SessionPath, body: Record<string, string>): Promise<AuthResult> {
  try {
    const { token, expiresAt } = await publicApi<{ token: string; expiresAt: string }>(path, {
      method: 'POST',
      body: JSON.stringify(body),
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
  return startSession('/auth/signup', { email, password })
}

export async function signInAction(email: string, password: string) {
  return startSession('/auth/login', { email, password })
}

// The credential is the ID token from Google Identity Services. The API verifies it.
export async function googleSignInAction(credential: string) {
  return startSession('/auth/google', { idToken: credential })
}

// Always reports success, like the API, so the page does not reveal which emails have an account.
export async function requestPasswordResetAction(email: string): Promise<AuthResult> {
  try {
    await publicApi('/auth/password/forgot', { method: 'POST', body: JSON.stringify({ email }) })
  } catch (error) {
    if (error instanceof ApiError && error.status === 429) {
      return { error: 'Too many requests. Wait a minute and try again.' }
    }
    if (error instanceof ApiError && error.status < 500) return { error: error.message }
    return { error: 'Something went wrong. Please try again.' }
  }
}

// Sets the new password and signs the user in on this device. Other devices are signed out.
export async function resetPasswordAction(email: string, code: string, password: string) {
  return startSession('/auth/password/reset', { email, code, password })
}

// Sends a verification code. The API skips it if one went out in the last minute.
export async function sendVerificationAction(): Promise<AuthResult> {
  try {
    await api('/auth/email/verify/send', { method: 'POST' })
  } catch (error) {
    if (error instanceof ApiError && error.status === 429) {
      return { error: 'Too many requests. Wait a minute and try again.' }
    }
    if (error instanceof ApiError && error.status < 500) return { error: error.message }
    // redirect() for an expired session works by throwing, so let it through.
    if (!(error instanceof ApiError)) throw error
    return { error: 'Something went wrong. Please try again.' }
  }
}

export async function verifyEmailAction(code: string): Promise<AuthResult> {
  try {
    await api('/auth/email/verify', { method: 'POST', body: JSON.stringify({ code }) })
  } catch (error) {
    if (error instanceof ApiError && error.status < 500) return { error: error.message }
    if (!(error instanceof ApiError)) throw error
    return { error: 'Something went wrong. Please try again.' }
  }
  revalidatePath('/', 'layout')
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

// Returns the id for the badge's public link at /b/<id>.
export async function shareBadgeAction(badgeId: string) {
  const { shareId } = await api<{ shareId: string }>(`/me/badges/${encodeURIComponent(badgeId)}/share`, {
    method: 'POST',
  })
  revalidatePath('/dashboard')
  return shareId
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
