const { $ } = require('@wdio/globals')
const Page = require('./page');

class ProductPage extends Page {

    get sizeBtn() {
        return $('.swatch-option.text');
    }

    get colorBtn() {
        return $('.swatch-option.color');
    }

    get qtyInputField() {
        return $('#qty');
    }

    get addToCartBtn() {
        return $('#product-addtocart-button');
    }

    get successMessage(){
        return $('.messages');
    }

    get cartBtn () {
        return $('.action.showcart')
    }

    get proceedToCheckoutBtn() {
        return $('#top-cart-btn-checkout')
    }

    get counterNumber() {
        return $('.counter.qty .counter-number')
    }

    /*async addToCart(qty) {
        await this.sizeBtn.click();
        await this.colorBtn.click();
        await this.qtyInputField.setValue(qty);
    }*/

}

module.exports = new ProductPage();