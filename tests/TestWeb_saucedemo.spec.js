import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {  // เปิด https://www.saucedemo.com/ การเปิดเว็บซ้ำ ๆ
  await page.goto('https://www.saucedemo.com/'); 
});

test.describe('SauceDemo Login Tests', () => {
test('Check Title and Field on Web', async ({ page }) => {
  //await page.goto('https://www.saucedemo.com/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
  await expect(page.locator('#user-name')).toHaveAttribute('placeholder', 'Username');
  await expect(page.locator('#password')).toHaveAttribute('placeholder', 'Password');
  await expect(page.locator('#login-button')).toHaveText('Login');
  await expect(page.locator('#login-button')).toBeVisible();
});

test('Check Login on Web when Enter Username and Pasword correct', async ({ page }) => {
  //await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.type('#password', 'secret_sauce');
  await page.click('#login-button'); 
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('.inventory_list')).toBeVisible();
});

test('Check Login on Web when Enter Username and Pasword incorrect', async ({ page }) => {
  //await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'Fromthailand');
  await page.type('#password', '1234');
  await page.click('#login-button'); 
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  await page.click('[data-test="error-button"]'); 
});


test('Check Login on Web when not enter Username and Pasword', async ({ page }) => {
  //await page.goto('https://www.saucedemo.com/');
  await page.click('#login-button'); 
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
  await page.click('[data-test="error-button"]'); 
});

test('Check Login on Web when not enter Password', async ({ page }) => {
  //await page.goto('https://www.saucedemo.com/');
  await page.type('#user-name', '1234');
  await page.click('#login-button'); 
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Password is required');
  await page.click('[data-test="error-button"]'); 
});

test('Check Login on Web when not enter Username', async ({ page }) => {
 // await page.goto('https://www.saucedemo.com/');
  await page.type('#password', '1234');
  await page.click('#login-button'); 
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
  await page.click('[data-test="error-button"]'); 
});


test('Check Logout on Web', async ({ page }) => {
  //await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button'); 
  await page.click('#react-burger-menu-btn'); 
  await page.click('#logout_sidebar_link'); 
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.locator('.login_wrapper-inner')).toBeVisible();

});

test('Check Performance glitch user on Web more then 1s', async ({ page }) => {  
  //await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'performance_glitch_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button' , { timeout: 1000 });  // more then 1s
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('.inventory_list')).toBeVisible();
});

test('Check user lock on Web', async ({ page }) => {
  //await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'locked_out_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button'); 
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});



});