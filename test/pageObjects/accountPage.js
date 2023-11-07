const { $ } = require('@wdio/globals')
const Page = require('./page');

class AccountPage extends Page {

    open () {
        return super.open('customer/account/');
    }

    get successMessage() {
        //const element = document.querySelector('[data-ui-id="message-success"]');
        //return element;
        return $('.messages');
    }

    get welcomeMessage() {
        return $('.logged-in');
    }

    get actionSwitchBtn() {
        return $('.customer-name');
    }

    get signOutBtn() {
        return $('.authorization-link');
    }

}

module.exports = new AccountPage();