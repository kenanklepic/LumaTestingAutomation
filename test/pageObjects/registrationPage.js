const { $ } = require('@wdio/globals')
const Page = require('./page');

class RegistrationPage extends Page {

    open () {
        return super.open('customer/account/create/');
    }

    get inputFistName () {
        return $('#firstname');
    }

    get inputLastName () {
        return $('#lastname');
    }

    get inputEmail () {
        return $('#email_address');
    }

    get inputPassword() {
        return $('#password');
    }

    get inputConfirmPassword() {
        return $('#password-confirmation');
    }

    get btnSubmit () {
        return $('.primary');
    }

    get pageTitle() {
        return $('.base');
    }

    get message() {
        return $('.messages');
    }

    async register (firstName, lastName, email, password, confirmPassword) {
        await this.inputFistName.setValue(firstName);
        await this.inputLastName.setValue(lastName);
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.inputConfirmPassword.setValue(confirmPassword);
        //await this.btnSubmit.click();
    }

    async clickRegister () {
        (await this.btnSubmit).click();
    }


}

module.exports = new RegistrationPage();