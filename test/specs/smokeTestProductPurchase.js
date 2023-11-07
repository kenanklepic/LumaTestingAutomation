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

//enter credentials
const FirstName = 'Enter Value';
const LastName = 'Enter Value';
const Email = 'Enter Value';
const Password = 'Enter Value';
const ConfirmPassword = 'Enter Value';

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

        await RegistrationPage.open() //open registration page
        await expect(RegistrationPage.pageTitle).toHaveTextContaining('Create New Customer Account') //check if account page was opened

        await RegistrationPage.register(FirstName, LastName, Email, Password, ConfirmPassword) //functions enters credentials into appropriate fields

        //checks if the values were inputted into appropriate fields
        expect (await RegistrationPage.inputFistName.getValue()).toEqual(FirstName)
        expect (await RegistrationPage.inputLastName.getValue()).toEqual(LastName)
        expect (await RegistrationPage.inputEmail.getValue()).toEqual(Email)
        expect (await RegistrationPage.inputPassword.getValue()).toEqual(Password)
        expect (await RegistrationPage.inputConfirmPassword.getValue()).toEqual(ConfirmPassword)

        await RegistrationPage.btnSubmit.click() //click registration button

        //checks if the registration was successful
        await expect(AccountPage.successMessage).toBeExisting()
        await expect(AccountPage.successMessage).toHaveTextContaining('Thank you for registering with Main Website Store.')

        await AccountPage.actionSwitchBtn.click()
        await AccountPage.signOutBtn.click()

}


describe('My smoke test - product pruchase ', () => {

    beforeAll(async() => {
        await Registration();
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

        await LoginPage.login(Email, Password) //enter credentials

        //check if the credentials were entered
        expect (await LoginPage.inputEmail.getValue()).toEqual(Email)
        expect (await LoginPage.inputPassword.getValue()).toEqual(Password)

        //check and click the sign up button
        await expect (LoginPage.signInBtn).toBeExisting()
        await LoginPage.signInBtn.click()

        //check if login was successful
        await expect(HomePage.welcomeMessage).toBeExisting()


        await browser.pause(500)
        await HomePage.searchBar.setValue(SearchValue)
        await expect (await HomePage.searchBar.getValue()).toEqual(SearchValue)
        await expect (HomePage.searchBtn).toBeExisting()
        await HomePage.searchBtn.click()

        await browser.pause(200)
        await SearchPage.productAtIndex(0).click()

        await ProductPage.addToCart(Qty) //choose options for the product

        //check if the options were selected
        expect (await ProductPage.sizeBtn.getAttribute('aria-checked')).toEqual('true')
        expect (await ProductPage.colorBtn.getAttribute('aria-checked')).toEqual('true')
        expect (await ProductPage.qtyInputField.getValue()).toEqual(Qty)

        await ProductPage.addToCartBtn.click()

        //check if adding to cart was successful
        await expect(ProductPage.successMessage).toBeExisting()

        //check items in cart
        await waitForCounterNumberNotToBeZero(ProductPage.counterNumber)
        await expect(await ProductPage.counterNumber.getText()).not.toEqual('0')
        
        await ProductPage.cartBtn.click()
        expect (await ProductPage.cartBtn.getAttribute('class')).toEqual('action showcart active')

        await ProductPage.proceedToCheckoutBtn.click()

        await browser.pause(6000)
        await URLcheck('https://magento.softwaretestingboard.com/checkout/#shipping') //check if the shipping page was opened


        await ShippingPage.open()
        await ShippingPage.inputShippingDetails(streetAddress, city, postalCode, phoneNum)
        expect (await ShippingPage.InputStreetAddress.getValue()).toEqual(streetAddress)
        expect (await ShippingPage.InputCity.getValue()).toEqual(city)
        expect (await ShippingPage.InputPostalCode.getValue()).toEqual(postalCode)
        expect (await ShippingPage.InputPhoneNumber.getValue()).toEqual(phoneNum)
        expect (await ShippingPage.checkboxShippingMethod.getAttribute('checked')).toEqual('true')
        //await browser.pause(10000)

        
        await ShippingPage.nextBtn.click()


        await browser.pause(5000)
        await URLcheck('https://magento.softwaretestingboard.com/checkout/#payment') //chekc if the payments page was opened

        await PaymentsPage.placeOrderBtn.click()

        await browser.pause(5000)

        //check if the purchase was successsful
        await expect(SuccessPage.successfulPurchaseMessage).toHaveTextContaining('Thank you for your purchase!')

    })


})