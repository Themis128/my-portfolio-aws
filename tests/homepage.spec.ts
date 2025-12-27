import { expect, Page, test } from '@playwright/test';

test('homepage loads correctly', async ({ page }: { page: Page }) => {
  // Navigate to the homepage
  await page.goto('/');

  // Check if the page title contains the portfolio title
  await expect(page).toHaveTitle(/Themistoklis Baltzakis/);

  // Check if the main hero heading is visible
  await expect(page.locator('.group.relative.block').filter({ hasText: 'Themistoklis' })).toBeVisible();

  // Check if the hero section has the correct title and bio
  await expect(page.locator('section').first()).toContainText('Systems & Network Engineer');
  await expect(page.locator('section').first()).toContainText('Data Analytics professional');

  // Check if navigation links are present
  await expect(page.locator('nav button').filter({ hasText: 'Home' })).toBeVisible();
  await expect(page.locator('nav button').filter({ hasText: 'About' })).toBeVisible();
  await expect(page.locator('nav button').filter({ hasText: 'Skills' })).toBeVisible();
  await expect(page.locator('nav button').filter({ hasText: 'Experience' })).toBeVisible();
  await expect(page.locator('nav button').filter({ hasText: 'Projects' })).toBeVisible();
  await expect(page.locator('nav button').filter({ hasText: 'Contact' })).toBeVisible();
});

test('navigation works', async ({ page }: { page: Page }) => {
  await page.goto('/');

  // Check if About section is visible after clicking About in navigation
  await page.locator('nav button').filter({ hasText: 'About' }).click();
  await expect(page.locator('#about')).toBeInViewport();

  // Check if Skills section is visible after clicking Skills
  await page.locator('nav button').filter({ hasText: 'Skills' }).click();
  await expect(page.locator('#skills')).toBeInViewport();

  // Check if Experience section is visible after clicking Experience
  await page.locator('nav button').filter({ hasText: 'Experience' }).click();
  await expect(page.locator('#experience')).toBeInViewport();

  // Check if Projects section is visible after clicking Projects
  await page.locator('nav button').filter({ hasText: 'Projects' }).click();
  await expect(page.locator('#projects')).toBeInViewport();

  // Check if Contact section is visible after clicking Contact
  await page.locator('nav button').filter({ hasText: 'Contact' }).click();
  await expect(page.locator('#contact')).toBeInViewport();
});

test('responsive design', async ({ page }: { page: Page }) => {
  await page.goto('/');

  // Test mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });

  // Check if mobile menu button is visible (hamburger menu)
  await expect(page.locator('button.md\\:hidden')).toBeVisible();

  // Check if main content is visible
  await expect(page.locator('.group.relative.block').filter({ hasText: 'Themistoklis' })).toBeVisible();

  // Test tablet viewport
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(page.locator('.group.relative.block').filter({ hasText: 'Themistoklis' })).toBeVisible();

  // Test desktop viewport
  await page.setViewportSize({ width: 1920, height: 1080 });
  await expect(page.locator('.group.relative.block').filter({ hasText: 'Themistoklis' })).toBeVisible();
});