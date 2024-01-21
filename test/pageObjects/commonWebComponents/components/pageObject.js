const CommonUtility = require('../../../utilities/commonUtility');

class PageObject{

    constructor(selector){
        this.selector = selector;
    }

    get element() {
        return $(this.selector);
    }
    
    async checkIfElementIsExisting() {
        console.log('Checking the existance of element ' + this.selector);
        await CommonUtility.prototype.checkIfElementIsExisting(this.element);
    }
}

module.exports = PageObject;