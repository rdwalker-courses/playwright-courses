import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://playwright.dev/docs/writing-tests');
  await expect(page.getByRole('button', { name: 'Getting Started' })).toBeVisible();
});