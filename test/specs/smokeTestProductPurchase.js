const { expect } = require('@wdio/globals')
const AccountPage = require('../pageObjects/accountPage')
const HomePage = require('../pageObjects/homePage')
const LoginPage = require('../pageObjects/loginPage')
const ProductPage = require('../pageObjects/productPage')
const ShippingPage = require('../pageObjects/shippingPage')
const PaymentsPage = require('../pageObjects/paymentsPage')
const SuccessPage = require('../pageObjects/successPage')
const RegistrationPage = require('../pageObjects/registrationPage')
const SearchPage = require('../pageObjects/searchPage')
const RegistrationMethod = require('../utilities/registrationMethod')
const LoginMethod = require('../utilities/loginMethod')
const ShippingMethod = require('../utilities/shippingMethod')
const AddToCartMethod = require('../utilities/addToCartMethod')

//enter credentials
const FirstName = 'Josko';
const LastName = 'G';
const Email = 'gva13@jos.com';
const Password = 'Enter1Value';
const ConfirmPassword = 'Enter1Value';

//function that checks url 
const URLcheck = async (url) => {
    expect(await browser.getUrl()).toContain(url)
};

//function that checks if the value of an element is 0
async function waitForCounterNumberNotToBeZero(element) {
    if ((await element.getText()) === '0') {
        await browser.pause(2000);
    }
}

async function Registration() {

    await RegistrationMethod.inputRegistrationDetails(FirstName, LastName, Email, Password, ConfirmPassword)

    await RegistrationMethod.checkRegistrationDetails(FirstName, LastName, Email, Password, ConfirmPassword)

    await RegistrationPage.btnSubmit.click() //click registration button

    await RegistrationMethod.checkRegistration()

    await AccountPage.actionSwitchBtn.click()
    await AccountPage.signOutBtn.click()

}


describe('My smoke test - product pruchase ', () => {

    beforeAll(async() => {
        await Registration();
        //call reg method 
    });

    it('should allow the user to register, log in, search for a product, select a product, add product to cart and finalize the checkout with successful purchase', async () => {

        //enter valid credentials
        let Qty = '1';
        let streetAddress = 'Enter Value';
        let city = 'Enter Value';
        let postalCode = 'Enter Value';
        let phoneNum = 'Enter Value';
        let SearchValue = 'Yoga';

        await HomePage.open() // open home page
        await URLcheck('https://magento.softwaretestingboard.com/') //checks if the home page was opened

        await expect (HomePage.signUpLink).toBeExisting() //check if the "sign up" button is present
        await HomePage.signUpLink.click() //click "sign up" button 

        //check if the login page was opened
        await URLcheck('https://magento.softwaretestingboard.com/customer/account/login/')

        /*await LoginPage.login(Email, Password) //enter credentials
        //check if the credentials were entered
        expect (await LoginPage.inputEmail.getValue()).toEqual(Email)
        expect (await LoginPage.inputPassword.getValue()).toEqual(Password)*/

        //Login
        await LoginMethod.inputLoginDetails(Email, Password)
        await LoginMethod.checkLoginDetails(Email, Password)
        await expect (LoginPage.signInBtn).toBeExisting()
        await LoginPage.signInBtn.click()
        await expect(HomePage.welcomeMessage).toBeExisting()


        await browser.pause(500)
        await HomePage.searchBar.setValue(SearchValue)
        await expect (await HomePage.searchBar.getValue()).toEqual(SearchValue)
        await expect (HomePage.searchBtn).toBeExisting()
        await HomePage.searchBtn.click()

        await browser.pause(2000)
        await SearchPage.productAtIndex(0).click()
        await browser.pause(10000)

        /*await ProductPage.addToCart(Qty) //choose options for the product
        expect (await ProductPage.sizeBtn.getAttribute('aria-checked')).toEqual('true')
        expect (await ProductPage.colorBtn.getAttribute('aria-checked')).toEqual('true')
        expect (await ProductPage.qtyInputField.getValue()).toEqual(Qty)*/

        await AddToCartMethod.inputProductDetails(Qty)
        await AddToCartMethod.checkProductDetails(Qty)
        await ProductPage.addToCartBtn.click()
        await expect(ProductPage.successMessage).toBeExisting()

        //check items in cart
        await waitForCounterNumberNotToBeZero(ProductPage.counterNumber)
        //await expect(await ProductPage.counterNumber.getText()).not.toEqual('0')
        
        await ProductPage.cartBtn.click()
        expect (await ProductPage.cartBtn.getAttribute('class')).toEqual('action showcart active')

        await ProductPage.proceedToCheckoutBtn.click()

        await browser.pause(6000)
        await URLcheck('https://magento.softwaretestingboard.com/checkout/#shipping') //check if the shipping page was opened


        await ShippingPage.open()

        /*await ShippingPage.inputShippingDetails(streetAddress, city, postalCode, phoneNum)
        expect (await ShippingPage.InputStreetAddress.getValue()).toEqual(streetAddress)
        expect (await ShippingPage.InputCity.getValue()).toEqual(city)
        expect (await ShippingPage.InputPostalCode.getValue()).toEqual(postalCode)
        expect (await ShippingPage.InputPhoneNumber.getValue()).toEqual(phoneNum)
        expect (await ShippingPage.checkboxShippingMethod.getAttribute('checked')).toEqual('true')
        //await browser.pause(10000)*/

        
        await ShippingPage.open()
        await ShippingMethod.inputShippingDetails(streetAddress, city, postalCode, phoneNum)
        await ShippingMethod.checkShippingDetails(streetAddress, city, postalCode, phoneNum)
        await ShippingPage.nextBtn.click()


        await browser.pause(5000)
        await URLcheck('https://magento.softwaretestingboard.com/checkout/#payment') //chekc if the payments page was opened

        await PaymentsPage.placeOrderBtn.click()

        await browser.pause(5000)

        //check if the purchase was successsful
        await expect(SuccessPage.successfulPurchaseMessage).toHaveTextContaining('Thank you for your purchase!')

    })


})