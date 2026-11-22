'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** Delay in milliseconds, for staggering siblings. */
  delay?: number
  className?: string
}

// Fades and lifts its children into place the first time they scroll into view.
// The content renders visible, so it still shows without JavaScript. On mount,
// anything below the fold is hidden and then revealed when it scrolls in.
// The CSS lives in globals.css (.lp-reveal).
export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Already on screen at load: leave it as it is, so nothing flashes.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return

    el.dataset.state = 'hidden'
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.state = 'shown'
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`lp-reveal ${className}`} style={{ '--d': `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  )
}
