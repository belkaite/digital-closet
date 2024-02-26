import { test, expect } from '@playwright/test';

test('upload image functionality', async ({ page }) => {
  await page.goto('https://belkaite.github.io/digital-closet/closet');

  await page.setInputFiles('input[type="file"]', 'e2e/test-data/coat.png');

  await page.getByRole('button', { name: 'Upload Image' }).click();

  await expect(page.getByRole('img', { name: 'coat.png' })).toBeVisible;
});
