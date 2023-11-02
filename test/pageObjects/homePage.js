const { $ } = require('@wdio/globals')
const Page = require('./page');

class HomePage extends Page {

    open () {
        return super.open('');
    }

    get registrationLink () {
        return $x('/page-wrapper/page-header/panel wrapper/panel header/header links/li[2]');
    }

    async registration(){
        await this.registrationLink.click();
    }

}

module.exports = new HomePage();