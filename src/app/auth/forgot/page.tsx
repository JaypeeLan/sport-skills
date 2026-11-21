'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { requestPasswordResetAction, resetPasswordAction } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'

const FIELD = 'border-slate-800 bg-slate-900 text-white'

// Two steps: request a 6-digit code by email, then enter it with a new password.
function ForgotForm() {
  const router = useRouter()
  const params = useSearchParams()

  const [step, setStep] = useState<'email' | 'code'>('email')
  const [email, setEmail] = useState(params.get('email') ?? '')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function requestCode(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await requestPasswordResetAction(email)
    setLoading(false)
    if (result?.error) return setError(result.error)
    setStep('code')
  }

  async function reset(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await resetPasswordAction(email, code.trim(), password)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
      return
    }
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-white">
      <header className="mx-auto w-full max-w-6xl px-6 py-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          SkillPath
        </Link>
      </header>

      <div className="flex flex-1 items-center justify-center px-6 pb-24">
        <div className="w-full max-w-sm">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Reset your password</h1>
          <p className="mb-8 text-slate-400">
            {step === 'email'
              ? 'Enter your email. If it has an account, we send you a 6-digit code.'
              : `If ${email} has an account, a code is on its way. It works for 15 minutes.`}
          </p>

          {step === 'email' ? (
            <form onSubmit={requestCode} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-slate-300">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={FIELD}
                />
              </div>
              {error && <ErrorBox message={error} />}
              <Button type="submit" disabled={loading} className="w-full bg-emerald-500 text-slate-950 hover:bg-emerald-400">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send code
              </Button>
            </form>
          ) : (
            <form onSubmit={reset} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="code" className="text-sm text-slate-300">
                  Code
                </label>
                <Input
                  id="code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="\d{6}"
                  maxLength={6}
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className={FIELD}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm text-slate-300">
                  New password
                </label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className={FIELD}
                />
              </div>
              {error && <ErrorBox message={error} />}
              <Button type="submit" disabled={loading} className="w-full bg-emerald-500 text-slate-950 hover:bg-emerald-400">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Set new password
              </Button>
              <button
                type="button"
                onClick={() => {
                  setStep('email')
                  setError('')
                }}
                className="w-full text-sm text-slate-400 hover:text-white"
              >
                Send a new code
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-slate-400">
            Remembered it?{' '}
            <Link href="/auth?mode=login" className="text-emerald-400 hover:text-emerald-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

function ErrorBox({ message }: { message: string }) {
  return (
    <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{message}</p>
  )
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-950" />}>
      <ForgotForm />
    </Suspense>
  )
}
