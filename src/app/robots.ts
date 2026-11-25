import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

// Read at request time: staging must never be indexed.
export const dynamic = 'force-dynamic'

export default function robots(): MetadataRoute.Robots {
  if (process.env.APP_ENV === 'staging') {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api'],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  }
}
