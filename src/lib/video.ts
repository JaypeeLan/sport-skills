import 'server-only'
import type { VideoResult } from './types'

// Resolves a lesson's search query to a specific embeddable video so the
// learner gets a real coaching demonstration instead of a results page.
export async function findVideo(query: string): Promise<VideoResult | null> {
  const key = process.env.YOUTUBE_API_KEY
  if (!key || !query) return null

  const url = new URL('https://www.googleapis.com/youtube/v3/search')
  url.searchParams.set('part', 'snippet')
  url.searchParams.set('type', 'video')
  url.searchParams.set('maxResults', '1')
  url.searchParams.set('videoEmbeddable', 'true')
  url.searchParams.set('safeSearch', 'strict')
  url.searchParams.set('q', query)
  url.searchParams.set('key', key)

  try {
    const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 * 7 } })
    if (!res.ok) return null

    const data = await res.json()
    const item = data.items?.[0]
    if (!item?.id?.videoId) return null

    return {
      videoId: item.id.videoId,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
    }
  } catch {
    // Quota exhausted or network failure — the UI falls back to a search link.
    return null
  }
}
