import { expect, test, Page } from '@playwright/test';

test('homepage loads correctly', async ({ page }: { page: Page }) => {
  // Navigate to the homepage
  await page.goto('/');

  // Check if the page title contains "21st.dev"
  await expect(page).toHaveTitle(/21st\.dev/);

  // Check if the main heading is visible
  await expect(page.locator('h1').filter({ hasText: 'Build faster with' })).toBeVisible();

  // Check if the hero section text is present
  await expect(page.locator('text=Discover, share, and prototype with the largest collection of modern UI components')).toBeVisible();

  // Check if navigation links are present
  await expect(page.locator('text=Components')).toBeVisible();
  await expect(page.locator('text=Community')).toBeVisible();
  await expect(page.locator('text=Canvas')).toBeVisible();
  await expect(page.locator('text=About')).toBeVisible();
});

test('navigation works', async ({ page }: { page: Page }) => {
  await page.goto('/');

  // Click on Components link
  await page.locator('text=Components').click();

  // Should navigate to components page
  await expect(page).toHaveURL(/.*components/);

  // Go back to home
  await page.goto('/');

  // Click on Community link
  await page.locator('text=Community').click();

  // Should navigate to community page
  await expect(page).toHaveURL(/.*community/);
});

test('responsive design', async ({ page }: { page: Page }) => {
  await page.goto('/');

  // Test mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });

  // Check if mobile menu or responsive elements work
  await expect(page.locator('h1')).toBeVisible();

  // Test tablet viewport
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(page.locator('h1')).toBeVisible();

  // Test desktop viewport
  await page.setViewportSize({ width: 1920, height: 1080 });
  await expect(page.locator('h1')).toBeVisible();
});