const { expect, browser } = require('@wdio/globals');

class CommonUtility {

  async getUrl() {
    return (await browser.getUrl());
  }

  async URLcheck(url) {
    expect(await this.getUrl()).toContain(url);
  }

  /*async checkIfElementIsExisting(element) {
    await (expect(element).toBeExisting();
  }*/

  async checkIfElementIsExisting(locator) {
    await (expect(locator).toBeExisting());
  }

  async checkIfElementsAreExisting(elements) {
    for (const element of elements) {
      await expect(element).toBeExisting();
    }
  }

  async waitForCounterNumberNotToBeZero(element) {
    await browser.waitUntil(
      async () => {
        const text = await element.getText();
        return text !== '0';
      },
      {
        timeout: 10000, 
        timeoutMsg: 'Counter did not become non-zero within the specified time',
        interval: 500 
      }
    );
  }

  async click(locator) {
    try {
        console.log('Clicking element');
        await locator.click();
    } catch (error) {
        console.error('Error clicking element:', error.message);
    }
  }

  async insertValueIntoElement(locator, text) {
    try {
        if (text === undefined) {
            console.error('Attempt to insert undefined value to input field');
            return;
        }

        console.log(`Inserting "${text}" in input field...`);
        await locator.setValue(text === '' ? ' ' : text);
    } catch (error) {
        console.error('Error inserting value:', error.message);
    }
  }

  async getElementValue(locator){
    return (await locator.getValue());
  }

}

module.exports = CommonUtility;