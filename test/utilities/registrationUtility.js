const { expect } = require('@wdio/globals')
const RegistrationPage = require('../pageObjects/registrationPage')
const AccountPage = require('../pageObjects/accountPage')

class RegistrationUtility {

    async inputRegistrationDetails(FirstName, LastName, Email, Password, ConfirmPassword) {

        await RegistrationPage.open() 
        //await expect(RegistrationPage.pageTitle).toHaveTextContaining('Create New Customer Account')
        await RegistrationPage.pageTitle.checkIfElementIsExisting();
        await RegistrationPage.register(FirstName, LastName, Email, Password, ConfirmPassword) //functions enters credentials into appropriate fields

    }

    async checkRegistrationDetails(FirstName, LastName, Email, Password, ConfirmPassword) {

        expect (await RegistrationPage.inputFistName.getElementValue()).toEqual(FirstName)
        expect (await RegistrationPage.inputLastName.getElementValue()).toEqual(LastName)
        expect (await RegistrationPage.inputEmail.getElementValue()).toEqual(Email)
        expect (await RegistrationPage.inputPassword.getElementValue()).toEqual(Password)
        expect (await RegistrationPage.inputConfirmPassword.getElementValue()).toEqual(ConfirmPassword)

    }

    async checkRegistration() {
        await expect(AccountPage.successMessage).toBeExisting()
        await expect(AccountPage.successMessage).toHaveTextContaining('Thank you for registering with Main Website Store.')
    }

    async registerUser(FirstName, LastName, Email, Password, ConfirmPassword) {
        await this.inputRegistrationDetails(FirstName, LastName, Email, Password, ConfirmPassword)

        await this.checkRegistrationDetails(FirstName, LastName, Email, Password, ConfirmPassword)
    
        await RegistrationPage.btnSubmit.click() //click registration button
    
        await this.checkRegistration()
    
        await AccountPage.actionSwitchBtn.click()
        await AccountPage.signOutBtn.click()
    }
}

module.exports = new RegistrationUtility();