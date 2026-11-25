import 'server-only'
import { cache } from 'react'
import { ApiError, publicApi } from './api'
import type { SharedBadge } from './types'

// A badge a learner shared from the app. Null when the link is unknown.
export const getSharedBadge = cache(async (shareId: string): Promise<SharedBadge | null> => {
  try {
    return await publicApi<SharedBadge>(`/badges/${encodeURIComponent(shareId)}`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null
    throw error
  }
})
