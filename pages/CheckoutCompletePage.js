const { expect } = require('@playwright/test');

exports.CheckoutCompletePage = class CheckoutCompletePage {
    constructor(page) {
        this.page = page;
        this.burgerMenuButton = page.locator('button[id="react-burger-menu-btn"]');
        this.closeMenuButton = page.locator('button[id="react-burger-cross-btn"]');
        this.AllItemsMenuLink = page.locator('a[data-test="inventory-sidebar-link"]');
        this.AboutMenuLink = page.locator('a[data-test="about-sidebar-link"]');
        this.LogoutMenuLink = page.locator('a[data-test="logout-sidebar-link"]');
        this.ResetAppStateMenuLink = page.locator('a[data-test="reset-sidebar-link"]');  
        this.OrderConfirmationImage = page.locator('img[class="pony-express"]');
        this.OrderConfirmationHeader = page.locator('h2[data-test="complete-header"]');
        this.OrderConfirmationText = page.locator('h2[data-test="complete-text"]');
        this.BackHomeButton =  page.locator('button[data-test="back-to-products"]'); 
    }
  
    async openBurgerMenu() {
        await this.burgerMenuButton.click();
    }

    async closeBurgerMenu() {
        await this.closeMenuButton.click();
    }    

    async expectOrderConfirmationImageToBeVisible() {
        await this.OrderConfirmationImage.waitFor({ state: 'visible' });
        const isVisible = await this.OrderConfirmationImage.isVisible();
        expect(isVisible).toBeTruthy();
    }    

    async expectOrderConfirmationHeaderToBeVisible() {
        await this.OrderConfirmationHeader.waitFor({ state: 'visible' });
        const isVisible = await this.OrderConfirmationHeader.isVisible();
        expect(isVisible).toBeTruthy();
    }    

    async expectOrderConfirmationTextToBeVisible() {
        await this.OrderConfirmationText.waitFor({ state: 'visible' });
        const isVisible = await this.OrderConfirmationText.isVisible();
        expect(isVisible).toBeTruthy();
    }    

    async expectBackHomeButtonToBeVisible() {
        await this.FinishButton.waitFor({ state: 'visible' });
        const isVisible = await this.FinishButton.isVisible();
        expect(isVisible).toBeTruthy();
    }      

    async clickBackHomeButton() {
        await this.BackHomeButton.click();
    }

    
};