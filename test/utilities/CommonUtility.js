
const { expect, browser } = require('@wdio/globals');

class CommonUtility {
  async URLcheck(url) {
    expect(await browser.getUrl()).toContain(url);
  }

  /*async waitForCounterNumberNotToBeZero(element) {
    if ((await element.getText()) === '0') {
      await browser.pause(2000);
    }
  }*/

  async waitForCounterNumberNotToBeZero(element) {
    await browser.waitUntil(
      async () => {
        const text = await element.getText();
        return text !== '0';
      },
      {
        timeout: 10000, // Set your desired timeout
        timeoutMsg: 'Counter did not become non-zero within the specified time',
        interval: 500 // Set your desired interval
      }
    );
  }

  
}

module.exports = new CommonUtility();
