import 'server-only'
import { createClient } from './supabase/server'
import type { Curriculum, LessonContent, Track } from './types'

export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function listTracks(): Promise<Track[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('tracks')
    .select('*')
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function getTrack(id: string): Promise<Track | null> {
  const supabase = await createClient()
  const { data } = await supabase.from('tracks').select('*').eq('id', id).single()
  return data
}

export async function createTrack(input: {
  activity: string
  goal: string
  experience: string
  curriculum: Curriculum
}) {
  const supabase = await createClient()
  const user = await getUser()
  if (!user) throw new Error('Not signed in')

  const { data, error } = await supabase
    .from('tracks')
    .insert({ ...input, user_id: user.id })
    .select('id')
    .single()

  if (error) throw error
  return data.id as string
}

export async function getCompleted(trackId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('progress')
    .select('module_index, lesson_index')
    .eq('track_id', trackId)
  return data ?? []
}

export async function getLesson(trackId: string, m: number, l: number) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('lessons')
    .select('content')
    .eq('track_id', trackId)
    .eq('module_index', m)
    .eq('lesson_index', l)
    .maybeSingle()
  return (data?.content as LessonContent | undefined) ?? null
}

export async function saveLesson(
  trackId: string,
  m: number,
  l: number,
  title: string,
  content: LessonContent
) {
  const supabase = await createClient()
  await supabase
    .from('lessons')
    .upsert(
      { track_id: trackId, module_index: m, lesson_index: l, title, content },
      { onConflict: 'track_id,module_index,lesson_index' }
    )
}
