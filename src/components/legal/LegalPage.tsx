import Link from 'next/link'
import type { ReactNode } from 'react'

// Shared layout for the privacy policy, the terms of use and the account deletion page.
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-300">
      <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:py-16">
        <Link href="/" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300">
          SportPath
        </Link>
        <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-slate-400">Last updated: {updated}</p>
        <div className="mt-10 space-y-10 leading-relaxed">{children}</div>
        <footer className="mt-16 flex flex-wrap gap-6 border-t border-white/5 pt-8 text-sm text-slate-400">
          <Link href="/privacy" className="hover:text-white">
            Privacy policy
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms of use
          </Link>
          <Link href="/delete-account" className="hover:text-white">
            Delete your account
          </Link>
          <span>&copy; {new Date().getFullYear()} Syntronware Limited</span>
        </footer>
      </div>
    </main>
  )
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {children}
    </section>
  )
}

export function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

export const SUPPORT_EMAIL = 'support@sportpath.app'

export function SupportLink() {
  return (
    <a href={`mailto:${SUPPORT_EMAIL}`} className="text-emerald-400 hover:text-emerald-300">
      {SUPPORT_EMAIL}
    </a>
  )
}
