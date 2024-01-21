const PageObject = require('./pageObject.js');
const CommonUtility = require('../../../utilities/commonUtility');

class Notification extends PageObject{

    constructor(selector){
        super(selector);
    }

}

module.exports = Notification;