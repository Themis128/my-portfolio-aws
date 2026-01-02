import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from "next";
import withPWA from 'next-pwa';

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
        hostname: process.env.NEXT_PUBLIC_DOMAIN || 'dcwmv1pw85f0j.amplifyapp.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Environment variables that should be available at build time
  env: {
    NEXT_PUBLIC_AMPLIFY_ENV: process.env.AMPLIFY_ENV || 'dev',
    NEXT_PUBLIC_DOMAIN: process.env.AMPLIFY_APP_DOMAIN || 'dcwmv1pw85f0j.amplifyapp.com',
  },

  // Turbopack config: disable for Amplify builds to avoid caching issues
  // turbopack: false, // Commented out to avoid TypeScript error
};

// Wrap with PWA (disabled in development)
const nextConfigWithPWA = withPWA(nextConfig, {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/manifest\.json$/],
  sw: 'public/sw.js',
});

export default withSentryConfig(nextConfigWithPWA, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'baltzisthemiscom',
  project: 'matlab-app',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
