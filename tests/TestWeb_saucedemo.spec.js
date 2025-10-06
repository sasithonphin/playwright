import { test, expect } from '@playwright/test';

test('Check Title and Field on Web', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
  await expect(page.locator('#user-name')).toHaveAttribute('placeholder', 'Username');
  await expect(page.locator('#password')).toHaveAttribute('placeholder', 'Password');
  await expect(page.locator('#login-button')).toHaveText('Login');
  await expect(page.locator('#login-button')).toBeVisible();
});

test('Check Login on Web when Enter Username and Pasword correct', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.type('#password', 'secret_sauce');
  await page.click('#login-button'); 
});

test('Check Login on Web when Enter Username and Pasword incorrect', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'Fromthailand');
  await page.type('#password', '1234');
  await page.click('#login-button'); 
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  await page.click('[data-test="error-button"]'); 
});

