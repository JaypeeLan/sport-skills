import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
      <Loader2 className="mb-4 h-7 w-7 animate-spin text-emerald-400" />
      <p className="text-slate-400">Preparing this lesson…</p>
    </main>
  )
}
