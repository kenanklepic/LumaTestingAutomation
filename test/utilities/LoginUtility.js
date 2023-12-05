const { expect } = require('@wdio/globals')
const LoginPage = require('../pageObjects/loginPage')

class LoginUtility {

    async inputLoginDetails(email, password) {

        await LoginPage.inputEmail.setValue(email);
        await LoginPage.inputPassword.setValue(password);

    }

    async checkLoginDetails(email, password) {

        expect (await LoginPage.inputEmail.getValue()).toEqual(email)
        expect (await LoginPage.inputPassword.getValue()).toEqual(password)

    }
}

module.exports = new LoginUtility();