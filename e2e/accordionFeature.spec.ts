import { test, expect } from '@playwright/test';

test('accordion functionality', async ({ page }) => {
  await page.goto('https://belkaite.github.io/digital-closet/');
  await page
    .getByRole('main')
    .locator('div')
    .filter({ hasText: 'What inspired the creation of' })
    .nth(3)
    .click();

  await expect(page.getByText('The fashion industry is a')).toBeVisible;

  await page.getByRole('main').locator('div').filter({ hasText: 'Main features' }).nth(3).click();
  await expect(page.getByText('The fashion industry is a')).toBeHidden;
});
