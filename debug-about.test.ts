import { test, expect } from '@playwright/test';

test('Debug About page loading issues', async ({ page }) => {
  // Listen for console errors
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // Listen for network requests
  const networkRequests: { url: string; status?: number; error?: string }[] = [];
  page.on('request', request => {
    if (request.url().includes('/api/')) {
      networkRequests.push({ url: request.url() });
    }
  });

  page.on('response', response => {
    if (response.url().includes('/api/')) {
      const request = networkRequests.find(r => r.url === response.url());
      if (request) {
        request.status = response.status();
      }
    }
  });

  page.on('requestfailed', request => {
    if (request.url().includes('/api/')) {
      const req = networkRequests.find(r => r.url === request.url());
      if (req) {
        req.error = request.failure()?.errorText || 'Request failed';
      }
    }
  });

  // Navigate to About page
  await page.goto('/about');

  // Wait a bit for loading
  await page.waitForTimeout(5000);

  // Check if loading text is still there
  const loadingText = await page.locator('text=Loading...').isVisible();
  console.log('Loading text visible:', loadingText);

  // Check console errors
  console.log('Console errors:', consoleErrors);

  // Check network requests
  console.log('API requests:', networkRequests);

  // Try to get the page content
  const content = await page.content();
  console.log('Page contains "Loading...":', content.includes('Loading...'));

  // Check if personal data is loaded by looking for specific content
  const hasBio = await page.locator('text=Cloud Solutions Architect').isVisible();
  console.log('Bio text visible:', hasBio);
});