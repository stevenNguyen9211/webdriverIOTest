import { expect } from 'chai';

describe('Basic Android Interactions', () => {

    it('should get device information', async () => {
        const deviceInfo = await driver.getDeviceTime();
        console.log('Device time:', deviceInfo);
        expect(deviceInfo).to.be.a('string');
    });

    it('should interact with device orientation', async () => {
        const initialOrientation = await driver.getOrientation();
        console.log('Initial orientation:', initialOrientation);

        await driver.setOrientation('LANDSCAPE');
        const landscapeOrientation = await driver.getOrientation();
        expect(landscapeOrientation).to.equal('LANDSCAPE');

        await driver.setOrientation('PORTRAIT');
        const portraitOrientation = await driver.getOrientation();
        expect(portraitOrientation).to.equal('PORTRAIT');
    });

    it('should perform swipe gesture', async () => {
        const { width, height } = await driver.getWindowSize();

        await driver.touchAction([
            { action: 'press', x: width / 2, y: height * 0.8 },
            { action: 'wait', ms: 1000 },
            { action: 'moveTo', x: width / 2, y: height * 0.2 },
            { action: 'release' }
        ]);

        await driver.pause(2000);
    });

    it('should take screenshot', async () => {
        const screenshot = await driver.takeScreenshot();
        expect(screenshot).to.be.a('string');
        console.log('Screenshot taken successfully');
    });

    it('should handle app background and foreground', async () => {
        await driver.background(-1);
        await driver.pause(3000);

        const apps = await driver.queryAppState('com.android.settings');
        console.log('App state:', apps);

        await driver.activateApp('com.android.settings');
        await driver.pause(2000);
    });
});