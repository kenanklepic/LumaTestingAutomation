const { expect } = require('@wdio/globals')
const RegistrationPage = require('../pageObjects/registrationPage')
const AccountPage = require('../pageObjects/accountPage')

class RegistrationMethod {

    //method that class all other registration methods

    async inputRegistrationDetails(FirstName, LastName, Email, Password, ConfirmPassword) {

        await RegistrationPage.open() //open registration page
        await expect(RegistrationPage.pageTitle).toHaveTextContaining('Create New Customer Account') //check if account page was opened

        await RegistrationPage.register(FirstName, LastName, Email, Password, ConfirmPassword) //functions enters credentials into appropriate fields

    }

    async checkRegistrationDetails(FirstName, LastName, Email, Password, ConfirmPassword) {

        expect (await RegistrationPage.inputFistName.getValue()).toEqual(FirstName)
        expect (await RegistrationPage.inputLastName.getValue()).toEqual(LastName)
        expect (await RegistrationPage.inputEmail.getValue()).toEqual(Email)
        expect (await RegistrationPage.inputPassword.getValue()).toEqual(Password)
        expect (await RegistrationPage.inputConfirmPassword.getValue()).toEqual(ConfirmPassword)

    }

    async checkRegistration() {
        await expect(AccountPage.successMessage).toBeExisting()
        await expect(AccountPage.successMessage).toHaveTextContaining('Thank you for registering with Main Website Store.')
    }



}

module.exports = new RegistrationMethod();