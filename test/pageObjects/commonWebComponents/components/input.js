const PageObject = require('./pageObject.js');
const CommonUtility = require('../../../utilities/commonUtility');

class Input extends PageObject{

    constructor(selector){
        super(selector);
    }

    async insertValueIntoElement(value) {
        console.log('Setting the value of element ' + this.selector);
        await CommonUtility.prototype.insertValueIntoElement(this.element, value);
    }

    async getElementValue() {
        console.log('Getting the value of element ' + this.selector);
        return (await CommonUtility.prototype.getElementValue(this.element));
    }

}

module.exports = Input;