import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { api, ApiError, publicApi, SESSION_COOKIE } from './api'
import type { Badge, Curriculum, LessonContent, SharedBadge, Track } from './types'

// Data now comes from the SportPath API. These functions keep the shapes the
// pages already use (snake_case fields), so the pages barely changed.

interface ApiTrack {
  id: string
  activity: string
  goal: string
  experience: string | null
  level: string
  curriculum: Curriculum | null
  createdAt: string
  completed: { moduleIndex: number; lessonIndex: number }[]
}

export interface CompletedLesson {
  module_index: number
  lesson_index: number
}

export type TrackWithProgress = Track & { completed: CompletedLesson[] }

function toTrack(t: ApiTrack): TrackWithProgress {
  return {
    id: t.id,
    activity: t.activity,
    goal: t.goal,
    experience: t.experience,
    level: t.level,
    curriculum: t.curriculum,
    created_at: t.createdAt,
    completed: t.completed.map((c) => ({ module_index: c.moduleIndex, lesson_index: c.lessonIndex })),
  }
}

// Returns null when signed out or when the session expired.
export const getUser = cache(async (): Promise<{ id: string; email: string; emailVerified: boolean } | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  if (!token) return null
  try {
    return await publicApi('/auth/me', {}, token)
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return null
    throw error
  }
})

export async function listTracks(): Promise<TrackWithProgress[]> {
  return (await api<ApiTrack[]>('/tracks')).map(toTrack)
}

// Cached per request, so getTrack and getCompleted share one API call.
const fetchTrack = cache(async (id: string): Promise<TrackWithProgress | null> => {
  try {
    return toTrack(await api<ApiTrack>(`/tracks/${encodeURIComponent(id)}`))
  } catch (error) {
    if (error instanceof ApiError && (error.status === 404 || error.status === 400)) return null
    throw error
  }
})

export async function getTrack(id: string): Promise<Track | null> {
  return fetchTrack(id)
}

export async function getCompleted(trackId: string): Promise<CompletedLesson[]> {
  return (await fetchTrack(trackId))?.completed ?? []
}

// The API returns the cached lesson, or writes and caches it on first open.
// Returns null when generation fails, so the page can show its retry message.
export async function getLessonContent(trackId: string, m: number, l: number): Promise<LessonContent | null> {
  try {
    return await api<LessonContent>(`/tracks/${encodeURIComponent(trackId)}/lessons/${m}/${l}`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound()
    if (error instanceof ApiError && error.status >= 500) return null
    throw error
  }
}

// Reading the list also awards badges that earlier progress earned.
export async function listBadges(): Promise<Badge[]> {
  return api<Badge[]>('/me/badges')
}

// Public: no session needed. Null when the link does not exist.
export const getSharedBadge = cache(async (shareId: string): Promise<SharedBadge | null> => {
  try {
    return await publicApi<SharedBadge>(`/badges/${encodeURIComponent(shareId)}`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null
    throw error
  }
})
