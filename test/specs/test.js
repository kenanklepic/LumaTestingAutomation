const { expect } = require('@wdio/globals')
const AccountPage = require('../pageObjects/accountPage')
const HomePage = require('../pageObjects/homePage')
const LoginPage = require('../pageObjects/loginPage')
const ProductPage = require('../pageObjects/productPage')
const ShippingPage = require('../pageObjects/shippingPage')
const PaymentsPage = require('../pageObjects/paymentsPage')
const SuccessPage = require('../pageObjects/successPage')

//function that checks url 
const URLcheck = async (url) => {
    expect(await browser.getUrl()).toContain(url)
};

//function that checks if the value of an element is 0
async function waitForCounterNumberNotZero(element) {
    if ((await element.getText()) === '0') {
        await browser.pause(2000);
    }
}


describe('My shopping ', () => {

    it('should allow the user to purchase products', async () => {

        //enter valid credentials
        let Email = 'pepe@mancity.com';
        let Password = 'Pass123456';
        let Qty = '1';

        await HomePage.open() // open home page
        await URLcheck('https://magento.softwaretestingboard.com/') //checks if the home page was opened

        await expect (HomePage.signUpLink).toBeExisting() //check if the "sign up" button is present
        await HomePage.signUpLink.click() //click "sign up" button 

        //check if the login page was opened
        await URLcheck('https://magento.softwaretestingboard.com/customer/account/login/')

        await LoginPage.login(Email, Password) //enter credentials

        //check if the credentials were entered
        expect (await LoginPage.inputEmail.getValue()).toEqual(Email)
        expect (await LoginPage.inputPassword.getValue()).toEqual(Password)

        //check and click the sign up button
        await expect (LoginPage.signInBtn).toBeExisting()
        await LoginPage.signInBtn.click()

        //check if login was successful
        await expect(HomePage.welcomeMessage).toBeExisting()


        await browser.pause(200)
        await HomePage.productAtIndex(0).click() //select a product

        await ProductPage.addToCart(Qty) //choose options for the product

        //check if the options were selected
        expect (await ProductPage.sizeBtn.getAttribute('aria-checked')).toEqual('true')
        expect (await ProductPage.colorBtn.getAttribute('aria-checked')).toEqual('true')
        expect (await ProductPage.qtyInputField.getValue()).toEqual(Qty)

        await ProductPage.addToCartBtn.click()

        //check if adding to cart was successful
        await expect(ProductPage.successMessage).toBeExisting()

        //check items in cart
        await waitForCounterNumberNotZero(ProductPage.counterNumber)
        await expect(await ProductPage.counterNumber.getText()).not.toEqual('0')
        
        await ProductPage.cartBtn.click()
        expect (await ProductPage.cartBtn.getAttribute('class')).toEqual('action showcart active')

        await ProductPage.proceedToCheckoutBtn.click()

        await browser.pause(5000)
        await URLcheck('https://magento.softwaretestingboard.com/checkout/#shipping') //check if the shipping page was opened
        
        await ShippingPage.nextBtn.click()


        await browser.pause(5000)
        await URLcheck('https://magento.softwaretestingboard.com/checkout/#payment') //chekc if the payments page was opened

        await PaymentsPage.placeOrderBtn.click()

        await browser.pause(5000)

        //check if the purchase was successsful
        await expect(SuccessPage.successfulPurchaseMessage).toHaveTextContaining('Thank you for your purchase!')

    })


})