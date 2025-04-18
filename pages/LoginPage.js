const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {
    constructor(page) {
      this.page = page;
      this.usernameInput = page.locator('input[data-test="username"]');
      this.passwordInput = page.locator('input[data-test="password"]');
      this.loginButton = page.locator('input[data-test="login-button"]');
      this.errorMessage = page.locator('[data-test="error"]');
    }
  
    async goto() {
      await this.page.goto('https://www.saucedemo.com/');
    }
  
    async login(username, password) {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    }
  
    async expectUserLoginOutput(username) {  
      await this.page.waitForLoadState('load');  
      switch(username) {
        case "standard_user":
          await this.page.waitForURL('https://www.saucedemo.com/inventory.html');
          await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');      
          break;
        case "locked_out_user":  
          const errorText = await this.errorMessage.textContent();
          expect(errorText).toBe('Epic sadface: Sorry, this user has been locked out.');  
          break; 
        case "problem_user":
            await this.page.waitForURL('https://www.saucedemo.com/inventory.html');
            await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html'); 
          break;               
        case "performance_glitch_user":
            await this.page.waitForURL('https://www.saucedemo.com/inventory.html');  
            await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html'); 
          break; 
        case "error_user":
            await this.page.waitForURL('https://www.saucedemo.com/inventory.html');
            await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
            break; 
        case "visual_user":
            await this.page.waitForURL('https://www.saucedemo.com/inventory.html');
            await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');    
            break; 
        default:
            throw new Error(`Unexpected username value: ${username}. Test failed because no case matched.`);
      }   
    }

    async expectErrorMessage(expectedMessage) {
      const errorText = await this.errorMessage.textContent();
      expect(errorText).toBe(expectedMessage);
    }

    async expectMainLoginPage() {
      await this.page.waitForLoadState('load');  
      await this.page.waitForURL('https://www.saucedemo.com');
      await expect(this.page).toHaveURL('https://www.saucedemo.com');  
    }
};