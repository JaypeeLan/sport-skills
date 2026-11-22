'use client'

import { useState, useTransition } from 'react'
import { Check, Loader2, Share2 } from 'lucide-react'
import { shareBadgeAction } from '@/app/actions'

// Opens the device share sheet where there is one, or copies the link.
export default function ShareBadgeButton({ badgeId, title }: { badgeId: string; title: string }) {
  const [pending, startTransition] = useTransition()
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(false)

  function onClick() {
    setError(false)
    startTransition(async () => {
      try {
        const shareId = await shareBadgeAction(badgeId)
        const url = `${window.location.origin}/b/${shareId}`
        if (navigator.share) {
          // Closing the share sheet rejects. That is not an error.
          await navigator.share({ title: `${title} on SportPath`, text: `I earned a badge on SportPath: ${title}`, url }).catch(() => {})
          return
        }
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        setError(true)
      }
    })
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-emerald-400 transition hover:bg-slate-800 disabled:opacity-60"
    >
      {pending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : copied ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Share2 className="h-3.5 w-3.5" />
      )}
      {error ? 'Try again' : copied ? 'Link copied' : 'Share'}
    </button>
  )
}
