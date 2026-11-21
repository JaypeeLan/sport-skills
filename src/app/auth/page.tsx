import { Suspense } from 'react'
import AuthForm from './AuthForm'

// Read at request time, so the same build works for staging and production.
export const dynamic = 'force-dynamic'

export default function AuthPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-950" />}>
      <AuthForm googleClientId={process.env.GOOGLE_CLIENT_ID} />
    </Suspense>
  )
}
