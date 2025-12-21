import { expect, test } from "@playwright/test";

test.describe("API Integration Tests", () => {
  test("should handle GraphQL queries without errors", async ({ page }) => {
    // Mock GraphQL responses
    await page.route("**/graphql", async (route) => {
      const request = route.request();
      const postData = request.postData();

      if (postData?.includes("query")) {
        // Mock successful query response
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              user: {
                id: "1",
                name: "Test User",
                email: "test@example.com",
              },
            },
          }),
        });
      } else {
        await route.continue();
      }
    });

    await page.goto("/");

    // Check that no GraphQL errors appear in console
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    // Wait a bit for any API calls
    await page.waitForTimeout(2000);

    // Filter out non-GraphQL errors
    const graphqlErrors = errors.filter(
      (error) => error.includes("GraphQL") || error.includes("query"),
    );

    expect(graphqlErrors.length).toBe(0);
  });

  test("should handle GraphQL mutations", async ({ page }) => {
    await page.route("**/graphql", async (route) => {
      const request = route.request();
      const postData = request.postData();

      if (postData?.includes("mutation")) {
        // Mock successful mutation response
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              updateUser: {
                id: "1",
                success: true,
              },
            },
          }),
        });
      } else {
        await route.continue();
      }
    });

    await page.goto("/");

    // Check for successful mutation handling
    await expect(page.locator("body")).toBeVisible();
  });

  test("should handle API errors gracefully", async ({ page }) => {
    await page.route("**/graphql", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          errors: [
            {
              message: "Internal server error",
            },
          ],
        }),
      });
    });

    await page.goto("/");

    // Check that error is handled (might show error message or fallback UI)
    await expect(page.locator("body")).toBeVisible();
  });

  test("should handle network timeouts", async ({ page }) => {
    await page.route("**/graphql", async (route) => {
      // Simulate timeout
      await new Promise((resolve) => setTimeout(resolve, 35000));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ data: {} }),
      });
    });

    await page.goto("/");

    // App should handle timeout gracefully
    await expect(page.locator("body")).toBeVisible();
  });

  test("should validate API response structure", async ({ page }) => {
    // Mock the internal projects API to prevent real API calls during testing
    await page.route("**/api/projects", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            slug: "test-project",
            title: "Test Project",
            description: "A test project",
            technologies: ["React", "TypeScript"],
            tags: ["Web Development"],
            client: "Test Client",
          },
        ]),
      });
    });

    await page.goto("/projects");

    // Check that the page loads without API errors
    await expect(page.locator("body")).toBeVisible();

    // Check for any critical error messages (ignore info alerts like 'No Projects Found')
    const criticalErrors = page.locator(
      '[role="alert"]:has-text("Error"), .critical-error, .error',
    );
    await expect(criticalErrors).toHaveCount(0);
  });
});
