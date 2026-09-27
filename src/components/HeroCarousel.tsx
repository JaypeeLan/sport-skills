'use client'

import { useEffect, useState } from 'react'
import { HERO_IMAGES, unsplash } from '@/lib/images'

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_IMAGES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {HERO_IMAGES.map((image, i) => (
        <div
          key={image.id}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={unsplash(image.id)}
            alt=""
            loading={i === 0 ? 'eager' : 'lazy'}
            className="h-full w-full scale-105 object-cover"
          />
        </div>
      ))}

      {/* Keeps foreground text legible regardless of which frame is showing,
          while leaving enough of the photograph visible to read as imagery. */}
      <div className="absolute inset-0 bg-slate-950/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/60" />

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {HERO_IMAGES.map((image, i) => (
          <span
            key={image.id}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === index ? 'w-8 bg-emerald-400' : 'w-4 bg-white/25'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
