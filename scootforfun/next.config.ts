import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  // Silence the workspace-root warning when running inside a monorepo
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [],
  },
}

export default nextConfig
