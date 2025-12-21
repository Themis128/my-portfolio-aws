import { Page } from "@playwright/test";

/**
 * Mock AWS Amplify authentication for testing
 * This bypasses the auth modal and simulates a signed-in user
 */
export async function mockAuthentication(page: Page) {
  // Set Amplify auth state to signed in
  await page.evaluate(() => {
    localStorage.setItem("amplify-authenticator-authState", "signedIn");
    localStorage.setItem("amplify-sign-in-with-hostedUI", "false");

    // Mock user session data
    const mockUser = {
      username: "testuser",
      attributes: {
        email: "test@example.com",
        email_verified: true,
        sub: "test-user-id",
      },
    };

    localStorage.setItem("amplify-auth-user", JSON.stringify(mockUser));

    // Mock auth tokens (simplified for testing)
    const mockTokens = {
      accessToken: "mock-access-token",
      idToken: "mock-id-token",
      refreshToken: "mock-refresh-token",
    };

    localStorage.setItem("amplify-auth-tokens", JSON.stringify(mockTokens));
  });

  // Reload the page to apply the mocked auth state
  await page.reload();

  // Wait for the page to load after auth
  await page.waitForLoadState("networkidle");
}

/**
 * Disable Next.js dev overlay that can block interactions
 */
export async function disableDevOverlay(page: Page) {
  await page.evaluate(() => {
    const overlay = document.querySelector("[data-nextjs-dev-overlay]");
    if (overlay) {
      (overlay as HTMLElement).style.display = "none";
    }
  });
}
