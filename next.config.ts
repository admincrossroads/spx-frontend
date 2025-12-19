import type { NextConfig } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const apiHost = new URL(API_URL).hostname;
const apiPort = new URL(API_URL).port;
const apiProtocol = new URL(API_URL).protocol.replace(':', '');

const nextConfig = {
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
    ],
    unoptimized: true, // Disable Next.js image optimization for external images
  },
};

export default nextConfig;
