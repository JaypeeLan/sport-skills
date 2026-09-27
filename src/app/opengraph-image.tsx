import { ImageResponse } from 'next/og'
import { SITE } from '@/lib/site'

export const alt = `${SITE.name} — ${SITE.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#020617',
          padding: '80px',
          color: '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 10,
              height: 72,
            }}
          >
            <div style={{ width: 22, height: 28, borderRadius: 11, backgroundColor: '#34d399' }} />
            <div style={{ width: 22, height: 46, borderRadius: 11, backgroundColor: '#10b981' }} />
            <div style={{ width: 22, height: 68, borderRadius: 11, backgroundColor: '#059669' }} />
          </div>
          <div style={{ fontSize: 52, fontWeight: 700, letterSpacing: -1 }}>{SITE.name}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 950,
            }}
          >
            From complete beginner to advanced — in any sport
          </div>
          <div style={{ fontSize: 34, color: '#cbd5e1', maxWidth: 900 }}>
            Personalised, step-by-step tracks with real technique, real demonstrations and the
            mistakes to avoid.
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 28, color: '#34d399' }}>{SITE.url}</div>
      </div>
    ),
    size
  )
}
