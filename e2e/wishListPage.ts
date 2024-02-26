import { test, expect, Page } from '@playwright/test';

async function addItem(page: Page) {
  await page.getByRole('button', { name: '+' }).click();
  await page.getByPlaceholder("Enter item's name. For").fill('skirt');
  await page.getByPlaceholder('Enter a number. For example,').fill('10');
  await page.getByPlaceholder('Enter a link that directs to').fill('https://shop.com/item');
  await page.getByRole('button', { name: 'Add Item' }).click();
}

test.describe('Wishlist Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://belkaite.github.io/digital-closet/wishlist');
    await addItem(page);
  });

  test('should allow adding an item', async ({ page }) => {
    await expect(page.getByText('skirt10 EurLink2024-02-')).toHaveCount(1);
  });

  test('should filter purchased items correctly', async ({ page }) => {
    await page.getByLabel('To purchase').check();
    await page.getByRole('button', { name: 'To purchase' }).click();
    await expect(page.getByText('skirt10 EurLink2024-02-')).toBeHidden();
  });

  test('should filter items to purchase correctly', async ({ page }) => {
    await page.getByRole('button', { name: 'Purchased' }).click();
    await expect(page.getByText('skirt10 EurLink2024-02-')).toBeHidden();
  });

  test('should delete an item correctly', async ({ page }) => {
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByText('skirt10 EurLink2024-02-')).toBeHidden();
  });
});
