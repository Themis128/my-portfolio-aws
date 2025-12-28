import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  experimental: {
    // reactCompiler: false, // Explicitly disable React Compiler
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'baltzakisthemis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
