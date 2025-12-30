import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  // AWS Amplify specific optimizations
  poweredByHeader: false, // Remove X-Powered-By header for security
  compress: false, // Disable Next.js compression (CloudFront handles this)
  generateEtags: false, // Disable etags (CloudFront handles caching)

  // Build optimizations for Amplify
  experimental: {
    // reactCompiler: false, // Explicitly disable React Compiler
    optimizePackageImports: ['@aws-amplify/ui-react', 'lucide-react'], // Optimize Amplify and icon imports
  },

  // Image optimization (unoptimized for static export)
  images: {
    unoptimized: true,
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
        hostname: process.env.NEXT_PUBLIC_DOMAIN || 'master.dcwmv1pw85f0j.amplifyapp.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Environment variables that should be available at build time
  env: {
    NEXT_PUBLIC_AMPLIFY_ENV: process.env.AMPLIFY_ENV || 'dev',
    NEXT_PUBLIC_DOMAIN: process.env.AMPLIFY_APP_DOMAIN || 'master.dcwmv1pw85f0j.amplifyapp.com',
  },

  // Security headers and CSP
  async headers() {
    return [
      {
        // Apply to all routes
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
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      },
      {
        // API routes get stricter CSP
        source: '/api/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self'",
              "style-src 'self' 'unsafe-inline'", // Allow inline styles for Next.js
              "img-src 'self' data: https:", // Allow data URLs and HTTPS images
              "font-src 'self'",
              "connect-src 'self' https://*.appsync-api.eu-central-1.amazonaws.com", // Allow Amplify API
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join('; ')
          }
        ]
      }
    ];
  },

  // Webpack optimizations for Amplify
  webpack: (config, { isServer }) => {
    // Optimize bundle splitting for Amplify
    if (!isServer) {
      config.optimization.splitChunks.chunks = 'all';
    }

    return config;
  },
  // Turbopack config: keep empty object to silence Turbopack/webpack conflict
  // If you later migrate to Turbopack, populate this section with needed options.
  turbopack: {},
};

export default nextConfig;
