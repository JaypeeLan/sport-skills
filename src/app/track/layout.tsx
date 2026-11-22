import { requireVerifiedUser } from '@/lib/require-session'

// Tracks are personal. After sign-in, the user lands on the dashboard, which lists them.
export default async function TrackLayout({ children }: { children: React.ReactNode }) {
  await requireVerifiedUser('/dashboard')
  return children
}
