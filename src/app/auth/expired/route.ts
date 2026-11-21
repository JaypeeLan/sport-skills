import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE } from '@/lib/api'

// The API rejected the session (expired or signed out elsewhere).
// Clear the stale cookie, then send the user to sign in again.
export function GET(request: NextRequest) {
  const url = request.nextUrl.clone()
  url.pathname = '/auth'
  url.search = '?mode=login'
  const response = NextResponse.redirect(url)
  response.cookies.delete(SESSION_COOKIE)
  return response
}
