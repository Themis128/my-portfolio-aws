import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for production E2E testing
 * Tests the live production website and backend functionality
 */
export default defineConfig({
  testDir: './tests',
  testMatch: 'production-e2e.spec.ts',

  /* Run tests in files in parallel */
  fullyParallel: false, // Run sequentially for production testing

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,

  /* Single worker for production testing to avoid rate limiting */
  workers: 1,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/production-e2e-results.json' }]
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Capture screenshots on failure */
    screenshot: 'only-on-failure',

    /* Record video on failure */
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium-production',
      use: {
        ...devices['Desktop Chrome'],
        /* Slow down actions for production testing */
        actionTimeout: 10000,
        navigationTimeout: 30000,
      },
    },
  ],

  /* Global timeout for production tests */
  timeout: 60000, // 1 minute

  /* Expect timeout */
  expect: {
    timeout: 10000,
  },

  /* No web server needed for production testing */
  // webServer: undefined
});