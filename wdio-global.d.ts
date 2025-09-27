declare global {
    const driver: WebdriverIO.Browser;
    const browser: WebdriverIO.Browser;

    namespace WebdriverIO {
        interface Browser {
            $: (selector: string) => Element;
            $$: (selector: string) => Element[];
            getWindowSize: () => Promise<{ width: number; height: number }>;
            touchAction: (actions: any[]) => Promise<void>;
            hideKeyboard: () => Promise<void>;
            back: () => Promise<void>;
            pressKeyCode: (code: number) => Promise<void>;
            saveScreenshot: (path: string) => Promise<void>;
            queryAppState: (packageName: string) => Promise<number>;
            pause: (ms: number) => Promise<void>;
            activateApp: (packageName: string) => Promise<void>;
            getDeviceTime: () => Promise<string>;
            getOrientation: () => Promise<string>;
            setOrientation: (orientation: string) => Promise<void>;
            takeScreenshot: () => Promise<string>;
            background: (seconds: number) => Promise<void>;
        }

        interface Element {
            waitForDisplayed: (options?: { timeout?: number }) => Promise<void>;
            isDisplayed: () => Promise<boolean>;
            click: () => Promise<void>;
            getText: () => Promise<string>;
        }
    }
}

export {};