import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SESSION_COOKIE } from './api'
import { getUser } from './db'

// A cheap first check with no network call: signed-out visitors go to sign-in and
// come back to `next` afterwards. The API makes the real session check, and an
// expired session is sent through /auth/expired, which clears the cookie.
// This runs in the protected layouts instead of proxy.ts, because the Cloudflare
// adapter's proxy.ts support is experimental and fails on requests with cookies.
export async function requireSessionCookie(next: string) {
  if (!(await cookies()).has(SESSION_COOKIE)) {
    redirect(`/auth?next=${encodeURIComponent(next)}`)
  }
}

// For pages that build or show tracks: email sign-ups must verify their address
// first. The API refuses tracks until then, so this sends them to the code page.
export async function requireVerifiedUser(next: string) {
  await requireSessionCookie(next)
  const user = await getUser()
  if (user && !user.emailVerified) redirect(`/auth/verify?next=${encodeURIComponent(next)}`)
}
