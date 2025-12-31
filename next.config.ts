import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Reverting to SSR mode for client-side functionality
  // output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  // AWS Amplify specific optimizations
  poweredByHeader: false, // Remove X-Powered-By header for security
  compress: false, // Disable Next.js compression (CloudFront handles this)
  generateEtags: false, // Disable etags (CloudFront handles caching)

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },

  // Build optimizations for Amplify
  experimental: {
    optimizePackageImports: ['@aws-amplify/ui-react', 'lucide-react'], // Optimize Amplify and icon imports
  },

  // Image optimization (optimized for SSR)
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'baltzakisthemis.com',
        port: '',
        pathname: '/**',
      },
      // Allow images from your domain
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_DOMAIN || 'dfltlhnwu9p09.amplifyapp.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Environment variables that should be available at build time
  env: {
    NEXT_PUBLIC_AMPLIFY_ENV: process.env.AMPLIFY_ENV || 'dev',
    NEXT_PUBLIC_DOMAIN: process.env.AMPLIFY_APP_DOMAIN || 'dfltlhnwu9p09.amplifyapp.com',
  },

  // Turbopack config: disable for Amplify builds to avoid caching issues
  // turbopack: false, // Commented out to avoid TypeScript error
};
