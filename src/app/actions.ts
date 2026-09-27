'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createTrack, getUser } from '@/lib/db'
import type { Curriculum } from '@/lib/types'

export async function saveTrackAction(input: {
  activity: string
  goal: string
  experience: string
  curriculum: Curriculum
}) {
  const id = await createTrack(input)
  revalidatePath('/')
  return id
}

export async function toggleCompleteAction(trackId: string, m: number, l: number) {
  const supabase = await createClient()
  const user = await getUser()
  if (!user) throw new Error('Not signed in')

  const { data: existing } = await supabase
    .from('progress')
    .select('id')
    .eq('track_id', trackId)
    .eq('module_index', m)
    .eq('lesson_index', l)
    .maybeSingle()

  if (existing) {
    await supabase.from('progress').delete().eq('id', existing.id)
  } else {
    await supabase.from('progress').insert({
      user_id: user.id,
      track_id: trackId,
      module_index: m,
      lesson_index: l,
    })
  }

  revalidatePath(`/track/${trackId}`)
  revalidatePath('/')
  return !existing
}

export async function signOutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
