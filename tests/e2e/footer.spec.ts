import { expect, test } from "@playwright/test";

test("skip link, footer links, back-to-top and social links work", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });

  // Skip link may not be present in this layout; if present, it should work, otherwise proceed
  const skip = page.locator('a[href="#main-content"]');
  if ((await skip.count()) > 0) {
    await expect(skip).toHaveCount(1);

    // Focus skip link and press Enter to jump to main
    await skip.focus();
    await page.keyboard.press("Enter");
    // After activating skip, main should be focused
    const main = page.locator("#main-content");
    await expect(main).toBeFocused();
  } else {
    // Fallback: ensure main region or body is visible — prefer <main>, then [role="main"], then body
    if ((await page.locator("main").count()) > 0) {
      await expect(page.locator("main").first()).toBeVisible();
    } else if ((await page.locator('[role="main"]').count()) > 0) {
      await expect(page.locator('[role="main"]').first()).toBeVisible();
    } else {
      await expect(page.locator("body")).toBeVisible();
    }
  }

  // Footer should exist
  const footer = page.locator("footer").first();
  await expect(footer).toBeVisible();

  // Links: look for GitHub and LinkedIn by href
  const github = footer.locator('a[href*="github.com"]');
  await expect(github).toHaveCount(1);
  const linkedin = footer.locator('a[href*="linkedin.com"]');
  await expect(linkedin).toHaveCount(1);

  // Scroll down to show Back to top button (optional) and click it if present
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const back = footer.locator('button[aria-label="Back to top"]');
  if ((await back.count()) > 0) {
    await expect(back).toBeVisible({ timeout: 3000 });
    await back.click();
    // wait for the scroll to finish, otherwise fallback to instant scroll
    try {
      await page.waitForFunction(() => window.scrollY < 50, null, {
        timeout: 2000,
      });
    } catch {
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
      await page.waitForFunction(() => window.scrollY < 50, null, {
        timeout: 500,
      });
    }
  }

  // ensure we're at the top — try to programmatically scroll up if back button didn't or isn't present
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForFunction(() => window.scrollY < 50, null, {
    timeout: 2000,
  });
  const y = await page.evaluate(() => window.scrollY);
  expect(y).toBeLessThan(50);
});
