import { test, expect } from '@playwright/test';

test('login test', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('test@mail.com');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('Testpswd1!');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('/');
  expect(page.getByRole('img', { name: 'avatar' })).toBeVisible();
});