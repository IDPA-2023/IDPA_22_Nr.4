import { test, expect } from '@playwright/test';

test('add and delete Poll', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'Login' }).click();
	await page.locator('input[name="email"]').click();
	await page.locator('input[name="email"]').fill('test@mail.com');
	await page.locator('input[name="password"]').click();
	await page.locator('input[name="password"]').fill('Testpswd1!');
	await page.getByRole('button', { name: 'Login' }).click();
	await page.waitForURL('/');
	await page.getByRole('link', { name: 'Abstimmung erstellen' }).click();
	await page.locator('input[name="title"]').click();
	await page.locator('input[name="title"]').fill('Playwright Test Poll');
	await page.locator('input[name="description"]').click();
	await page.locator('input[name="description"]').fill('This is a test Poll');
	await page.locator('select.select').selectOption({ label: 'Öffentlich' });
	await page.getByRole('button', { name: 'Weiter' }).click();
	await page.click('input[value="twothirdMajority"]');
	await page.locator('input[name="startdate"]').click();
	await page.locator('input[name="startdate"]').fill('2023-04-18');
	await page.locator('input[name="enddate"]').click();
	await page.locator('input[name="enddate"]').fill('2023-04-20');
	await page.getByRole('button', { name: 'Abstimmung speichern' }).click();

	await page.goto('/my/polls');
	await page.locator('span.delete-span').click();
	await page.locator('button.delete-btn').click();
});
