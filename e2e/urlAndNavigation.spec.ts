import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://belkaite.github.io/digital-closet/');
});

test.describe('navigate through menu', () => {
  test('go to about page', async ({ page }) => {
    await page.getByText('About').first().click();

    expect(page.url()).toContain('/');
  });

  test('go to wishlist page', async ({ page }) => {
    await page.getByText('Wish List').first().click();

    expect(page.url()).toContain('/wishlist');
  });

  test('go to closet page', async ({ page }) => {
    await page.getByText('Closet').nth(1).click();

    expect(page.url()).toContain('/closet');
  });

  test('redirects non existing path to main url', async ({ page }) => {
    await page.goto('https://belkaite.github.io/digital-closet/random');

    await expect(page).toHaveURL('https://belkaite.github.io/digital-closet/');
  });

  test('redirects to wishlist page', async ({ page }) => {
    await page.goto('https://belkaite.github.io/digital-closet/wishlist');

    await expect(page).toHaveURL('https://belkaite.github.io/digital-closet/wishlist');
  });

  test('redirects to closet  page', async ({ page }) => {
    await page.goto('https://belkaite.github.io/digital-closet/closet');

    await expect(page).toHaveURL('https://belkaite.github.io/digital-closet/closet');
  });
});
