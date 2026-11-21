// Only follow ?next= to a path inside this app, never to another site.
export function safeNext(next: string | null, fallback = '/dashboard') {
  if (!next || !next.startsWith('/') || next.startsWith('//') || next.startsWith('/\\')) return fallback
  return next
}
