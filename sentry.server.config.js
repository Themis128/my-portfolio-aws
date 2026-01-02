import * as Sentry from '@sentry/nextjs';

// This file configures the Sentry SDK for the server-side.
// The config you add here will be used whenever the Sentry SDK is loaded in the server.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development',
});
