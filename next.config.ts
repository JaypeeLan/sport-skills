import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // www.sportpath.app has one canonical address: the root domain.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.sportpath.app' }],
        destination: 'https://sportpath.app/:path*',
        permanent: true,
      },
      // The web app was removed: the site is a landing page and learning happens in the apps.
      // Old links to its pages go to the landing page.
      ...['/auth/:path*', '/dashboard/:path*', '/onboarding/:path*', '/track/:path*'].map((source) => ({
        source,
        destination: '/',
        permanent: true,
      })),
    ]
  },
}

export default nextConfig
