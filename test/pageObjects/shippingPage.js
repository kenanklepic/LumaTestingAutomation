const { $ } = require('@wdio/globals')
const Page = require('./page');

class ShippingPage extends Page {

    open () {
        return super.open('checkout/#shipping');
    }

    get nextBtn() {
        return $('.button.action.continue.primary');
    }

    get InputStreetAddress() {
        return $('[name="street[0]"]');
    }

    get InputCity() {
        return $('[name="city"]');
    }

    get InputPostalCode() {
        return $('[name="postcode"]');
    }

    get InputPhoneNumber() {
        return $('[name="telephone"]');
    }

    get checkboxShippingMethod() {
        return $('[name="ko_unique_1"]');
    }

    get menuRegion() {
        return $('[name="region_id"]');
    }

    get regionToSelect() {
        return $('[value="1"]');
    }

    async inputShippingDetails(streetAddress, city, postalCode, phoneNum) {
        await this.InputStreetAddress.setValue(streetAddress);
        await this.InputCity.setValue(city);
        await this.menuRegion.click();
        await this.regionToSelect.click();
        await this.InputPostalCode.setValue(postalCode);
        await this.InputPhoneNumber.setValue(phoneNum);
        await this.checkboxShippingMethod.click();
    }

}

module.exports = new ShippingPage();