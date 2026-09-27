import type { Metadata } from 'next'

// Track creation is personal and requires an account.
export const metadata: Metadata = {
  title: 'Create a track',
  robots: { index: false, follow: false },
}

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return children
}
