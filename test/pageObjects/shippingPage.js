const { $ } = require('@wdio/globals')
const Page = require('./page');

class ShippingPage extends Page {

    open () {
        return super.open('');
    }

    get nextBtn() {
        return $('.button.action.continue.primary');
    }

}

module.exports = new ShippingPage();