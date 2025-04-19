const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { CatalogPage } = require('../pages/CatalogPage');

const users = require('../test-data/Users'); 
const standardUser = users.find(user => user.username === 'standard_user');

// The expected products are usually retrieved from an API reponse. But for the sake of this test, these are 
// being hardcoded here for assertion purposes.
// In a real-world scenario, you would fetch this data from the API and use it for validation.
const expectedProducts = [
    { name: 'Sauce Labs Backpack', price: '$29.99' },
    { name: 'Sauce Labs Bike Light', price: '$9.99' },
    { name: 'Sauce Labs Bolt T-Shirt', price: '$15.99' },
    { name: 'Sauce Labs Fleece Jacket', price: '$49.99' },
    { name: 'Sauce Labs Onesie', price: '$7.99' },
    { name: 'Test.allTheThings() T-Shirt (Red)', price: '$15.99' }
];

test('Catalog Feature - Products loaded within catalog are verified against api reponse', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const catalogPage = new CatalogPage(page);

    await loginPage.goto();
    await loginPage.login(standardUser.username, standardUser.password); 
    await loginPage.expectUserLoginOutput(standardUser.username);    
    await catalogPage.validateProductList(expectedProducts);
});

test('Catalog Feature - Adding or Removing Products to cart will increase or decrease number of items in cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const catalogPage = new CatalogPage(page);

    await loginPage.goto();
    await loginPage.login(standardUser.username, standardUser.password); 
    await loginPage.expectUserLoginOutput(standardUser.username);    
    await catalogPage.expectShoppingCartToBeEmpty();
    await catalogPage.clickBackpackAddCart();
    await catalogPage.expectShoppingCartToHaveItems(1);
    await catalogPage.expectBackPackRemoveCartButtonToBeVisible();
    await catalogPage.clickBikeLightAddCart();
    await catalogPage.expectShoppingCartToHaveItems(2);
    await catalogPage.expectBikeLightRemoveCartButtonToBeVisible();
    await catalogPage.clickTShirtAddCart();
    await catalogPage.expectShoppingCartToHaveItems(3);
    await catalogPage.expectTShirtRemoveCartButtonToBeVisible();
    await catalogPage.clickBackpackRemoveCart();
    await catalogPage.expectShoppingCartToHaveItems(2);
    await catalogPage.expectBackPackAddCartButtonToBeVisible();
    await catalogPage.clickJacketAddCart()
    await catalogPage.expectShoppingCartToHaveItems(3);
    await catalogPage.expectJacketRemoveCartButtonToBeVisible();
    await catalogPage.clickSauceLabsOnesieAddCart();
    await catalogPage.expectShoppingCartToHaveItems(4);
    await catalogPage.expectSauceLabsOnesieRemoveCartButtonToBeVisible();
    await catalogPage.clickAllthingsAddCart()
    await catalogPage.expectShoppingCartToHaveItems(5);
    await catalogPage.expectAllThingsRemoveCartButtonToBeVisible();
    await catalogPage.clickSauceLabsOnesieRemoveCart();
    await catalogPage.expectShoppingCartToHaveItems(4);
    await catalogPage.expectSauceLabsOnesieAddCartButtonToBeVisible();
    await catalogPage.openBurgerMenu();
    await catalogPage.clickResetAppStateLink();
    await catalogPage.closeBurgerMenu();
    await catalogPage.expectShoppingCartToBeEmpty();
});
