import { expect } from 'chai';
import WebHelpers from '../../src/web-helpers';

describe('Form Interactions', () => {
    describe('Dropdown Tests', () => {
        beforeEach(async () => {
            await browser.url('/dropdown');
            await WebHelpers.waitForPageLoad();
        });

        it('should select option by text', async () => {
            await WebHelpers.selectDropdownByText('#dropdown', 'Option 1');

            const selectedValue = await WebHelpers.getElementProperty('#dropdown', 'value');
            expect(selectedValue).to.equal('1');
        });

        it('should select option by value', async () => {
            await WebHelpers.selectDropdownByValue('#dropdown', '2');

            const dropdown = await browser.$('#dropdown');
            const selectedText = await dropdown.getValue();
            expect(selectedText).to.equal('2');
        });
    });

    describe('Checkboxes Tests', () => {
        beforeEach(async () => {
            await browser.url('/checkboxes');
            await WebHelpers.waitForPageLoad();
        });

        it('should check and uncheck checkboxes', async () => {
            const checkboxes = await browser.$$('input[type="checkbox"]');

            // Check first checkbox if not checked
            const firstCheckbox = checkboxes[0];
            const isFirstChecked = await firstCheckbox.isSelected();
            if (!isFirstChecked) {
                await firstCheckbox.click();
            }

            const isFirstCheckedAfter = await firstCheckbox.isSelected();
            expect(isFirstCheckedAfter).to.be.true;

            // Uncheck second checkbox if checked
            const secondCheckbox = checkboxes[1];
            const isSecondChecked = await secondCheckbox.isSelected();
            if (isSecondChecked) {
                await secondCheckbox.click();
            }

            const isSecondCheckedAfter = await secondCheckbox.isSelected();
            expect(isSecondCheckedAfter).to.be.false;
        });
    });

    describe('File Upload Tests', () => {
        beforeEach(async () => {
            await browser.url('/upload');
            await WebHelpers.waitForPageLoad();
        });

        it('should upload a file', async () => {
            // Create a temporary test file path
            const testFilePath = './package.json'; // Using existing file for testing

            await WebHelpers.uploadFile('#file-upload', testFilePath);

            const uploadButton = await WebHelpers.waitForElementClickable('#file-submit');
            await uploadButton.click();

            await WebHelpers.waitForElement('#uploaded-files');
            const uploadedFileName = await browser.$('#uploaded-files').getText();
            expect(uploadedFileName).to.include('package.json');
        });
    });

    describe('Input Fields Tests', () => {
        beforeEach(async () => {
            await browser.url('/inputs');
            await WebHelpers.waitForPageLoad();
        });

        it('should handle number inputs', async () => {
            const numberInput = await WebHelpers.waitForElement('input[type="number"]');

            await WebHelpers.clearAndType('input[type="number"]', '12345');

            const inputValue = await numberInput.getValue();
            expect(inputValue).to.equal('12345');
        });

        it('should handle increment and decrement', async () => {
            const numberInput = await WebHelpers.waitForElement('input[type="number"]');

            // Use arrow keys to increment
            await numberInput.click();
            await WebHelpers.pressKey('ArrowUp');
            await WebHelpers.pressKey('ArrowUp');

            const value = await numberInput.getValue();
            expect(parseInt(value)).to.be.greaterThan(0);
        });
    });
});