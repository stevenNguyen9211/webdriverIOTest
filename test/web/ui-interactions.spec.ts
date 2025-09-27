import { expect } from 'chai';
import WebHelpers from '../../src/web-helpers';

describe('UI Interactions', () => {
    describe('Hover Effects', () => {
        beforeEach(async () => {
            await browser.url('/hovers');
            await WebHelpers.waitForPageLoad();
        });

        it('should show user info on hover', async () => {
            const firstAvatar = await WebHelpers.waitForElement('.figure:first-child img');
            await WebHelpers.hoverOverElement('.figure:first-child img');

            const userInfo = await WebHelpers.waitForElement('.figure:first-child .figcaption');
            const isVisible = await userInfo.isDisplayed();
            expect(isVisible).to.be.true;

            const userName = await userInfo.$('h5').getText();
            expect(userName).to.include('user1');
        });

        it('should show different user info for each avatar', async () => {
            const avatars = await browser.$$('.figure img');

            for (let i = 0; i < Math.min(avatars.length, 3); i++) {
                await WebHelpers.hoverOverElement(`.figure:nth-child(${i + 1}) img`);

                const userInfo = await WebHelpers.waitForElement(`.figure:nth-child(${i + 1}) .figcaption`);
                const userName = await userInfo.$('h5').getText();
                expect(userName).to.include(`user${i + 1}`);
            }
        });
    });

    describe('Drag and Drop', () => {
        beforeEach(async () => {
            await browser.url('/drag_and_drop');
            await WebHelpers.waitForPageLoad();
        });

        it('should drag and drop elements', async () => {
            const columnA = await WebHelpers.waitForElement('#column-a');
            const columnB = await WebHelpers.waitForElement('#column-b');

            const initialTextA = await columnA.$('header').getText();
            const initialTextB = await columnB.$('header').getText();

            expect(initialTextA).to.equal('A');
            expect(initialTextB).to.equal('B');

            await WebHelpers.dragAndDrop('#column-a', '#column-b');

            // Wait a bit for the swap to complete
            await browser.pause(1000);

            const finalTextA = await columnA.$('header').getText();
            const finalTextB = await columnB.$('header').getText();

            // The texts should have swapped positions
            expect(finalTextA).to.equal('B');
            expect(finalTextB).to.equal('A');
        });
    });

    describe('Dynamic Content', () => {
        beforeEach(async () => {
            await browser.url('/dynamic_content');
            await WebHelpers.waitForPageLoad();
        });

        it('should refresh dynamic content', async () => {
            const firstRowText = await browser.$('.row:first-child .large-10').getText();

            const clickHereLink = await WebHelpers.waitForElementClickable('a[href="/dynamic_content?with_content=static"]');
            await clickHereLink.click();

            await WebHelpers.waitForPageLoad();

            const newFirstRowText = await browser.$('.row:first-child .large-10').getText();

            // Content should be different after refresh
            expect(newFirstRowText).to.not.equal(firstRowText);
        });
    });

    describe('Dynamic Loading', () => {
        beforeEach(async () => {
            await browser.url('/dynamic_loading/1');
            await WebHelpers.waitForPageLoad();
        });

        it('should wait for hidden element to appear', async () => {
            const startButton = await WebHelpers.waitForElementClickable('#start button');
            await startButton.click();

            // Wait for loading to complete and element to appear
            const finishText = await WebHelpers.waitForElement('#finish', 10000);
            const text = await finishText.getText();
            expect(text).to.include('Hello World!');
        });
    });

    describe('Context Menu', () => {
        beforeEach(async () => {
            await browser.url('/context_menu');
            await WebHelpers.waitForPageLoad();
        });

        it('should trigger context menu and handle alert', async () => {
            const hotSpot = await WebHelpers.waitForElement('#hot-spot');
            await WebHelpers.rightClick('#hot-spot');

            // Handle the context menu alert
            const alertText = await WebHelpers.getAlertText();
            expect(alertText).to.include('You selected a context menu');

            await WebHelpers.acceptAlert();
        });
    });

    describe('Scrolling', () => {
        beforeEach(async () => {
            await browser.url('/infinite_scroll');
            await WebHelpers.waitForPageLoad();
        });

        it('should load more content on scroll', async () => {
            const initialParagraphs = await browser.$$('.jscroll-added');
            const initialCount = initialParagraphs.length;

            // Scroll down to trigger infinite scroll
            await WebHelpers.scrollToBottom();
            await browser.pause(2000); // Wait for content to load

            const finalParagraphs = await browser.$$('.jscroll-added');
            const finalCount = finalParagraphs.length;

            expect(finalCount).to.be.greaterThan(initialCount);
        });
    });

    describe('Key Presses', () => {
        beforeEach(async () => {
            await browser.url('/key_presses');
            await WebHelpers.waitForPageLoad();
        });

        it('should capture key presses', async () => {
            const targetInput = await WebHelpers.waitForElement('#target');
            await targetInput.click();

            await WebHelpers.pressKey('Enter');

            const result = await browser.$('#result').getText();
            expect(result).to.include('You entered: ENTER');
        });

        it('should capture different key types', async () => {
            const targetInput = await WebHelpers.waitForElement('#target');
            await targetInput.click();

            const keys = ['Tab', 'Escape', 'Space'];

            for (const key of keys) {
                await WebHelpers.pressKey(key);
                const result = await browser.$('#result').getText();
                expect(result).to.include(`You entered: ${key.toUpperCase()}`);
            }
        });
    });
});