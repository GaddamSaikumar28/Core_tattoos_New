import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    //unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default config;
