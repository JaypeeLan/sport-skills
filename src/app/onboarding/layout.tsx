import type { Metadata } from 'next'
import { requireVerifiedUser } from '@/lib/require-session'

// Track creation is personal and requires an account.
export const metadata: Metadata = {
  title: 'Create a track',
  robots: { index: false, follow: false },
}

export default async function OnboardingLayout({ children }: { children: React.ReactNode }) {
  await requireVerifiedUser('/onboarding')
  return children
}
