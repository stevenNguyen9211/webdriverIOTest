import { expect } from 'chai';

describe('Android Calculator App', () => {
    beforeEach(async () => {
        await driver.activateApp('com.google.android.calculator');
    });

    it('should perform basic addition', async () => {
        const num2 = await driver.$('//android.widget.Button[@content-desc="2"]');
        const numPlus = await driver.$('//android.widget.Button[@content-desc="plus"]');
        const num3 = await driver.$('//android.widget.Button[@content-desc="3"]');
        const equals = await driver.$('//android.widget.Button[@content-desc="equals"]');
        const result = await driver.$('//android.widget.TextView[@resource-id="com.google.android.calculator:id/result_final"]');

        await num2.click();
        await numPlus.click();
        await num3.click();
        await equals.click();

        await driver.pause(1000);

        const resultText = await result.getText();
        expect(resultText).to.equal('5');
    });

    it('should perform basic subtraction', async () => {
        const num5 = await driver.$('//android.widget.Button[@content-desc="5"]');
        const numMinus = await driver.$('//android.widget.Button[@content-desc="minus"]');
        const num2 = await driver.$('//android.widget.Button[@content-desc="2"]');
        const equals = await driver.$('//android.widget.Button[@content-desc="equals"]');
        const result = await driver.$('//android.widget.TextView[@resource-id="com.google.android.calculator:id/result_final"]');

        await num5.click();
        await numMinus.click();
        await num2.click();
        await equals.click();

        await driver.pause(1000);

        const resultText = await result.getText();
        expect(resultText).to.equal('3');
    });

    it('should clear calculator display', async () => {
        const num1 = await driver.$('//android.widget.Button[@content-desc="1"]');
        const num2 = await driver.$('//android.widget.Button[@content-desc="2"]');
        const clear = await driver.$('//android.widget.Button[@content-desc="clear"]');
        const display = await driver.$('//android.widget.TextView[@resource-id="com.google.android.calculator:id/formula"]');

        await num1.click();
        await num2.click();
        await clear.click();

        const displayText = await display.getText();
        expect(displayText).to.be.empty;
    });
});