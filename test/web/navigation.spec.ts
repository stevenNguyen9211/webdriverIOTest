import { expect } from 'chai';
import WebHelpers from '../../src/web-helpers';

describe('Navigation Tests', () => {
    describe('Basic Navigation', () => {
        it('should navigate to different pages', async () => {
            await browser.url('/');
            await WebHelpers.waitForPageLoad();

            const title = await browser.getTitle();
            expect(title).to.include('The Internet');

            // Navigate to login page
            await browser.url('/login');
            await WebHelpers.waitForUrl('/login');

            const currentUrl = await browser.getUrl();
            expect(currentUrl).to.include('/login');
        });

        it('should handle browser back and forward', async () => {
            await browser.url('/');
            await WebHelpers.waitForPageLoad();

            await browser.url('/login');
            await WebHelpers.waitForUrl('/login');

            await WebHelpers.navigateBack();
            await WebHelpers.waitForPageLoad();

            let currentUrl = await browser.getUrl();
            expect(currentUrl).to.not.include('/login');

            await WebHelpers.navigateForward();
            await WebHelpers.waitForUrl('/login');

            currentUrl = await browser.getUrl();
            expect(currentUrl).to.include('/login');
        });

        it('should refresh the page', async () => {
            await browser.url('/');
            await WebHelpers.waitForPageLoad();

            const titleBefore = await browser.getTitle();
            await WebHelpers.refresh();
            await WebHelpers.waitForPageLoad();

            const titleAfter = await browser.getTitle();
            expect(titleAfter).to.equal(titleBefore);
        });
    });

    describe('Multiple Windows/Tabs', () => {
        it('should handle multiple windows', async () => {
            await browser.url('/windows');
            await WebHelpers.waitForPageLoad();

            const initialHandles = await WebHelpers.getWindowHandles();
            expect(initialHandles).to.have.length(1);

            const clickHereLink = await WebHelpers.waitForElementClickable('a[href="/windows/new"]');
            await clickHereLink.click();

            // Wait for new window to open
            await browser.waitUntil(async () => {
                const handles = await WebHelpers.getWindowHandles();
                return handles.length === 2;
            }, { timeout: 5000 });

            const allHandles = await WebHelpers.getWindowHandles();
            expect(allHandles).to.have.length(2);

            // Switch to new window
            const newWindowHandle = allHandles.find(handle => handle !== initialHandles[0])!;
            await WebHelpers.switchToWindow(newWindowHandle);

            const newWindowTitle = await browser.getTitle();
            expect(newWindowTitle).to.include('New Window');

            // Close new window and switch back
            await WebHelpers.closeCurrentTab();
            await WebHelpers.switchToWindow(initialHandles[0]);

            const finalHandles = await WebHelpers.getWindowHandles();
            expect(finalHandles).to.have.length(1);
        });
    });

    describe('Frames', () => {
        it('should switch between frames', async () => {
            await browser.url('/nested_frames');
            await WebHelpers.waitForPageLoad();

            // Switch to top frame
            await WebHelpers.switchToFrame('frame[name="frame-top"]');

            // Switch to left frame within top frame
            await WebHelpers.switchToFrame('frame[name="frame-left"]');

            const frameContent = await browser.$('body').getText();
            expect(frameContent).to.include('LEFT');

            // Switch back to default content
            await WebHelpers.switchToDefaultContent();

            // Verify we're back to main page
            const pageTitle = await browser.getTitle();
            expect(pageTitle).to.include('The Internet');
        });
    });

    describe('JavaScript Alerts', () => {
        beforeEach(async () => {
            await browser.url('/javascript_alerts');
            await WebHelpers.waitForPageLoad();
        });

        it('should handle JS Alert', async () => {
            const alertButton = await WebHelpers.waitForElementClickable('button[onclick="jsAlert()"]');
            await alertButton.click();

            const alertText = await WebHelpers.getAlertText();
            expect(alertText).to.equal('I am a JS Alert');

            await WebHelpers.acceptAlert();

            const result = await browser.$('#result').getText();
            expect(result).to.include('You successfully clicked an alert');
        });

        it('should handle JS Confirm - Accept', async () => {
            const confirmButton = await WebHelpers.waitForElementClickable('button[onclick="jsConfirm()"]');
            await confirmButton.click();

            const alertText = await WebHelpers.getAlertText();
            expect(alertText).to.equal('I am a JS Confirm');

            await WebHelpers.acceptAlert();

            const result = await browser.$('#result').getText();
            expect(result).to.include('You clicked: Ok');
        });

        it('should handle JS Confirm - Dismiss', async () => {
            const confirmButton = await WebHelpers.waitForElementClickable('button[onclick="jsConfirm()"]');
            await confirmButton.click();

            await WebHelpers.dismissAlert();

            const result = await browser.$('#result').getText();
            expect(result).to.include('You clicked: Cancel');
        });

        it('should handle JS Prompt', async () => {
            const promptButton = await WebHelpers.waitForElementClickable('button[onclick="jsPrompt()"]');
            await promptButton.click();

            const testText = 'Hello WebDriverIO!';
            await WebHelpers.sendAlertText(testText);
            await WebHelpers.acceptAlert();

            const result = await browser.$('#result').getText();
            expect(result).to.include(`You entered: ${testText}`);
        });
    });
});