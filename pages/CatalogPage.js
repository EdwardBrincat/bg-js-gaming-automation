const { expect } = require('@playwright/test');

exports.CatalogPage = class CatalogPage {
    constructor(page) {
        this.page = page;
        this.burgerMenuButton = page.locator('button[id="react-burger-menu-btn"]');
        this.closeMenuButton = page.locator('button[id="react-burger-cross-btn"]');
        this.AllItemsMenuLink = page.locator('a[data-test="inventory-sidebar-link"]');
        this.AboutMenuLink = page.locator('a[data-test="about-sidebar-link"]');
        this.LogoutMenuLink = page.locator('a[data-test="logout-sidebar-link"]');
        this.ResetAppStateMenuLink = page.locator('a[data-test="reset-sidebar-link"]');
        this.BackpackAddCart = page.locator('button[add-to-cart-sauce-labs-backpack""]');
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
        this.ShoppingcartBadge = page.locator('span[data-test="shopping_cart_badge"]');        
    }
  
    async openBurgerMenu() {
        await this.burgerMenuButton.click();
      }
  
    async logout() {
      await this.LogoutMenuLink.click();
    }
};