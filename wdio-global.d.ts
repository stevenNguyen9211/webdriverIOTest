declare global {
    const driver: WebdriverIO.Browser;
    const browser: WebdriverIO.Browser;
    const window: any;
    const document: any;

    namespace WebdriverIO {
        interface Browser {
            $: (selector: string) => Element;
            $$: (selector: string) => Element[];
            url: (path: string) => Promise<void>;
            getUrl: () => Promise<string>;
            getTitle: () => Promise<string>;
            refresh: () => Promise<void>;
            back: () => Promise<void>;
            forward: () => Promise<void>;
            getWindowSize: () => Promise<{ width: number; height: number }>;
            setWindowSize: (width: number, height: number) => Promise<void>;
            maximizeWindow: () => Promise<void>;
            getWindowHandles: () => Promise<string[]>;
            switchToWindow: (handle: string) => Promise<void>;
            newWindow: (type: string) => Promise<void>;
            closeWindow: () => Promise<void>;
            switchToFrame: (frame: Element | null) => Promise<void>;
            execute: (script: string | Function, ...args: any[]) => Promise<any>;
            executeAsync: (script: string | Function, ...args: any[]) => Promise<any>;
            waitUntil: (condition: () => Promise<boolean>, options?: { timeout?: number; timeoutMsg?: string }) => Promise<void>;
            keys: (keys: string | string[]) => Promise<void>;
            acceptAlert: () => Promise<void>;
            dismissAlert: () => Promise<void>;
            getAlertText: () => Promise<string>;
            sendAlertText: (text: string) => Promise<void>;
            saveScreenshot: (path: string) => Promise<void>;
            getPageSource: () => Promise<string>;
            deleteCookies: () => Promise<void>;
            setCookies: (cookie: any) => Promise<void>;
            getCookies: () => Promise<any[]>;
            pause: (ms: number) => Promise<void>;

            // Mobile specific methods
            touchAction: (actions: any[]) => Promise<void>;
            hideKeyboard: () => Promise<void>;
            pressKeyCode: (code: number) => Promise<void>;
            queryAppState: (packageName: string) => Promise<number>;
            activateApp: (packageName: string) => Promise<void>;
            getDeviceTime: () => Promise<string>;
            getOrientation: () => Promise<string>;
            setOrientation: (orientation: string) => Promise<void>;
            takeScreenshot: () => Promise<string>;
            background: (seconds: number) => Promise<void>;
        }

        interface Element {
            $: (selector: string) => Element;
            $$: (selector: string) => Element[];
            click: (options?: { button?: string }) => Promise<void>;
            doubleClick: () => Promise<void>;
            getText: () => Promise<string>;
            getValue: () => Promise<string>;
            setValue: (value: string | number) => Promise<void>;
            clearValue: () => Promise<void>;
            isDisplayed: () => Promise<boolean>;
            isEnabled: () => Promise<boolean>;
            isSelected: () => Promise<boolean>;
            getAttribute: (name: string) => Promise<string | null>;
            getProperty: (property: string) => Promise<any>;
            getCSSProperty: (property: string) => Promise<any>;
            waitForDisplayed: (options?: { timeout?: number }) => Promise<void>;
            waitForClickable: (options?: { timeout?: number }) => Promise<void>;
            scrollIntoView: () => Promise<void>;
            moveTo: () => Promise<void>;
            dragAndDrop: (target: Element) => Promise<void>;
            selectByVisibleText: (text: string) => Promise<void>;
            selectByAttribute: (attribute: string, value: string) => Promise<void>;
            selectByIndex: (index: number) => Promise<void>;
        }
    }
}

export {};