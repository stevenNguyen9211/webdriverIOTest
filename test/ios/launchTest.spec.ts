import { expect } from 'chai';

describe('iOS Launch Test', () => {

    it('should launch the iOS app successfully', async () => {
        // Wait for app to launch
        await driver.pause(3000);

        // Get app state to verify it launched
        const appState = await driver.queryAppState('nguyen.homecapp.welcomeApp');
        console.log('App state after launch:', appState);

        // App state: 4 = RUNNING_IN_FOREGROUND
        expect(appState).to.equal(4);
    });

    it('should get device information', async () => {
        const deviceTime = await driver.getDeviceTime();
        console.log('Device time:', deviceTime);
        expect(deviceTime).to.be.a('string');

        // Get device info
        const sessionInfo = await driver.getSession();
        console.log('Device name:', sessionInfo.capabilities['appium:deviceName']);
        console.log('Platform version:', sessionInfo.capabilities['appium:platformVersion']);
        console.log('UDID:', sessionInfo.capabilities['appium:udid']);
    });

    it('should take screenshot', async () => {
        const screenshot = await driver.saveScreenshot('./screenshots/ios_launch_test.png');
        console.log('Screenshot saved successfully');

        // Verify screenshot was taken
        expect(screenshot).to.not.be.null;
    });
});