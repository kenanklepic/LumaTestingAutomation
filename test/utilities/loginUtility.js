const { expect } = require('@wdio/globals')
const LoginPage = require('../pageObjects/loginPage')
const HomePage = require('../pageObjects/homePage')

class LoginUtility {

    async inputLoginDetails(email, password) {

        await LoginPage.login(email, password);
    }

    async checkLoginDetails(email, password) {

        await LoginPage.checkLoginDetails(email, password);
    }

    async loginUser(Email, Password) {

        await LoginPage.open()

        await this.inputLoginDetails(Email, Password)
        await this.checkLoginDetails(Email, Password)

        await LoginPage.signInBtn.checkIfElementIsExisting();
        await LoginPage.signInBtn.click()
    }
}

module.exports = new LoginUtility();