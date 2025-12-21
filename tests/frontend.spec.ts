import { expect, test } from '@playwright/test';

test.describe('Portfolio Frontend Tests', () => {
  test('should load homepage and display hero content', async ({ page }) => {
    await page.goto('/');

    // Check if the page loads - title should be "Themistoklis Baltzakis"
    await expect(page).toHaveTitle('Themistoklis Baltzakis');

    // Check if hero content is visible
    await expect(
      page.locator('main h1').filter({ hasText: 'Themistoklis Baltzakis' })
    ).toBeVisible();
    await expect(
      page
        .locator('main p')
        .filter({ hasText: 'IT Consultant & Technology Expert' })
        .first()
    ).toBeVisible();
  });

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');

    // Check meta description - should contain "IT Consultant & Technology Expert"
    const metaDescription = page.locator('meta[name="description"]').first();
    await expect(metaDescription).toHaveAttribute(
      'content',
      /IT Consultant.*Technology Expert/i
    );

    // Check Open Graph title
    const ogTitle = page.locator('meta[property="og:title"]').first();
    await expect(ogTitle).toHaveAttribute('content', /Themistoklis Baltzakis/);
  });

  test('should have navigation elements', async ({ page }) => {
    await page.goto('/');

    // Check if navigation links are present in the hero section - use more specific selectors
    await expect(
      page.locator('.amplify-button').filter({ hasText: 'Learn More About Me' })
    ).toBeVisible();
    await expect(
      page.locator('.amplify-button').filter({ hasText: 'View My Projects' })
    ).toBeVisible();
    // Note: "Get In Touch" button is in the portfolio cards section, not hero
  });

  test('should have portfolio sections', async ({ page }) => {
    await page.goto('/');

    // Check if portfolio sections are visible - target the card headers specifically
    await expect(
      page.locator('h2').filter({ hasText: 'Explore My Portfolio' })
    ).toBeVisible();
    await expect(
      page.locator('h3').filter({ hasText: 'About Me' }).first()
    ).toBeVisible();
    await expect(
      page.locator('h3').filter({ hasText: 'My Projects' }).first()
    ).toBeVisible();
    await expect(
      page.locator('h3').filter({ hasText: 'Latest Blog' }).first()
    ).toBeVisible();
    await expect(
      page.locator('h3').filter({ hasText: 'Get In Touch' }).first()
    ).toBeVisible();
  });
});
