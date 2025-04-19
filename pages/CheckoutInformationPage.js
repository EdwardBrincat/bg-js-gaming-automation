const { expect } = require('@playwright/test');

exports.CheckoutInformationPage = class CheckoutInformationPage {
    constructor(page) {
        this.page = page;
        this.burgerMenuButton = page.locator('button[id="react-burger-menu-btn"]');
        this.closeMenuButton = page.locator('button[id="react-burger-cross-btn"]');
        this.AllItemsMenuLink = page.locator('a[data-test="inventory-sidebar-link"]');
        this.AboutMenuLink = page.locator('a[data-test="about-sidebar-link"]');
        this.LogoutMenuLink = page.locator('a[data-test="logout-sidebar-link"]');
        this.ResetAppStateMenuLink = page.locator('a[data-test="reset-sidebar-link"]');     
        this.FirstnameInput = page.locator('input[data-test="firstName"]'); 
        this.LastnameInput = page.locator('input[data-test="lastName"]'); 
        this.PostalCodeInput = page.locator('input[data-test="postalCode"]'); 
        this.CancelButton = page.locator('input[data-test="cancel"]'); 
        this.ContinueButton =  page.locator('input[data-test="continue"]'); 
    }
  
    async openBurgerMenu() {
        await this.burgerMenuButton.click();
    }

    async closeBurgerMenu() {
        await this.closeMenuButton.click();
    }    
    
    async expectCancelButtonToBeVisible() {
        await this.CancelButton.waitFor({ state: 'visible' });
        const isVisible = await this.CancelButton.isVisible();
        expect(isVisible).toBeTruthy();
    }

    async expectContinueButtonToBeVisible() {
        await this.ContinueButton.waitFor({ state: 'visible' });
        const isVisible = await this.ContinueButton.isVisible();
        expect(isVisible).toBeTruthy();
    }    

    async clickCancelButton() {
        await this.CancelButton.click();
    }

    async clickContinueButton() {
        await this.ContinueButton.click();
    }

    async enterPersonalDetails(firstname, lastname, postalCode) {
        await this.FirstnameInput.fill(firstname);
        await this.LastnameInput.fill(lastname);
        await this.PostalCodeInput.fill(postalCode);
      }
};