import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Type-checking is handled separately via tsc; allow Vercel builds to succeed
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
