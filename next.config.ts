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
    ]
  },
}

export default nextConfig
