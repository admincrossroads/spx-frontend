import type { NextConfig } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const apiHost = new URL(API_URL).hostname;
const apiPort = new URL(API_URL).port;
const apiProtocol = new URL(API_URL).protocol.replace(':', '');

const nextConfig: NextConfig = {
  // Force Node.js — critical for cookies(), server actions, auth, etc.
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", 
      allowedOrigins: ["localhost:3000", "localhost:3001"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: apiProtocol as 'http' | 'https',
        hostname: apiHost,
        port: apiPort || undefined,
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'awakilofiles.nyc3.digitaloceanspaces.com',
        pathname: '/**',
      },
    ],
    // Enable optimization for local images, keep unoptimized for remote API images
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Enable compression
  compress: true,
  // Reduce JavaScript bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Rewrite favicon.ico to serve the PNG favicon
  async rewrites() {
    return [
      {
        source: '/favicon.ico',
        destination: '/logos/favicon.png',
      },
    ];
  },
};

export default nextConfig;
