const PageObject = require('./pageObject.js');
const CommonUtility = require('../../../utilities/commonUtility');

class Button extends PageObject{

    constructor(selector){
        super(selector);
    }

    get element() {
        return $(this.selector);
    }

    async click() {
        console.log('Clicking element ' + this.selector);
        await CommonUtility.prototype.click(this.element);
    }

}

module.exports = Button;