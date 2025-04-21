const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { CataloguePage } = require('../../pages/CataloguePage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutInformationPage } = require('../../pages/CheckoutInformationPage');
const { CheckoutOverviewPage } = require('../../pages/CheckoutOverviewPage');
const { CheckoutCompletePage } = require('../../pages/CheckoutCompletePage');

const users = require('../../test-data/Users'); 
const standardUser = users.find(user => user.username === 'standard_user');

// The expected products are usually retrieved from an API reponse. But for the sake of this test, these are 
// being hardcoded here for assertion purposes.
// In a real-world scenario, you would fetch this data from the API and use it for validation.
const expectedCartProducts = [
    { name: "Sauce Labs Backpack", description: "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.", price: "$29.99" },
    { name: "Sauce Labs Bike Light", description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.", price: "$9.99" }
];

test('Order Feature - The user performs an order successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cataloguePage = new CataloguePage(page);
    const cartPage = new CartPage(page);
    const checkoutInformationPage = new CheckoutInformationPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.goto();
    await loginPage.login(standardUser.username, standardUser.password); 
    
    for (const product of expectedCartProducts) {
        await cataloguePage.clickAddProductButton(product.name);
    }

    await cataloguePage.clickShoppingCartLink();    
    await cartPage.expectCartProductsToBeVisible(expectedCartProducts);
    await cartPage.expectContinueShoppingButtonToBeVisible();
    await cartPage.expectCheckoutButtonToBeVisible();
    await cartPage.clickCheckoutButton();
    await checkoutInformationPage.enterPersonalDetails("John", "Doe", "12345");
    await checkoutInformationPage.clickContinueButton(); 
    await checkoutOverviewPage.validateOverviewProductList(expectedCartProducts);
    await checkoutOverviewPage.expectPaymentInformationVeriofied("SauceCard #31337");
    await checkoutOverviewPage.expectShippingInformationVerified("Free Pony Express Delivery!");
    await checkoutOverviewPage.expectItemTotalVerified(expectedCartProducts);
    await checkoutOverviewPage.expectTaxVerified("Tax: $3.20");
    await checkoutOverviewPage.expectTotalVerified(expectedCartProducts, "Tax: $3.20");
    await checkoutOverviewPage.clickFinishButton();
    await checkoutCompletePage.expectOrderConfirmationImageToBeVisible();
    await checkoutCompletePage.expectOrderConfirmationHeaderToBeVisible();  
    await checkoutCompletePage.expectOrderConfirmationTextToBeVisible();
    await checkoutCompletePage.expectBackHomeButtonToBeVisible();
    await checkoutCompletePage.clickBackHomeButton();
    await cataloguePage.expectCataloguePage();
});