import type { Page } from "@playwright/test";

export async function waitForStableLayout(
  page: Page,
  opts: { checks?: number; interval?: number; timeout?: number } = {},
) {
  const checks = opts.checks ?? 3;
  const interval = opts.interval ?? 100;
  const timeout = opts.timeout ?? 5000;

  const start = Date.now();
  let last = await page.evaluate(() => document.body.scrollHeight);
  let stable = 0;
  while (Date.now() - start < timeout) {
    await page.waitForTimeout(interval);
    const now = await page.evaluate(() => document.body.scrollHeight);
    if (now === last) {
      stable++;
      if (stable >= checks) return;
    } else {
      stable = 0;
      last = now;
    }
  }
  throw new Error("Layout did not stabilize within timeout");
}
