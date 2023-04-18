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
	await page.getByRole('link', { name: 'Abstimmung erstellen' }).click()
	await page.locator('input[name="title"]').click()
    await page.locator('input[name="title"]').fill('Playwright Test Poll')
    await page.locator('input[name="description"]').click()
    await page.locator('input[name="description"]').fill('This is a test Poll')
    await page.locator('select.select').selectOption({ label: 'Privat mit Login' })
    await page.getByRole('button', { name: 'Weiter' }).click()
    await page.click('input[value="zweiDrittelMajority]')
    await page.locator('input[name="startdate"]').click()
    await page.locator('input[name="startdate"]').fill('18.04.2023')
    await page.locator('input[name="enddate"]').click()
    await page.locator('input[name="enddate"]').fill('20.04.2023')
    await page.getByRole('button', { name: 'Abstimmung speichern' }).click()
})
