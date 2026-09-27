import type { Metadata } from 'next'

// Sign-in / sign-up is not useful in search results.
export const metadata: Metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false },
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children
}
