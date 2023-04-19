import { test, expect } from '@playwright/test';

test('change password', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('test@mail.com');
  await page.getByLabel('Passwort').click();
  await page.getByLabel('Passwort').fill('Testpswd1!');
  await page.getByLabel('Passwort').press('Enter');
  await page.getByRole('img', { name: 'avatar' }).click();
  await page.getByRole('link', { name: 'Einstellungen' }).click();
  await page.getByRole('link', { name: 'Sicherheit' }).click();
  await page.getByLabel('Altes Passwort').click();
  await page.getByLabel('Altes Passwort').fill('Testpswd1!');
  await page.getByLabel('Neues Passwort').click();
  await page.getByLabel('Neues Passwort').fill('Testpswd2!');
  await page.getByLabel('Passwort bestätigen').click();
  await page.getByLabel('Passwort bestätigen').fill('Testpswd2!');
  await page.getByRole('button', { name: 'Password ändern' }).click();
  expect(
		page.getByText(
			'Loggen Sie sich ein Oder registriren sie sich, wenn Sie noch keinen Account habe'
		)
  ).toBeVisible();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('test@mail.com');
  await page.getByLabel('Passwort').click();
  await page.getByLabel('Passwort').fill('Testpswd2!');
  await page.getByLabel('Passwort').press('Enter');
  await page.getByRole('img', { name: 'avatar' }).click();
  await page.getByRole('link', { name: 'Einstellungen' }).click();
  await page.getByRole('link', { name: 'Sicherheit' }).click();
  await page.getByLabel('Altes Passwort').click();
  await page.getByLabel('Altes Passwort').fill('Testpswd2!');
  await page.getByLabel('Neues Passwort').click();
  await page.getByLabel('Neues Passwort').fill('Testpswd1!');
  await page.getByLabel('Passwort bestätigen').click();
  await page.getByLabel('Passwort bestätigen').fill('Testpswd1!');
  await page.getByRole('button', { name: 'Password ändern' }).click();
});