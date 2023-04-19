import { test, expect } from '@playwright/test';

test('crud group', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'Login' }).click();
	await page.getByLabel('Email').click();
	await page.getByLabel('Email').fill('test@mail.com');
	await page.getByLabel('Passwort').click();
	await page.getByLabel('Passwort').fill('Testpswd1!');
	await page.getByRole('button', { name: 'Login' }).click();
	await page.getByRole('img', { name: 'avatar' }).click();
	await page.getByRole('link', { name: 'Meine Gruppen' }).click();
	await page.getByRole('link', { name: 'Gruppe erstellen' }).click();
	await page.getByPlaceholder('PollToll Gruppe').click();
	await page.getByPlaceholder('PollToll Gruppe').fill('test group');
	await page.getByRole('button', { name: 'Gruppe erstellen' }).click();
	await page.getByRole('link').nth(4).click();
	await page.getByPlaceholder('username1234').click();
	await page.getByPlaceholder('username1234').fill('ollixd123');
	await page.getByRole('button', { name: '+' }).click();
	await page.getByRole('button', { name: 'Änderungen Speichern' }).click();
	await page.getByRole('button').nth(1).click();
	await page.getByRole('button', { name: 'Änderungen Speichern' }).click();
	await page.getByRole('img', { name: 'avatar' }).click();
	await page.getByRole('link', { name: 'Meine Gruppen' }).click();
	await page.getByRole('button').nth(1).click();
});
