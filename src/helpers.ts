class AndroidHelpers {
    static async waitForElement(selector: string, timeout: number = 10000): Promise<WebdriverIO.Element> {
        const element = await driver.$(selector);
        await element.waitForDisplayed({ timeout });
        return element;
    }

    static async findElementByText(text: string): Promise<WebdriverIO.Element> {
        return await driver.$(`//*[@text="${text}"]`);
    }

    static async findElementByContentDesc(contentDesc: string): Promise<WebdriverIO.Element> {
        return await driver.$(`//*[@content-desc="${contentDesc}"]`);
    }

    static async scrollToElement(selector: string, maxScrolls: number = 5): Promise<WebdriverIO.Element> {
        let scrollCount = 0;

        while (scrollCount < maxScrolls) {
            try {
                const element = await driver.$(selector);
                if (await element.isDisplayed()) {
                    return element;
                }
            } catch (error) {
                console.log(`Element not found, scrolling... (${scrollCount + 1}/${maxScrolls})`);
            }

            await this.scrollDown();
            scrollCount++;
        }

        throw new Error(`Element ${selector} not found after ${maxScrolls} scrolls`);
    }

    static async scrollDown(): Promise<void> {
        const { width, height } = await driver.getWindowSize();
        const startX = width / 2;
        const startY = height * 0.8;
        const endY = height * 0.2;

        await driver.touchAction([
            { action: 'press', x: startX, y: startY },
            { action: 'wait', ms: 1000 },
            { action: 'moveTo', x: startX, y: endY },
            { action: 'release' }
        ]);
    }

    static async scrollUp(): Promise<void> {
        const { width, height } = await driver.getWindowSize();
        const startX = width / 2;
        const startY = height * 0.2;
        const endY = height * 0.8;

        await driver.touchAction([
            { action: 'press', x: startX, y: startY },
            { action: 'wait', ms: 1000 },
            { action: 'moveTo', x: startX, y: endY },
            { action: 'release' }
        ]);
    }

    static async tapByCoordinates(x: number, y: number): Promise<void> {
        await driver.touchAction([
            { action: 'tap', x: x, y: y }
        ]);
    }

    static async swipeLeft(): Promise<void> {
        const { width, height } = await driver.getWindowSize();
        const startX = width * 0.8;
        const endX = width * 0.2;
        const y = height / 2;

        await driver.touchAction([
            { action: 'press', x: startX, y: y },
            { action: 'wait', ms: 1000 },
            { action: 'moveTo', x: endX, y: y },
            { action: 'release' }
        ]);
    }

    static async swipeRight(): Promise<void> {
        const { width, height } = await driver.getWindowSize();
        const startX = width * 0.2;
        const endX = width * 0.8;
        const y = height / 2;

        await driver.touchAction([
            { action: 'press', x: startX, y: y },
            { action: 'wait', ms: 1000 },
            { action: 'moveTo', x: endX, y: y },
            { action: 'release' }
        ]);
    }

    static async hideKeyboard(): Promise<void> {
        try {
            await driver.hideKeyboard();
        } catch (error) {
            console.log('Keyboard not visible or unable to hide');
        }
    }

    static async pressBack(): Promise<void> {
        await driver.back();
    }

    static async pressHome(): Promise<void> {
        await driver.pressKeyCode(3);
    }

    static async takeScreenshotWithName(name: string): Promise<string> {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${name}_${timestamp}.png`;
        await driver.saveScreenshot(`./screenshots/${filename}`);
        console.log(`Screenshot saved: ${filename}`);
        return filename;
    }

    static async waitForApp(packageName: string, timeout: number = 30000): Promise<boolean> {
        const startTime = Date.now();
        while (Date.now() - startTime < timeout) {
            try {
                const appState = await driver.queryAppState(packageName);
                if (appState === 4) {
                    return true;
                }
            } catch (error) {
                console.log('Checking app state...');
            }
            await driver.pause(1000);
        }
        throw new Error(`App ${packageName} not running after ${timeout}ms`);
    }
}

export default AndroidHelpers;