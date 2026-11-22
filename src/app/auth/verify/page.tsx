import { redirect } from 'next/navigation'
import { getUser } from '@/lib/db'
import { requireSessionCookie } from '@/lib/require-session'
import { safeNext } from '@/lib/safe-next'
import VerifyForm from './VerifyForm'

type Props = { searchParams: Promise<{ next?: string }> }

// Email sign-ups enter the code from their verification email here.
export default async function VerifyPage({ searchParams }: Props) {
  const next = safeNext((await searchParams).next ?? null)
  await requireSessionCookie(`/auth/verify?next=${encodeURIComponent(next)}`)
  const user = await getUser()
  if (!user) redirect('/auth/expired')
  if (user.emailVerified) redirect(next)
  return <VerifyForm email={user.email} next={next} />
}
