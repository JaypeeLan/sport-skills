import { ImageResponse } from 'next/og'
import { BADGE_LABEL, formatEarned } from '@/lib/badges'
import { getSharedBadge } from '@/lib/db'
import { SITE } from '@/lib/site'

export const alt = 'A badge earned on SportPath'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// The picture shown in link previews, and shared as an image by the mobile app.
export default async function BadgeImage({ params }: { params: Promise<{ shareId: string }> }) {
  const badge = await getSharedBadge((await params).shareId)
  const label = badge ? BADGE_LABEL[badge.kind] : 'Badge'
  const title = badge?.title ?? SITE.name
  const subtitle = badge ? badge.subtitle : SITE.tagline
  const earned = badge
    ? `${badge.name ? `Earned by ${badge.name}` : 'Earned'} on ${formatEarned(badge.earnedAt)}`
    : ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 72,
          backgroundColor: '#020617',
          padding: '72px 88px',
          color: '#fff',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 300,
            height: 300,
            flexShrink: 0,
            borderRadius: 150,
            backgroundImage: 'linear-gradient(135deg, #34d399, #047857)',
            border: '14px solid rgba(16, 185, 129, 0.25)',
          }}
        >
          <svg width="150" height="150" viewBox="0 0 24 24">
            <path
              fill="#020617"
              d="M12 2l2.9 6.26 6.85.74-5.1 4.65 1.42 6.75L12 16.98 5.93 20.4l1.42-6.75L2.25 9l6.85-.74z"
            />
          </svg>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, flex: 1 }}>
          <div style={{ fontSize: 30, fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: 3 }}>
            {label}
          </div>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1.5 }}>{title}</div>
          <div style={{ fontSize: 34, color: '#cbd5e1' }}>{subtitle}</div>
          <div style={{ fontSize: 28, color: '#94a3b8', marginTop: 12 }}>{earned}</div>
          <div style={{ display: 'flex', fontSize: 28, color: '#34d399', marginTop: 24 }}>{SITE.name} · sportpath.app</div>
        </div>
      </div>
    ),
    size
  )
}
