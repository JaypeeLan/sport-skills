import { NextResponse, type NextRequest } from 'next/server'

const SESSION_COOKIE = 'sp_session'
const PROTECTED = ['/onboarding', '/track', '/dashboard']

// A cheap first check with no network call: signed-out visitors go to sign-in.
// The API makes the real session check, and an expired session is sent
// through /auth/expired, which clears the cookie.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!request.cookies.has(SESSION_COOKIE) && PROTECTED.some((p) => pathname.startsWith(p))) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/onboarding/:path*', '/track/:path*', '/dashboard/:path*'],
}
