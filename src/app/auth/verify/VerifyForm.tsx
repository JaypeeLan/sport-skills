'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { sendVerificationAction, signOutAction, verifyEmailAction } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const FIELD = 'border-slate-800 bg-slate-900 text-white'

export default function VerifyForm({ email, next }: { email: string; next: string }) {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState<'verify' | 'send' | null>(null)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  // Sign-up already sent a code. The API does not send another within a minute,
  // so this only sends one for accounts that never got it.
  useEffect(() => {
    void sendVerificationAction()
  }, [])

  async function verify(e: React.FormEvent) {
    e.preventDefault()
    setBusy('verify')
    setError('')
    setInfo('')
    const result = await verifyEmailAction(code.trim())
    if (result?.error) {
      setError(result.error)
      setBusy(null)
      return
    }
    router.push(next)
    router.refresh()
  }

  async function resend() {
    setBusy('send')
    setError('')
    setInfo('')
    const result = await sendVerificationAction()
    setBusy(null)
    if (result?.error) return setError(result.error)
    setInfo('If a minute has passed since the last code, a new one is on its way.')
  }

  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-white">
      <header className="mx-auto w-full max-w-6xl px-6 py-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          SportPath
        </Link>
      </header>

      <div className="flex flex-1 items-center justify-center px-6 pb-24">
        <div className="w-full max-w-sm">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Check your email</h1>
          <p className="mb-8 text-slate-400">
            We sent a 6-digit code to {email}. Enter it to finish creating your account.
          </p>

          <form onSubmit={verify} className="space-y-4">
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
            {error && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>
            )}
            {info && (
              <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                {info}
              </p>
            )}
            <Button type="submit" disabled={busy !== null} className="w-full bg-emerald-500 text-slate-950 hover:bg-emerald-400">
              {busy === 'verify' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify email
            </Button>
            <button
              type="button"
              onClick={() => void resend()}
              disabled={busy !== null}
              className="w-full text-sm text-slate-400 hover:text-white disabled:opacity-60"
            >
              {busy === 'send' ? 'Sending…' : 'Send a new code'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Wrong email? Check your spam folder, or{' '}
            <button type="button" onClick={() => void signOutAction()} className="text-emerald-400 hover:text-emerald-300">
              sign out
            </button>{' '}
            and create the account again.
          </p>
        </div>
      </div>
    </main>
  )
}
