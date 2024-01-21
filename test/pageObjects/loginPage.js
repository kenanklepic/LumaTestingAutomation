const { $ } = require('@wdio/globals')
const Page = require('./page');
const Input = require('./commonWebComponents/components/input')
const Notification = require('./commonWebComponents/components/notification')
const Button = require('./commonWebComponents/components/button')
const Selectors = require('../utilities/selectors')

class LoginPage extends Page {

    open () {
        return super.open('customer/account/login/');
    }

    get inputEmail() { return new Input(Selectors.loginPage.inputEmail); }
    get inputPassword() { return new Input(Selectors.loginPage.inputPassword); }
    get signInBtn() { return new Button(Selectors.loginPage.signInBtn); }
    get signUpErrorMessage() { return new Notification(Selectors.loginPage.signUpErrorMessage); }
    get emailErrorMessage() { return new Notification(Selectors.loginPage.emailErrorMessage); }
    get passwordErrorMessage() { return new Notification(Selectors.loginPage.passwordErrorMessage); }    

    get errorMessages() {
        return [
          this.emailErrorMessage,
          this.passwordErrorMessage
        ];
      }

    async login (email, password) {
        await this.inputEmail.insertValueIntoElement(email);
        await this.inputPassword.insertValueIntoElement(password);
    }

    async checkLoginDetails(email, password) {
        expect (await this.inputEmail.getElementValue()).toEqual(email);
        expect (await this.inputPassword.getElementValue()).toEqual(password);
    }
}
module.exports = new LoginPage();