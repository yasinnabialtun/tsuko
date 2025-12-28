
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Allow production builds even with type errors (for rapid deployment)
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
