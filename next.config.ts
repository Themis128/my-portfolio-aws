import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  experimental: {
    // reactCompiler: false, // Explicitly disable React Compiler
  },
};

export default nextConfig;
