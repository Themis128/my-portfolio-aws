import { test, expect } from '@playwright/test';

test('test contact form fix', async ({ page }) => {
  await page.goto('https://baltzakisthemis.com/');

  // Navigate to contact section
  await page.locator('nav button').filter({ hasText: 'Contact' }).click();
  await expect(page.locator('#contact')).toBeInViewport();

  // Fill out the contact form
  const testName = `Test User ${Date.now()}`;
  const testEmail = `test-${Date.now()}@example.com`;
  const testMessage = `Test message at ${new Date().toISOString()}`;

  await page.fill('input[name="name"]', testName);
  await page.fill('input[name="email"]', testEmail);
  await page.fill('textarea[name="message"]', testMessage);

  // Submit the form
  await page.click('button[type="submit"]');

  // Wait for success message to appear (with longer timeout)
  await expect(page.locator('text=Message sent successfully!')).toBeVisible({ timeout: 10000 });

  console.log('SUCCESS: Contact form works!');
});