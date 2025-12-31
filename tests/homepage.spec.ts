import { expect, Page, test } from '@playwright/test';

test('homepage loads correctly', async ({ page }: { page: Page }) => {
  // Navigate to the homepage
  await page.goto('/');

  // Check if the page title contains the portfolio title
  await expect(page).toHaveTitle(/Themistoklis Baltzakis/);

  // Wait for the typing animation to complete (approximately 5 seconds for "Themistoklis")
  await page.waitForTimeout(6000);

  // Check if the main hero heading is visible (name in h1)
  await expect(page.locator('h1').filter({ hasText: 'Themistoklis' })).toBeVisible();

  // Check if the hero section has the correct title
  await expect(page.locator('section').first()).toContainText('BCs Computer Science - MSc Data Analytics');
  await expect(page.locator('section').first()).toContainText('View My Work');
  await expect(page.locator('section').first()).toContainText('Get In Touch');

  // Check navigation based on viewport
  const viewportSize = page.viewportSize();
  if (viewportSize && viewportSize.width >= 768) {
    // Desktop navigation - wait for navigation to be visible
    await page.waitForSelector('nav button', { timeout: 10000 });
    await expect(page.locator('nav button').filter({ hasText: 'Home' })).toBeVisible();
    await expect(page.locator('nav button').filter({ hasText: 'About' })).toBeVisible();
    await expect(page.locator('nav button').filter({ hasText: 'Skills' })).toBeVisible();
    await expect(page.locator('nav button').filter({ hasText: 'Experience' })).toBeVisible();
    await expect(page.locator('nav button').filter({ hasText: 'Projects' })).toBeVisible();
    await expect(page.locator('nav button').filter({ hasText: 'Contact' })).toBeVisible();
  } else {
    // Mobile navigation - check for hamburger menu
    await expect(page.locator('button.md\\:hidden')).toBeVisible();
  }
});

test('navigation works', async ({ page }: { page: Page }) => {
  await page.goto('/');

  // Wait for page to load completely
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000); // Wait for animations

  // Test desktop navigation
  await page.setViewportSize({ width: 1024, height: 768 });

  // Wait for navigation to be visible
  await page.waitForSelector('nav', { timeout: 10000 });
  await page.waitForSelector('nav button', { timeout: 10000 });

  // Check if About section is visible after clicking About in navigation
  await page.locator('nav button').filter({ hasText: 'About' }).click();
  await page.waitForTimeout(1000); // Wait for scroll
  await expect(page.locator('#about')).toBeInViewport();

  // Check if Skills section is visible after clicking Skills
  await page.locator('nav button').filter({ hasText: 'Skills' }).click();
  await page.waitForTimeout(1000); // Wait for scroll
  await expect(page.locator('#skills')).toBeInViewport();

  // Check if Experience section is visible after clicking Experience
  await page.locator('nav button').filter({ hasText: 'Experience' }).click();
  await page.waitForTimeout(1000); // Wait for scroll
  await expect(page.locator('#experience')).toBeInViewport();

  // Check if Projects section is visible after clicking Projects
  await page.locator('nav button').filter({ hasText: 'Projects' }).click();
  await page.waitForTimeout(1000); // Wait for scroll
  await expect(page.locator('#projects')).toBeInViewport();

  // Check if Contact section is visible after clicking Contact
  await page.locator('nav button').filter({ hasText: 'Contact' }).click();
  await page.waitForTimeout(1000); // Wait for scroll
  await expect(page.locator('#contact')).toBeInViewport();
});

test('responsive design', async ({ page }: { page: Page }) => {
  await page.goto('/');

  // Wait for the typing animation to complete
  await page.waitForTimeout(6000);

  // Test mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });

  // Check if mobile menu button is visible (hamburger menu)
  await expect(page.locator('button.md\\:hidden')).toBeVisible();

  // Check if main content is visible (hero name)
  await expect(page.locator('h1').filter({ hasText: 'Themistoklis' })).toBeVisible();

  // Test tablet viewport
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(page.locator('h1').filter({ hasText: 'Themistoklis' })).toBeVisible();

  // Test desktop viewport
  await page.setViewportSize({ width: 1920, height: 1080 });
  await expect(page.locator('h1').filter({ hasText: 'Themistoklis' })).toBeVisible();
});