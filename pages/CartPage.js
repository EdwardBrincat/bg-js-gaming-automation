const { expect } = require('@playwright/test');
const CartProductModel = require('../models/CartProductModel');

exports.CartPage = class CartPage {
    constructor(page) {
        this.page = page;
        this.burgerMenuButton = page.locator('button[id="react-burger-menu-btn"]');
        this.closeMenuButton = page.locator('button[id="react-burger-cross-btn"]');
        this.AllItemsMenuLink = page.locator('a[data-test="inventory-sidebar-link"]');
        this.AboutMenuLink = page.locator('a[data-test="about-sidebar-link"]');
        this.LogoutMenuLink = page.locator('a[data-test="logout-sidebar-link"]');
        this.ResetAppStateMenuLink = page.locator('a[data-test="reset-sidebar-link"]');     
        this.ContinueShoppingButton = page.locator('button[data-test="continue-shopping"]'); 
        this.CheckoutButton =  page.locator('button[data-test="checkout"]'); 
    }
  
    async openBurgerMenu() {
        await this.burgerMenuButton.click();
    }

    async closeBurgerMenu() {
        await this.closeMenuButton.click();
    }

    async expectNumberOfCartItemsToBeVerified(numberOfItems) {
            
        const cartItems = await this.page.locator('[data-test="inventory-item"]').elementHandles();
        const count = await cartItems.count();
        expect(count).toBe(numberOfItems);
    }
    
    async expectContinueShoppingButtonToBeVisible() {
        await this.ContinueShoppingButton.waitFor({ state: 'visible' });
        const isVisible = await this.ContinueShoppingButton.isVisible();
        expect(isVisible).toBeTruthy();
    }

    async expectCheckoutButtonToBeVisible() {
        await this.CheckoutButton.waitFor({ state: 'visible' });
        const isVisible = await this.CheckoutButton.isVisible();
        expect(isVisible).toBeTruthy();
    }

    async getCartProductDetails() {
        const productList = [];
    
        const elements = await this.page.locator('[data-test="inventory-item"]').elementHandles();
    
        for (const elementHandle of elements) {            
            const nameHandle = await elementHandle.$('.inventory_item_name');
            const nameText = await nameHandle?.innerText();
    
            const descHandle = await elementHandle.$('.inventory_item_desc');
            const descText = await descHandle?.innerText();

            const priceHandle = await elementHandle.$('.inventory_item_price');
            const priceText = await priceHandle?.innerText();
    
            const product = new CartProductModel(nameText, descText, priceText);
            productList.push(product);
        }
    
        return productList;
    }

    async validateProductList(expectedCartProducts) {
        const actualCartProducts = await this.getCartProductDetails();

        for (let i = 0; i < expectedProducts.length; i++) {
            expect(actualProducts[i].name).toBe(expectedProducts[i].name);
            expect(actualProducts[i].price).toBe(expectedProducts[i].price);
        }
    }

    async clickContinueShoppingButton() {
        await this.ContinueShoppingButton.click();
    }

    async clickCheckoutButton() {
        await this.CheckoutButton.click();
    }

    async clickRemoveProductButton(product) {
        const elements = await this.page.locator('[data-test="inventory-item"]').elementHandles();
    
        for (const elementHandle of elements) {            
            const nameHandle = await elementHandle.$('.inventory_item_name');
            const nameText = await nameHandle?.innerText();
            if(nameText === product.name) {
                const removeButton = await elementHandle.$('button'); 
                if (removeButton) {
                    await removeButton.click();
                }
                break;
            }           
        }
    }
};