class WebHelpers {
    static async waitForElement(selector: string, timeout: number = 10000): Promise<WebdriverIO.Element> {
        const element = await browser.$(selector);
        await element.waitForDisplayed({ timeout });
        return element;
    }

    static async waitForElementClickable(selector: string, timeout: number = 10000): Promise<WebdriverIO.Element> {
        const element = await browser.$(selector);
        await element.waitForClickable({ timeout });
        return element;
    }

    static async waitForText(selector: string, expectedText: string, timeout: number = 10000): Promise<void> {
        await browser.waitUntil(async () => {
            const element = await browser.$(selector);
            const text = await element.getText();
            return text.includes(expectedText);
        }, {
            timeout,
            timeoutMsg: `Element ${selector} did not contain text "${expectedText}" within ${timeout}ms`
        });
    }

    static async scrollToElement(selector: string): Promise<WebdriverIO.Element> {
        const element = await browser.$(selector);
        await element.scrollIntoView();
        return element;
    }

    static async hoverOverElement(selector: string): Promise<void> {
        const element = await browser.$(selector);
        await element.moveTo();
    }

    static async switchToFrame(frameSelector: string): Promise<void> {
        const frame = await browser.$(frameSelector);
        await browser.switchToFrame(frame);
    }

    static async switchToDefaultContent(): Promise<void> {
        await browser.switchToFrame(null);
    }

    static async switchToWindow(windowHandle: string): Promise<void> {
        await browser.switchToWindow(windowHandle);
    }

    static async getWindowHandles(): Promise<string[]> {
        return await browser.getWindowHandles();
    }

    static async openNewTab(url?: string): Promise<void> {
        await browser.newWindow('tab');
        if (url) {
            await browser.url(url);
        }
    }

    static async closeCurrentTab(): Promise<void> {
        await browser.closeWindow();
    }

    static async takeScreenshot(name: string): Promise<string> {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${name}_${timestamp}.png`;
        await browser.saveScreenshot(`./screenshots/${filename}`);
        console.log(`Screenshot saved: ${filename}`);
        return filename;
    }

    static async executeScript(script: string, ...args: any[]): Promise<any> {
        return await browser.execute(script, ...args);
    }

    static async scrollToTop(): Promise<void> {
        await browser.execute(() => {
            window.scrollTo(0, 0);
        });
    }

    static async scrollToBottom(): Promise<void> {
        await browser.execute(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    }

    static async scrollByOffset(x: number, y: number): Promise<void> {
        await browser.execute((x: number, y: number) => {
            window.scrollBy(x, y);
        }, x, y);
    }

    static async dragAndDrop(sourceSelector: string, targetSelector: string): Promise<void> {
        const source = await browser.$(sourceSelector);
        const target = await browser.$(targetSelector);
        await source.dragAndDrop(target);
    }

    static async uploadFile(inputSelector: string, filePath: string): Promise<void> {
        const fileInput = await browser.$(inputSelector);
        await fileInput.setValue(filePath);
    }

    static async acceptAlert(): Promise<void> {
        await browser.acceptAlert();
    }

    static async dismissAlert(): Promise<void> {
        await browser.dismissAlert();
    }

    static async getAlertText(): Promise<string> {
        return await browser.getAlertText();
    }

    static async sendAlertText(text: string): Promise<void> {
        await browser.sendAlertText(text);
    }

    static async waitForUrl(expectedUrl: string, timeout: number = 10000): Promise<void> {
        await browser.waitUntil(async () => {
            const currentUrl = await browser.getUrl();
            return currentUrl.includes(expectedUrl);
        }, {
            timeout,
            timeoutMsg: `URL did not contain "${expectedUrl}" within ${timeout}ms`
        });
    }

    static async waitForTitle(expectedTitle: string, timeout: number = 10000): Promise<void> {
        await browser.waitUntil(async () => {
            const title = await browser.getTitle();
            return title.includes(expectedTitle);
        }, {
            timeout,
            timeoutMsg: `Title did not contain "${expectedTitle}" within ${timeout}ms`
        });
    }

    static async selectDropdownByText(selector: string, text: string): Promise<void> {
        const dropdown = await browser.$(selector);
        await dropdown.selectByVisibleText(text);
    }

    static async selectDropdownByValue(selector: string, value: string): Promise<void> {
        const dropdown = await browser.$(selector);
        await dropdown.selectByAttribute('value', value);
    }

    static async selectDropdownByIndex(selector: string, index: number): Promise<void> {
        const dropdown = await browser.$(selector);
        await dropdown.selectByIndex(index);
    }

    static async isElementVisible(selector: string): Promise<boolean> {
        try {
            const element = await browser.$(selector);
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    static async isElementEnabled(selector: string): Promise<boolean> {
        try {
            const element = await browser.$(selector);
            return await element.isEnabled();
        } catch (error) {
            return false;
        }
    }

    static async getElementAttribute(selector: string, attribute: string): Promise<string | null> {
        const element = await browser.$(selector);
        return await element.getAttribute(attribute);
    }

    static async getElementProperty(selector: string, property: string): Promise<any> {
        const element = await browser.$(selector);
        return await element.getProperty(property);
    }

    static async getCSSProperty(selector: string, property: string): Promise<any> {
        const element = await browser.$(selector);
        return await element.getCSSProperty(property);
    }

    static async waitForPageLoad(timeout: number = 30000): Promise<void> {
        await browser.waitUntil(async () => {
            const readyState = await browser.execute(() => {
                return document.readyState;
            });
            return readyState === 'complete';
        }, {
            timeout,
            timeoutMsg: `Page did not finish loading within ${timeout}ms`
        });
    }

    static async clearAndType(selector: string, text: string): Promise<void> {
        const element = await browser.$(selector);
        await element.clearValue();
        await element.setValue(text);
    }

    static async doubleClick(selector: string): Promise<void> {
        const element = await browser.$(selector);
        await element.doubleClick();
    }

    static async rightClick(selector: string): Promise<void> {
        const element = await browser.$(selector);
        await element.click({ button: 'right' });
    }

    static async pressKey(key: string): Promise<void> {
        await browser.keys(key);
    }

    static async pressKeys(keys: string[]): Promise<void> {
        await browser.keys(keys);
    }

    static async getPageSource(): Promise<string> {
        return await browser.getPageSource();
    }

    static async refresh(): Promise<void> {
        await browser.refresh();
    }

    static async navigateBack(): Promise<void> {
        await browser.back();
    }

    static async navigateForward(): Promise<void> {
        await browser.forward();
    }

    static async deleteCookies(): Promise<void> {
        await browser.deleteCookies();
    }

    static async setCookie(cookie: { name: string; value: string; domain?: string; path?: string }): Promise<void> {
        await browser.setCookies(cookie);
    }

    static async getCookies(): Promise<any[]> {
        return await browser.getCookies();
    }

    static async setWindowSize(width: number, height: number): Promise<void> {
        await browser.setWindowSize(width, height);
    }

    static async getWindowSize(): Promise<{ width: number; height: number }> {
        return await browser.getWindowSize();
    }
}

export default WebHelpers;