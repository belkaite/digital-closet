import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
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
    await page.goto('http://localhost:5173/random');

    await expect(page).toHaveURL('http://localhost:5173/');
  });

  test('redirects to wishlist page', async ({ page }) => {
    await page.goto('http://localhost:5173/wishlist');

    await expect(page).toHaveURL('http://localhost:5173/wishlist');
  });

  test('redirects to closet  page', async ({ page }) => {
    await page.goto('http://localhost:5173/closet');

    await expect(page).toHaveURL('http://localhost:5173/closet');
  });
});
