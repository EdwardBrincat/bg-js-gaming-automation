const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { CatalogPage } = require('../pages/CatalogPage');
const users = require('../test-data/Users'); 
const standardUser = users.find(user => user.username === 'standard_user');

test.describe('Login Feature - Login Tests for Multiple Users Scenario', () => {
    for (const { username, password, expectedUrl } of users) {
                test(`Login Scenario for ${username}`, async ({ page }) => {
            
                const loginPage = new LoginPage(page);

                await loginPage.goto();
                await loginPage.login(username, password);
                await loginPage.expectUserLoginOutput(username);        
        });
    }
});  

test('Login Feature - Login and Logout Successfully Scenario', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const catalogPage = new CatalogPage(page);

    await loginPage.goto();
    await loginPage.login(standardUser.username, standardUser.password); 
    await loginPage.expectUserLoginOutput(standardUser.username);    
    await catalogPage.openBurgerMenu();
    await catalogPage.logout();
    await loginPage.expectMainLoginPage();
});

test('Login Feature - Login Negative Path -Incorrect Password Scenario', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(standardUser.username, "password1234"); 
    await loginPage.expectErrorMessage('Epic sadface: Username and password do not match any user in this service');
});
   