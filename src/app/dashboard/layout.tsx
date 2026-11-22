import { requireVerifiedUser } from '@/lib/require-session'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireVerifiedUser('/dashboard')
  return children
}
