import { expect } from 'chai';
import WebHelpers from '../../src/web-helpers';

describe('Login Tests', () => {
    beforeEach(async () => {
        await browser.url('/login');
        await WebHelpers.waitForPageLoad();
    });

    it('should login with valid credentials', async () => {
        const usernameInput = await WebHelpers.waitForElement('#username');
        const passwordInput = await WebHelpers.waitForElement('#password');
        const loginButton = await WebHelpers.waitForElementClickable('button[type="submit"]');

        await WebHelpers.clearAndType('#username', 'tomsmith');
        await WebHelpers.clearAndType('#password', 'SuperSecretPassword!');
        await loginButton.click();

        await WebHelpers.waitForUrl('/secure');

        const successMessage = await WebHelpers.waitForElement('.flash.success');
        const messageText = await successMessage.getText();
        expect(messageText).to.include('You logged into a secure area!');
    });

    it('should show error with invalid credentials', async () => {
        await WebHelpers.clearAndType('#username', 'invaliduser');
        await WebHelpers.clearAndType('#password', 'invalidpass');

        const loginButton = await WebHelpers.waitForElementClickable('button[type="submit"]');
        await loginButton.click();

        const errorMessage = await WebHelpers.waitForElement('.flash.error');
        const messageText = await errorMessage.getText();
        expect(messageText).to.include('Your username is invalid!');
    });

    it('should show error with empty credentials', async () => {
        const loginButton = await WebHelpers.waitForElementClickable('button[type="submit"]');
        await loginButton.click();

        const errorMessage = await WebHelpers.waitForElement('.flash.error');
        const messageText = await errorMessage.getText();
        expect(messageText).to.include('Your username is invalid!');
    });

    it('should be able to logout after successful login', async () => {
        // Login first
        await WebHelpers.clearAndType('#username', 'tomsmith');
        await WebHelpers.clearAndType('#password', 'SuperSecretPassword!');

        const loginButton = await WebHelpers.waitForElementClickable('button[type="submit"]');
        await loginButton.click();

        await WebHelpers.waitForUrl('/secure');

        // Then logout
        const logoutButton = await WebHelpers.waitForElementClickable('.button.secondary');
        await logoutButton.click();

        await WebHelpers.waitForUrl('/login');

        const logoutMessage = await WebHelpers.waitForElement('.flash.success');
        const messageText = await logoutMessage.getText();
        expect(messageText).to.include('You logged out of the secure area!');
    });
});