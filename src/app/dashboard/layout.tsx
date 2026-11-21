import { requireSessionCookie } from '@/lib/require-session'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireSessionCookie('/dashboard')
  return children
}
