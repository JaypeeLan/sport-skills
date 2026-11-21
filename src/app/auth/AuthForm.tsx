'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { googleSignInAction, signInAction, signUpAction } from '@/app/actions'
import GoogleButton from '@/components/GoogleButton'
import { safeNext } from '@/lib/safe-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'

export default function AuthForm({ googleClientId }: { googleClientId: string | undefined }) {
  const router = useRouter()
  const params = useSearchParams()
  const next = safeNext(params.get('next'))

  const [mode, setMode] = useState<'signup' | 'login'>(
    params.get('mode') === 'login' ? 'login' : 'signup'
  )
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result =
      mode === 'signup' ? await signUpAction(email, password) : await signInAction(email, password)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    router.push(next)
    router.refresh()
  }

  async function google(credential: string) {
    setLoading(true)
    setError('')
    const result = await googleSignInAction(credential)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
      return
    }
    router.push(next)
    router.refresh()
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
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            {mode === 'signup' ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="mb-8 text-slate-400">
            {mode === 'signup'
              ? 'So your tracks and progress follow you across devices.'
              : 'Pick up where you left off.'}
          </p>

          <GoogleButton clientId={googleClientId} text={mode === 'signup' ? 'signup_with' : 'signin_with'} onCredential={google} />

          {googleClientId && (
            <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wide text-slate-500">
              <span className="h-px flex-1 bg-slate-800" />
              or
              <span className="h-px flex-1 bg-slate-800" />
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
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
                className="border-slate-800 bg-slate-900 text-white"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <label htmlFor="password" className="text-sm text-slate-300">
                  Password
                </label>
                {mode === 'login' && (
                  <Link
                    href={`/auth/forgot${email ? `?email=${encodeURIComponent(email)}` : ''}`}
                    className="text-sm text-emerald-400 hover:text-emerald-300"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <Input
                id="password"
                type="password"
                required
                minLength={mode === 'signup' ? 8 : undefined}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === 'signup' ? 'At least 8 characters' : ''}
                className="border-slate-800 bg-slate-900 text-white"
              />
            </div>

            {error && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 text-slate-950 hover:bg-emerald-400"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === 'signup' ? 'Create account' : 'Sign in'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => {
                setMode(mode === 'signup' ? 'login' : 'signup')
                setError('')
              }}
              className="text-emerald-400 hover:text-emerald-300"
            >
              {mode === 'signup' ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </main>
  )
}
