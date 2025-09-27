import { expect } from 'chai';
import { testLogger } from '../helpers/testLogger';

describe('iOS Launch Test', () => {

    it('Verify that I launch the iOS app successfully', async () => {
        testLogger.startTest('iOS App Launch Verification');

        try {
            testLogger.logStep('SETUP', 'Starting iOS app launch test');

            // Wait for app to launch
            testLogger.logStep('WAIT', 'Waiting 3 seconds for app to fully launch');
            await driver.pause(3000);

            // Get app state to verify it launched
            testLogger.logStep('VERIFY', 'Checking app state to verify launch');
            const appState = await driver.queryAppState('nguyen.homecapp.welcomeApp');

            testLogger.logStep('RESULT', `App state retrieved: ${appState}`, 'info', { appState });

            // App state: 4 = RUNNING_IN_FOREGROUND
            testLogger.logStep('ASSERT', 'Verifying app is running in foreground (state = 4)');
            expect(appState).to.equal(4);

            testLogger.logStep('SUCCESS', 'App launched successfully and is running in foreground', 'success');
            testLogger.endTest('passed');

        } catch (error) {
            testLogger.logStep('ERROR', `Test failed: ${error.message}`, 'error', error);
            testLogger.endTest('failed', error);
            throw error;
        } finally {
            testLogger.saveToFile();
        }
    });

    // it('should get device information', async () => {
    //     const deviceTime = await driver.getDeviceTime();
    //     console.log('Device time:', deviceTime);
    //     expect(deviceTime).to.be.a('string');

    //     // Get device info using new method
    //     const capabilitiesResponse = await driver.getAppiumSessionCapabilities();
    //     const capabilities = capabilitiesResponse.capabilities;
    //     console.log('Device name:', capabilities.deviceName);
    //     console.log('Platform version:', capabilities.platformVersion);
    //     console.log('UDID:', capabilities.udid);
    // });

    it('Verify that I can take screenshot', async () => {
        testLogger.startTest('iOS Screenshot Capture');

        try {
            testLogger.logStep('SETUP', 'Starting screenshot capture test');

            testLogger.logStep('CAPTURE', 'Taking screenshot of current app state');
            const screenshot = await driver.saveScreenshot('./screenshots/ios_launch_test.png');

            testLogger.logStep('VERIFY', 'Verifying screenshot was captured successfully');
            expect(screenshot).to.not.be.null;

            testLogger.logStep('SUCCESS', 'Screenshot captured and saved successfully', 'success', {
                screenshotPath: './screenshots/ios_launch_test.png',
                screenshotSize: screenshot ? `${screenshot.length} bytes` : 'unknown'
            });

            // Take an additional screenshot with step logging
            await testLogger.logStepWithScreenshot('DEMO', 'Demonstrating step-by-step screenshot capture');

            testLogger.endTest('passed');

        } catch (error) {
            testLogger.logStep('ERROR', `Screenshot test failed: ${error.message}`, 'error', error);
            testLogger.endTest('failed', error);
            throw error;
        } finally {
            testLogger.saveToFile();
        }
    });
});