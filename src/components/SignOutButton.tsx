'use client'

import { signOutAction } from '@/app/actions'

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOutAction()}
      className="text-sm text-slate-400 transition hover:text-white"
    >
      Sign out
    </button>
  )
}
