import { expect } from 'chai';

describe('iOS Basic Interactions', () => {

    it('should handle device orientation changes', async () => {
        const initialOrientation = await driver.getOrientation();
        console.log('Initial orientation:', initialOrientation);
        expect(['PORTRAIT', 'LANDSCAPE']).to.include(initialOrientation);

        // Change to landscape
        await driver.setOrientation('LANDSCAPE');
        const landscapeOrientation = await driver.getOrientation();
        expect(landscapeOrientation).to.equal('LANDSCAPE');

        // Change back to portrait
        await driver.setOrientation('PORTRAIT');
        const portraitOrientation = await driver.getOrientation();
        expect(portraitOrientation).to.equal('PORTRAIT');
    });

    it('should perform touch gestures', async () => {
        const { width, height } = await driver.getWindowSize();
        console.log('Screen size:', { width, height });

        // Perform swipe up gesture
        await driver.touchAction([
            { action: 'press', x: width / 2, y: height * 0.8 },
            { action: 'wait', ms: 1000 },
            { action: 'moveTo', x: width / 2, y: height * 0.2 },
            { action: 'release' }
        ]);

        await driver.pause(2000);
        console.log('Swipe gesture completed');
    });

    it('should handle app background and foreground', async () => {
        // Send app to background
        await driver.background(-1);
        console.log('App sent to background');
        await driver.pause(3000);

        // Check app state
        const backgroundState = await driver.queryAppState('nguyen.homecapp.welcomeApp');
        console.log('App state in background:', backgroundState);
        // State 1 = NOT_RUNNING, 2 = RUNNING_IN_BACKGROUND

        // Activate app again
        await driver.activateApp('nguyen.homecapp.welcomeApp');
        await driver.pause(2000);

        const foregroundState = await driver.queryAppState('nguyen.homecapp.welcomeApp');
        console.log('App state in foreground:', foregroundState);
        expect(foregroundState).to.equal(4); // RUNNING_IN_FOREGROUND
    });

    it('should interact with alerts (if any)', async () => {
        try {
            // Try to get alert text if alert is present
            const alertText = await driver.getAlertText();
            console.log('Alert found with text:', alertText);

            // Accept the alert
            await driver.acceptAlert();
            console.log('Alert accepted');
        } catch (error) {
            console.log('No alert present, which is expected for most apps');
            // This is normal - most apps don't show alerts on launch
        }
    });

    it('should get app source for debugging', async () => {
        const pageSource = await driver.getPageSource();
        expect(pageSource).to.be.a('string');
        expect(pageSource.length).to.be.greaterThan(0);

        console.log('Page source length:', pageSource.length);
        // Optionally log first 200 characters for debugging
        console.log('Page source preview:', pageSource.substring(0, 200) + '...');
    });

    it('should handle device shake gesture', async () => {
        try {
            // Perform shake gesture (iOS specific)
            await driver.execute('mobile: shake');
            console.log('Shake gesture performed');
            await driver.pause(2000);
        } catch (error) {
            console.log('Shake gesture not available or failed:', error.message);
            // This might not be available on all devices/simulators
        }
    });

    it('should test touch and hold gesture', async () => {
        const { width, height } = await driver.getWindowSize();

        // Perform long press in center of screen
        await driver.touchAction([
            { action: 'press', x: width / 2, y: height / 2 },
            { action: 'wait', ms: 3000 },
            { action: 'release' }
        ]);

        console.log('Long press gesture completed');
        await driver.pause(1000);
    });
});