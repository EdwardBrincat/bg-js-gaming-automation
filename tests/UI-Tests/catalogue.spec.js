const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { CataloguePage } = require('../../pages/CataloguePage');

const users = require('../../test-data/Users'); 
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

test('Catalogue Feature - Products loaded within catalogue are verified against api reponse', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cataloguePage = new CataloguePage(page);

    await loginPage.goto();
    await loginPage.login(standardUser.username, standardUser.password); 
    await loginPage.expectUserLoginOutput(standardUser.username);    
    await cataloguePage.validateProductList(expectedProducts);
});

test('Catalogue Feature - Adding or Removing Products to cart will increase or decrease number of items in cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cataloguePage = new CataloguePage(page);

    await loginPage.goto();
    await loginPage.login(standardUser.username, standardUser.password); 
    await loginPage.expectUserLoginOutput(standardUser.username);    
    await cataloguePage.expectShoppingCartToBeEmpty();
    await cataloguePage.clickBackpackAddCart();
    await cataloguePage.expectShoppingCartToHaveItems(1);
    await cataloguePage.expectBackPackRemoveCartButtonToBeVisible();
    await cataloguePage.clickBikeLightAddCart();
    await cataloguePage.expectShoppingCartToHaveItems(2);
    await cataloguePage.expectBikeLightRemoveCartButtonToBeVisible();
    await cataloguePage.clickTShirtAddCart();
    await cataloguePage.expectShoppingCartToHaveItems(3);
    await cataloguePage.expectTShirtRemoveCartButtonToBeVisible();
    await cataloguePage.clickBackpackRemoveCart();
    await cataloguePage.expectShoppingCartToHaveItems(2);
    await cataloguePage.expectBackPackAddCartButtonToBeVisible();
    await cataloguePage.clickJacketAddCart()
    await cataloguePage.expectShoppingCartToHaveItems(3);
    await cataloguePage.expectJacketRemoveCartButtonToBeVisible();
    await cataloguePage.clickSauceLabsOnesieAddCart();
    await cataloguePage.expectShoppingCartToHaveItems(4);
    await cataloguePage.expectSauceLabsOnesieRemoveCartButtonToBeVisible();
    await cataloguePage.clickAllthingsAddCart()
    await cataloguePage.expectShoppingCartToHaveItems(5);
    await cataloguePage.expectAllThingsRemoveCartButtonToBeVisible();
    await cataloguePage.clickSauceLabsOnesieRemoveCart();
    await cataloguePage.expectShoppingCartToHaveItems(4);
    await cataloguePage.expectSauceLabsOnesieAddCartButtonToBeVisible();
    await cataloguePage.openBurgerMenu();
    await cataloguePage.clickResetAppStateLink();
    await cataloguePage.closeBurgerMenu();
    await cataloguePage.expectShoppingCartToBeEmpty();
});
