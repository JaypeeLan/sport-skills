'use client'

import { useState } from 'react'
import { Eye, Play, ExternalLink } from 'lucide-react'
import type { VideoResult } from '@/lib/types'

interface Props {
  query: string
  description: string
  video: VideoResult | null
}

export default function Demonstration({ query, description, video }: Props) {
  const [playing, setPlaying] = useState(false)
  const [showDescription, setShowDescription] = useState(false)

  if (!query && !description) return null

  const searchHref = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
      {video ? (
        <div className="relative aspect-video bg-slate-950">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 h-full w-full"
              aria-label={`Play: ${video.title}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
                alt=""
                className="h-full w-full object-cover"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 shadow-lg transition group-hover:scale-110 group-hover:bg-emerald-400">
                  <Play className="ml-1 h-7 w-7 fill-slate-950 text-slate-950" />
                </span>
              </span>
              <span className="absolute inset-x-0 bottom-0 p-4 text-left">
                <span className="block truncate text-sm font-medium text-white">
                  {video.title}
                </span>
                <span className="mt-0.5 block text-xs text-slate-400">{video.channel}</span>
              </span>
            </button>
          )}
        </div>
      ) : (
        query && (
          <a
            href={searchHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 px-5 py-5 transition hover:bg-slate-900"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500 transition group-hover:bg-emerald-400">
              <ExternalLink className="h-5 w-5 text-slate-950" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-medium">Find a demonstration</span>
              <span className="mt-0.5 block truncate text-sm text-slate-400">{query}</span>
            </span>
          </a>
        )
      )}

      {description && (
        <div className="border-t border-slate-800">
          <button
            onClick={() => setShowDescription((v) => !v)}
            className="flex w-full items-center gap-2 px-5 py-3 text-left text-sm text-slate-400 transition hover:text-white"
            aria-expanded={showDescription}
          >
            <Eye className="h-4 w-4 shrink-0" />
            {showDescription ? 'Hide' : 'What it should look like'}
          </button>
          {showDescription && (
            <p className="px-5 pb-5 leading-relaxed text-slate-300">{description}</p>
          )}
        </div>
      )}
    </section>
  )
}
