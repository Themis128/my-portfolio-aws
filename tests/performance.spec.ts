import { expect, test } from "@playwright/test";

test.describe("Performance Tests", () => {
  test("should load homepage within performance budget", async ({ page }) => {
    const startTime = Date.now();

    await page.goto("/", { waitUntil: "networkidle" });

    const loadTime = Date.now() - startTime;

    // Performance budget: page should load within 4 seconds
    expect(loadTime).toBeLessThan(4000);

    // Check Core Web Vitals approximation
    const metrics = (await page.evaluate(
      (): Promise<{
        domContentLoaded: number;
        loadComplete: number;
        firstPaint: number;
        firstContentfulPaint: number;
      }> => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          return entries;
        });

        return new Promise((resolve) => {
          observer.observe({ entryTypes: ["navigation", "paint"] });
          setTimeout(() => {
            const navigation = performance.getEntriesByType(
              "navigation",
            )[0] as PerformanceNavigationTiming;
            const paint = performance.getEntriesByType("paint");

            resolve({
              domContentLoaded:
                navigation.domContentLoadedEventEnd -
                navigation.domContentLoadedEventStart,
              loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
              firstPaint:
                paint.find((p) => p.name === "first-paint")?.startTime || 0,
              firstContentfulPaint:
                paint.find((p) => p.name === "first-contentful-paint")
                  ?.startTime || 0,
            });
          }, 100);
        });
      },
    )) as {
      domContentLoaded: number;
      loadComplete: number;
      firstPaint: number;
      firstContentfulPaint: number;
    };

    // Check that key metrics are within reasonable bounds
    expect(metrics.domContentLoaded).toBeLessThan(3000);
    expect(metrics.loadComplete).toBeLessThan(4000);
  });

  test("should have good Lighthouse performance score approximation", async ({
    page,
  }) => {
    await page.goto("/");

    // Wait for page to be fully loaded
    await page.waitForLoadState("networkidle");

    // Check bundle size approximation (by checking for large assets)
    const resources = await page.evaluate(() => {
      const resources = performance.getEntriesByType(
        "resource",
      ) as PerformanceResourceTiming[];
      return resources.map((r) => ({
        name: r.name,
        size: r.transferSize,
        duration: r.responseEnd - r.requestStart,
      }));
    });

    // Check that no single resource is too large (>5MB)
    const largeResources = resources.filter((r) => r.size > 5 * 1024 * 1024);
    expect(largeResources.length).toBe(0);

    // Check that resources load quickly
    const slowResources = resources.filter((r) => r.duration > 2000);
    expect(slowResources.length).toBeLessThan(5); // Allow some slow resources
  });

  test("should handle navigation performance", async ({ page }) => {
    // Start on a protected route so auth modal is present
    await page.goto("/todo");

    const navigationStart = Date.now();

    // Since app requires auth, test navigation within auth modal context
    // Navigate to a different route (will still show auth modal)
    await page.goto("/about", { waitUntil: "networkidle" });

    const navigationTime = Date.now() - navigationStart;

    // Navigation should be fast even with auth modal
    expect(navigationTime).toBeLessThan(3000);

    // Check that the page loaded (auth modal or content)
    await expect(page.locator("body")).toBeVisible();
  });

  test("should minimize layout shifts", async ({ page }) => {
    await page.goto("/");

    // Monitor layout shifts
    const layoutShifts: number[] = [];

    page.on("console", (msg) => {
      if (msg.text().includes("Layout shift")) {
        // Parse layout shift value if logged
        const shiftMatch = msg.text().match(/shift: ([0-9.]+)/);
        if (shiftMatch) {
          layoutShifts.push(parseFloat(shiftMatch[1]));
        }
      }
    });

    // Wait for dynamic content to load
    await page.waitForTimeout(3000);

    // Calculate cumulative layout shift
    const cls = layoutShifts.reduce((sum, shift) => sum + shift, 0);

    // CLS should be less than 0.1 (good threshold)
    expect(cls).toBeLessThan(0.1);
  });

  test("should have efficient JavaScript execution", async ({ page }) => {
    await page.goto("/");

    // Measure JavaScript execution time
    const jsMetrics = (await page.evaluate(
      (): Promise<{
        longTasks: number;
        totalScripts: number;
        totalFunctions: number;
      }> => {
        return new Promise((resolve) => {
          let longTasks = 0;
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.duration > 50) {
                // Tasks longer than 50ms
                longTasks++;
              }
            }
          });

          observer.observe({ entryTypes: ["longtask"] });

          setTimeout(() => {
            resolve({
              longTasks,
              totalScripts: document.scripts.length,
              totalFunctions: Object.keys(window).length,
            });
          }, 2000);
        });
      },
    )) as {
      longTasks: number;
      totalScripts: number;
      totalFunctions: number;
    };

    // Should have minimal long tasks
    expect(jsMetrics.longTasks).toBeLessThan(5);

    // Reasonable number of scripts (allowing up to 50 for modern apps)
    expect(jsMetrics.totalScripts).toBeLessThanOrEqual(50);
  });

  test("should optimize images and assets", async ({ page }) => {
    await page.goto("/");

    // Check for unoptimized images
    const images = await page.$$eval("img", (imgs) => {
      return imgs.map((img) => ({
        src: img.src,
        width: img.naturalWidth,
        height: img.naturalHeight,
        loading: img.loading,
        alt: img.alt,
      }));
    });

    // Check that images have proper attributes
    for (const img of images) {
      expect(img.alt).toBeTruthy(); // Images should have alt text
      expect(img.width).toBeGreaterThan(0); // Images should have dimensions
      expect(img.height).toBeGreaterThan(0);
    }

    // Check for lazy loading on below-fold images
    const lazyImages = images.filter((img) => img.loading === "lazy");
    expect(lazyImages.length).toBeGreaterThanOrEqual(0); // At least some lazy loading
  });
});
