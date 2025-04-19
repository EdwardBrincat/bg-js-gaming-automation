const { expect } = require('@playwright/test');
const CartProductModel = require('../models/CartProductModel');

exports.CheckoutOverviewPage = class CheckoutOverviewPage {
    constructor(page) {
        this.page = page;
        this.burgerMenuButton = page.locator('button[id="react-burger-menu-btn"]');
        this.closeMenuButton = page.locator('button[id="react-burger-cross-btn"]');
        this.AllItemsMenuLink = page.locator('a[data-test="inventory-sidebar-link"]');
        this.AboutMenuLink = page.locator('a[data-test="about-sidebar-link"]');
        this.LogoutMenuLink = page.locator('a[data-test="logout-sidebar-link"]');
        this.ResetAppStateMenuLink = page.locator('a[data-test="reset-sidebar-link"]');  
        this.PaymentInformationText = page.locator('div[data-test="payment-info-value"]');   
        this.ShippingInformationText = page.locator('div[data-test="shipping-info-value"]');
        this.ItemTotalText = page.locator('div[data-test="subtotal-label"]');
        this.TaxText = page.locator('div[data-test="tax-label"]');
        this.TotalText = page.locator('div[data-test="total-label"]');
        this.CancelButton = page.locator('button[data-test="cancel"]'); 
        this.FinishButton =  page.locator('button[data-test="finish"]'); 
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

    async expectFinishButtonToBeVisible() {
        await this.FinishButton.waitFor({ state: 'visible' });
        const isVisible = await this.FinishButton.isVisible();
        expect(isVisible).toBeTruthy();
    }    

    async clickCancelButton() {
        await this.CancelButton.click();
    }

    async clickFinishButton() {
        await this.FinishButton.click();
    }

    async getOverviewProductDetails() {
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

    async validateOverviewProductList(expectedOverviewProducts) {
        const actualOverviewProducts = await this.getOverviewProductDetails();

        for (let i = 0; i < expectedOverviewProducts.length; i++) {
            expect(actualOverviewProducts[i].name).toBe(expectedOverviewProducts[i].name);
            expect(actualOverviewProducts[i].price).toBe(expectedOverviewProducts[i].price);
        }
    }

    async expectPaymentInformationVeriofied(payment) {
        const paymentInformationText = await this.PaymentInformationText?.innerText();
        await expect(paymentInformationText).toBe(payment); 
    }

    async expectShippingInformationVerified(shipping) {
        const shippingInformationText = await this.ShippingInformationText?.innerText();
        await expect(shippingInformationText).toBe(shipping); 
    }

    async expectItemTotalVerified(expectedCartProducts) {
        const totalAmount = expectedCartProducts.reduce((sum, item) => {
            return sum + parseFloat(item.price.replace('$', ''));
        }, 0);

        const expectedText = `Item total: $${totalAmount.toFixed(2)}`;
        const itemTotalText = await this.ItemTotalText?.innerText();
        await expect(itemTotalText).toBe(expectedText);
    }

    async expectTaxVerified(tax) {
        const taxText = await this.TaxText?.innerText();
        await expect(taxText).toBe(tax); 
    }

    async expectTotalVerified(expectedCartProducts,tax ) {
        const totalAmount = expectedCartProducts.reduce((sum, item) => {
            return sum + parseFloat(item.price.replace('$', ''));
        }, 0);        
        const taxAmount = parseFloat(tax.replace('Tax: $', ''));
        const total = (totalAmount + taxAmount).toFixed(2);
        const expectedText = `Total: $${total}`;        
        const totalText = await this.TotalText?.innerText();
        await expect(totalText).toBe(expectedText); 
    }
};