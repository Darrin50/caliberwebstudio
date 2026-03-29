import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Type-checking is handled separately via tsc; allow Vercel builds to succeed
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
};

export default nextConfig;
