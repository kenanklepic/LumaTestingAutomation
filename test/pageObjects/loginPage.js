const { $ } = require('@wdio/globals')
const Page = require('./page');


class LoginPage extends Page {

    open () {
        return super.open('customer/account/login/');
    }

    get inputEmail() {
        return $('#email');
    }

    get inputPassword() {
        return $('#pass');
    }

    get signInBtn() {
        return $('#send2')
    }

    async login (email, password) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
    }

    async checkLoginDetails(email, password) {

        expect (await this.inputEmail.getValue()).toEqual(email)
        expect (await this.inputPassword.getValue()).toEqual(password)

    }


}

module.exports = new LoginPage();