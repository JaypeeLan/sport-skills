'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toggleCompleteAction } from '@/app/actions'
import { isModuleUnlocked } from '@/lib/progression'
import { Button } from '@/components/ui/button'
import { Check, Loader2 } from 'lucide-react'
import type { Curriculum } from '@/lib/types'

interface Props {
  trackId: string
  moduleIndex: number
  lessonIndex: number
  complete: boolean
  next: { m: number; l: number } | null
  curriculum: Curriculum
  doneCount: number
}

export default function CompleteButton({
  trackId,
  moduleIndex,
  lessonIndex,
  complete,
  next,
  curriculum,
  doneCount,
}: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  function onClick() {
    startTransition(async () => {
      const nowComplete = await toggleCompleteAction(trackId, moduleIndex, lessonIndex)

      if (!nowComplete || !next) {
        router.refresh()
        return
      }

      // Completing out of order can leave the next module still locked, so
      // send the learner back to the track rather than into a locked lesson.
      router.push(
        isModuleUnlocked(curriculum, doneCount + 1, next.m)
          ? `/track/${trackId}/lesson/${next.m}/${next.l}`
          : `/track/${trackId}`
      )
    })
  }

  return (
    <Button
      onClick={onClick}
      disabled={pending}
      size="lg"
      className={
        complete
          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
      }
    >
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : complete ? (
        <Check className="mr-2 h-4 w-4" />
      ) : null}
      {complete ? 'Completed' : next ? 'Mark complete and continue' : 'Mark complete'}
    </Button>
  )
}
