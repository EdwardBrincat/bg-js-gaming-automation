const { expect } = require('@playwright/test');
const ProductModel = require('../models/ProductModel');

exports.CatalogPage = class CatalogPage {
    constructor(page) {
        this.page = page;
        this.burgerMenuButton = page.locator('button[id="react-burger-menu-btn"]');
        this.closeMenuButton = page.locator('button[id="react-burger-cross-btn"]');
        this.AllItemsMenuLink = page.locator('a[data-test="inventory-sidebar-link"]');
        this.AboutMenuLink = page.locator('a[data-test="about-sidebar-link"]');
        this.LogoutMenuLink = page.locator('a[data-test="logout-sidebar-link"]');
        this.ResetAppStateMenuLink = page.locator('a[data-test="reset-sidebar-link"]');
        this.BackpackAddCart = page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]');
        this.BackpackRemoveCart = page.locator('button[data-test="remove-sauce-labs-backpack"]');
        this.BikeLightAddCart = page.locator('button[data-test="add-to-cart-sauce-labs-bike-light"]');
        this.BikeLightRemoveCart = page.locator('button[data-test="remove-sauce-labs-bike-light"]');
        this.TShirtAddCart = page.locator('button[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
        this.TShirtRemoveCart = page.locator('button[data-test="remove-sauce-labs-bolt-t-shirt"]');
        this.JacketAddCart = page.locator('button[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
        this.JacketRemoveCart = page.locator('button[data-test="remove-sauce-labs-fleece-jacket"]');
        this.SauceLabsOnesieAddCart = page.locator('button[data-test="add-to-cart-sauce-labs-onesie"]');
        this.SauceLabsOnesieRemoveCart = page.locator('button[data-test="remove-sauce-labs-onesie"]');
        this.AllthingsAddCart = page.locator('button[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]');
        this.AllThingsRemoveCart = page.locator('button[data-test="remove-test.allthethings()-t-shirt-(red)"]');
        this.ShoppingcartBadge = page.locator('span[data-test="shopping-cart-badge"]');        
    }
  
    async openBurgerMenu() {
        await this.burgerMenuButton.click();
    }

    async closeBurgerMenu() {
        await this.closeMenuButton.click();
      }
  
    async clickLogoutLink() {
      await this.LogoutMenuLink.click();
    }

    async clickResetAppStateLink() {
        await this.ResetAppStateMenuLink.click();
      }

    async getProductDetails() {
        const productList = [];
    
        const elements = await this.page.locator('[data-test="inventory-item"]').elementHandles();
    
        for (const elementHandle of elements) {
            const imageHandle = await elementHandle.$('.inventory_item_img');
            const imageUrl = await imageHandle?.getAttribute('src');
    
            const nameHandle = await elementHandle.$('.inventory_item_name');
            const nameText = await nameHandle?.innerText();
    
            const descHandle = await elementHandle.$('.inventory_item_desc');
            const descText = await descHandle?.innerText();
    
            const priceHandle = await elementHandle.$('.inventory_item_price');
            const priceText = await priceHandle?.innerText();
    
            const product = new ProductModel(nameText, descText, priceText, imageUrl);
            productList.push(product);
        }
    
        return productList;
    }

    async validateProductList(expectedProducts) {
        const actualProducts = await this.getProductDetails();

        for (let i = 0; i < expectedProducts.length; i++) {
            expect(actualProducts[i].name).toBe(expectedProducts[i].name);
            expect(actualProducts[i].price).toBe(expectedProducts[i].price);
        }
    }

    async expectShoppingCartToBeEmpty() {
        await this.page.waitForLoadState('load');  
        const isVisible = await this.ShoppingcartBadge.isVisible();
        expect(isVisible).toBeFalsy();
    }

    async expectShoppingCartToHaveItems(numberOfItems) {
        await this.page.waitForLoadState('load');  
        const isVisible = await this.ShoppingcartBadge.isVisible();
        expect(isVisible).toBeTruthy();
        const cartCount = await this.ShoppingcartBadge.innerText();
        expect(cartCount).toBe(numberOfItems.toString());
    }

    async clickBackpackAddCart() {        
        await this.BackpackAddCart.click();
    }    

    async clickBackpackRemoveCart() {        
        await this.BackpackRemoveCart.click();
    }

    async expectBackPackAddCartButtonToBeVisible() {
        await this.BackpackAddCart.waitFor({ state: 'visible' });
        const isVisible = await this.BackpackAddCart.isVisible();
        expect(isVisible).toBeTruthy();
    }

    async expectBackPackRemoveCartButtonToBeVisible() {
        await this.BackpackRemoveCart.waitFor({ state: 'visible' });
        const isVisible = await this.BackpackRemoveCart.isVisible();
        expect(isVisible).toBeTruthy();
    }
    
    async clickBikeLightAddCart() {        
        await this.BikeLightAddCart.click();
    }  

    async clickBikeLightRemoveCart() {        
        await this.BikeLightRemoveCart.click();
    }

    async expectBikeLightAddCartButtonToBeVisible() {
        await this.BikeLightAddCart.waitFor({ state: 'visible' });
        const isVisible = await this.BikeLightAddCart.isVisible();
        expect(isVisible).toBeTruthy();
    }

    async expectBikeLightRemoveCartButtonToBeVisible() {
        await this.BikeLightRemoveCart.waitFor({ state: 'visible' });
        const isVisible = await this.BikeLightRemoveCart.isVisible();
        expect(isVisible).toBeTruthy();
    }

    async clickTShirtAddCart() {        
        await this.TShirtAddCart.click();
    }    

    async clickTShirtRemoveCart() {        
        await this.TShirtRemoveCart.click();
    }

    async expectTShirtAddCartButtonToBeVisible() {
        await this.TShirtAddCart.waitFor({ state: 'visible' });
        const isVisible = await this.TShirtAddCart.isVisible();
        expect(isVisible).toBeTruthy();
    }

    async expectTShirtRemoveCartButtonToBeVisible() {
        await this.TShirtRemoveCart.waitFor({ state: 'visible' });
        const isVisible = await this.TShirtRemoveCart.isVisible();
        expect(isVisible).toBeTruthy();
    }

    async clickJacketAddCart() {        
        await this.JacketAddCart.click();
    }    

    async clickJacketRemoveCart() {        
        await this.JacketRemoveCart.click();
    }

    async expectJacketAddCartButtonToBeVisible() {
        await this.JacketAddCart.waitFor({ state: 'visible' });
        const isVisible = await this.JacketAddCart.isVisible();
        expect(isVisible).toBeTruthy();
    }

    async expectJacketRemoveCartButtonToBeVisible() {
        await this.JacketRemoveCart.waitFor({ state: 'visible' });
        const isVisible = await this.JacketRemoveCart.isVisible();
        expect(isVisible).toBeTruthy();
    }

    async clickSauceLabsOnesieAddCart() {        
        await this.SauceLabsOnesieAddCart.click();
    }   

    async clickSauceLabsOnesieRemoveCart() {        
        await this.SauceLabsOnesieRemoveCart.click();
    }

    async expectSauceLabsOnesieAddCartButtonToBeVisible() {
        await this.SauceLabsOnesieAddCart.waitFor({ state: 'visible' });
        const isVisible = await this.SauceLabsOnesieAddCart.isVisible();
        expect(isVisible).toBeTruthy();
    }

    async expectSauceLabsOnesieRemoveCartButtonToBeVisible() {
        await this.SauceLabsOnesieRemoveCart.waitFor({ state: 'visible' });
        const isVisible = await this.SauceLabsOnesieRemoveCart.isVisible();
        expect(isVisible).toBeTruthy();
    }

    async clickAllthingsAddCart() {        
        await this.AllthingsAddCart.click();
    }   

    async clickAllThingsRemoveCart() {        
        await this.AllThingsRemoveCart.click();
    }

    async expectAllThingsAddCartButtonToBeVisible() {
        await this.AllthingsAddCart.waitFor({ state: 'visible' });
        const isVisible = await this.AllthingsAddCart.isVisible();
        expect(isVisible).toBeTruthy();
    }

    async expectAllThingsRemoveCartButtonToBeVisible() {
        await this.AllThingsRemoveCart.waitFor({ state: 'visible' });
        const isVisible = await this.AllThingsRemoveCart.isVisible();
        expect(isVisible).toBeTruthy();
    }
};