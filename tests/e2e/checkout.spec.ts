import { test, expect } from '@playwright/test';

test.describe('E2E Checkout Flow', () => {
  test('Complete guest checkout successfully', async ({ page }) => {
    // Navigate to storefront
    await page.goto('http://localhost:3001');

    // Go to catalog
    await page.click('text=Shop');

    // Add product to cart
    await page.click('text=Add to Cart');

    // Go to cart
    await page.click('[aria-label="Cart"]');
    await expect(page.locator('text=Shopping Cart')).toBeVisible();

    // Proceed to checkout
    await page.click('text=Checkout');

    // Fill shipping details
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="address"]', '123 Test St');
    await page.fill('input[name="city"]', 'Testville');
    await page.fill('input[name="zip"]', '12345');

    // Complete order
    await page.click('text=Place Order');

    // Verify success
    await expect(page.locator('text=Order Confirmed')).toBeVisible();
    await expect(page.locator('text=Thank you for your purchase')).toBeVisible();
  });
});
