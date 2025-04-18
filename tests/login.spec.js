const { test, expect } = require('@playwright/test');
const users = require('../test-data/users'); 

test.describe('Login Tests for Multiple Users', () => {
    for (const { username, password, expectedUrl } of users) {
        test(`login scenario for ${username}`, async ({ page }) => {
    
        await page.goto('https://www.saucedemo.com/');

        await page.fill('input[data-test="username"]', username);  
        await page.fill('input[data-test="password"]', password);

        await page.click('input[data-test="login-button"]'); 

        await page.waitForLoadState('load');

        switch(username) {
            case "standard_user":
              await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');      
              break;
            case "locked_out_user":
              const Error = await page.locator('[data-test="error"]').textContent();
              expect(Error).toBe('Epic sadface: Sorry, this user has been locked out.');
              break; 
            case "problem_user":
                await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); 
              break;               
            case "performance_glitch_user":
              await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); 
              break; 
            case "error_user":
                await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
                break; 
            case "visual_user":
                await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');    
                break; 
            default:
                throw new Error(`Unexpected value: ${value}. Test failed because no case matched.`);
          }
    
        
        });
    }
  });