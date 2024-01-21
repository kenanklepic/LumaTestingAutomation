const { $ } = require('@wdio/globals')
const Page = require('./page');
const Input = require('./commonWebComponents/components/input')
const Notification = require('./commonWebComponents/components/notification')
const Button = require('./commonWebComponents/components/button')
const Selectors = require('../utilities/selectors')

class RegistrationPage extends Page {

    open () {
        return super.open('customer/account/create/');
    }

    get inputFistName() { return new Input(Selectors.registrationPage.inputFirstName); }
    get inputLastName() { return new Input(Selectors.registrationPage.inputLastName); }
    get inputEmail() { return new Input(Selectors.registrationPage.inputEmail); }
    get inputPassword() { return new Input(Selectors.registrationPage.inputPassword); }
    get inputConfirmPassword() { return new Input(Selectors.registrationPage.inputConfirmPassword); }
    get btnSubmit() { return new Button(Selectors.registrationPage.btnSubmit); }
    get pageTitle() { return new Notification(Selectors.registrationPage.pageTitle); }
    get message() { return new Notification(Selectors.registrationPage.message); }
    get emailErrorMessage() { return new Notification(Selectors.registrationPage.emailErrorMessage); }
    get passwordErrorMessage() { return new Notification(Selectors.registrationPage.passwordErrorMessage); }
    get firstNameErrorMessage() { return new Notification(Selectors.registrationPage.firstNameErrorMessage); }
    get lastNameErrorMessage() { return new Notification(Selectors.registrationPage.lastNameErrorMessage); }

    get errorMessages() {
        return [
          this.emailErrorMessage,
          this.passwordErrorMessage,
          this.firstNameErrorMessage,
          this.lastNameErrorMessage
        ];
      }

    async register (firstName, lastName, email, password, confirmPassword) {
        await this.inputFistName.insertValueIntoElement(firstName);
        await this.inputLastName.insertValueIntoElement(lastName);
        await this.inputEmail.insertValueIntoElement(email);
        await this.inputPassword.insertValueIntoElement(password);
        await this.inputConfirmPassword.insertValueIntoElement(confirmPassword);
    }

    async clickRegister () {
        await this.btnSubmit.click();
    }
}
module.exports = new RegistrationPage();