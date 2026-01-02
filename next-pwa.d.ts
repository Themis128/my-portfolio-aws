declare module 'next-pwa' {
  import { NextConfig } from 'next';

  interface RuntimeCaching {
    urlPattern: RegExp | string;
    handler: string;
    options?: Record<string, unknown>;
  }

  interface PWAOptions {
    dest?: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    buildExcludes?: RegExp[];
    sw?: string;
    runtimeCaching?: RuntimeCaching[];
    fallbacks?: Record<string, string>;
    cacheOnFrontEndNav?: boolean;
    reloadOnOnline?: boolean;
    [key: string]: unknown;
  }

  function withPWA(options?: PWAOptions): (config: NextConfig) => NextConfig;
  function withPWA(config: NextConfig, options?: PWAOptions): NextConfig;

  export default withPWA;
}
