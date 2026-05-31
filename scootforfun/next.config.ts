import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  // Silence the workspace-root warning when running inside a monorepo
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        // Prevent edge/browser caching of HTML document responses.
        // Excludes hashed static assets which retain immutable caching.
        source: '/((?!_next/static|_next/image).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ]
  },
}

export default nextConfig
