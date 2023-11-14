const { expect } = require('@wdio/globals')
const RegistrationPage = require('../pageObjects/registrationPage')
const AccountPage = require('../pageObjects/accountPage')

describe('My registartion', () => {

    it('should create an account with valid credentials', async () => {

        //enter valid credentials
        let FirstName = 'Enter Name';
        let LastName = 'Enter Last Name';
        let Email = 'Enter Email';
        let Password = 'Enter Password';
        let ConfirmPassword = 'Enter Password';

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


    })

    /*it('should not create an account with used email', async () => {

        //enter valid credentials
        let FirstName = 'Enter Name';
        let LastName = 'Enter Password';
        let Email = 'Enter Email';
        let Password = 'Enter Password';
        let ConfirmPassword = 'Enter Password';

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

        //check if the error message appears
        await expect(RegistrationPage.message).toBeExisting()
    })*/
})