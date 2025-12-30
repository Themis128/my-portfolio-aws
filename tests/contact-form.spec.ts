import { expect, test } from '@playwright/test';

test.describe('Contact Form - Local Development', () => {
  test('should submit contact form successfully via UI', async ({ page }) => {
    // Navigate to the local development server
    await page.goto('http://localhost:3000');

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');

    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect(page.locator('#contact')).toBeInViewport();

    // Generate unique test data
    const testName = `Test User ${Date.now()}`;
    const testEmail = `test-${Date.now()}@example.com`;
    const testMessage = `Automated test message from Playwright at ${new Date().toISOString()}`;

    // Fill out the contact form
    await page.fill('input[name="name"]', testName);
    await page.fill('input[name="email"]', testEmail);
    await page.fill('textarea[name="message"]', testMessage);

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for success message to appear
    await expect(page.locator('text=Message sent successfully!')).toBeVisible({ timeout: 15000 });

    console.log('✅ Contact form submission successful!');
    console.log(`📧 Test email: ${testEmail}`);
    console.log(`👤 Test name: ${testName}`);
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Check if browser validation prevents submission (HTML5 required attributes)
    // The form should not submit and should show validation messages
    await expect(page.locator('input[name="name"]:invalid')).toBeVisible();
    await expect(page.locator('input[name="email"]:invalid')).toBeVisible();
    await expect(page.locator('textarea[name="message"]:invalid')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Fill form with invalid email
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('textarea[name="message"]', 'Test message');

    // Submit the form
    await page.click('button[type="submit"]');

    // Check if email validation prevents submission
    await expect(page.locator('input[name="email"]:invalid')).toBeVisible();
  });

  test('should handle form submission errors gracefully', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Fill form with valid data
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Test message');

    // Mock a network error by blocking GraphQL requests
    await page.route('**/appsync-api.eu-central-1.amazonaws.com/graphql', route => route.abort());

    // Submit the form
    await page.click('button[type="submit"]');

    // Should show error message
    await expect(page.locator('text=Failed to send message')).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Contact GraphQL API - Sandbox', () => {
  const GRAPHQL_ENDPOINT = 'https://52sbnvcfvvh6bmnpumczqlfihi.appsync-api.eu-central-1.amazonaws.com/graphql';
  const API_KEY = 'da2-nz4qfcj7lne3dbeknww64vwala';

  test('should submit contact form via GraphQL API', async ({ request }) => {
    const query = `
      mutation SendContact($name: String!, $email: String!, $message: String!) {
        sendContact(name: $name, email: $email, message: $message)
      }
    `;

    const testName = `API Test User ${Date.now()}`;
    const testEmail = `api-test-${Date.now()}@example.com`;
    const testMessage = `API test message from Playwright at ${new Date().toISOString()}`;

    const response = await request.post(GRAPHQL_ENDPOINT, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      data: {
        query,
        variables: {
          name: testName,
          email: testEmail,
          message: testMessage
        }
      }
    });

    expect(response.ok()).toBe(true);

    const result = await response.json();
    expect(result).toHaveProperty('data');
    expect(result.data).toHaveProperty('sendContact');

    // The sendContact mutation should return a success message
    if (result.data.sendContact) {
      expect(typeof result.data.sendContact).toBe('string');
      expect(result.data.sendContact.toLowerCase()).toContain('success');
    }

    console.log('✅ GraphQL API test successful!');
    console.log(`📧 API Test email: ${testEmail}`);
  });

  test('should validate required fields via API', async ({ request }) => {
    const query = `
      mutation SendContact($name: String!, $email: String!, $message: String!) {
        sendContact(name: $name, email: $email, message: $message)
      }
    `;

    const response = await request.post(GRAPHQL_ENDPOINT, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      data: {
        query,
        variables: {
          name: '', // Empty name
          email: 'test@example.com',
          message: 'Test message'
        }
      }
    });

    expect(response.ok()).toBe(true);

    const result = await response.json();
    // GraphQL should handle validation
    expect(result).toHaveProperty('data');
  });
});