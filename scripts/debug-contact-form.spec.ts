import { expect, test } from '@playwright/test';

interface RequestInfo {
  url: string;
  method: string;
  headers: Record<string, string>;
}

interface ResponseInfo {
  url: string;
  status: number;
  statusText: string;
}

test('debug contact form submission', async ({ page }) => {
  // Listen for console messages
  page.on('console', msg => {
    console.log('PAGE LOG:', msg.text());
  });

  // Listen for page errors
  page.on('pageerror', error => {
    console.log('PAGE ERROR:', error.message);
  });

  await page.goto('https://baltzakisthemis.com/');

  // Navigate to contact section
  await page.locator('nav button').filter({ hasText: 'Contact' }).click();
  await expect(page.locator('#contact')).toBeInViewport();

  // Fill out the contact form
  const testName = `Debug Test User ${Date.now()}`;
  const testEmail = `debug-test-${Date.now()}@example.com`;
  const testMessage = `Debug test message from Playwright at ${new Date().toISOString()}`;

  await page.fill('input[name="name"]', testName);
  await page.fill('input[name="email"]', testEmail);
  await page.fill('textarea[name="message"]', testMessage);

  // Submit the form
  await page.click('button[type="submit"]');

  // Wait a bit and check what happens
  await page.waitForTimeout(3000);

  // Check if success message appears
  const successMessage = page.locator('text=Message sent successfully!');
  const isVisible = await successMessage.isVisible();

  console.log('Success message visible:', isVisible);

  const requests: RequestInfo[] = [];
  const responses: ResponseInfo[] = [];

  if (!isVisible) {
    // Check if error message appears
    const errorMessage = page.locator('text=Failed to send message');
    const errorVisible = await errorMessage.isVisible();
    console.log('Error message visible:', errorVisible);

    // Check network requests
    page.on('request', request => {
      if (request.url().includes('appsync-api')) {
        requests.push({
          url: request.url(),
          method: request.method(),
          headers: request.headers()
        });
      }
    });

    page.on('response', response => {
      if (response.url().includes('appsync-api')) {
        responses.push({
          url: response.url(),
          status: response.status(),
          statusText: response.statusText()
        });
      }
    });

    // Try submitting again to capture network traffic
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);

    console.log('GraphQL requests:', requests);
    console.log('GraphQL responses:', responses);
  }
});