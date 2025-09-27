export const config = {
    runner: 'local',
    port: 4723,
    specs: [
        'test/mobile/**/*.spec.ts'
    ],
    tsConfigPath: './tsconfig.json',
    exclude: [],
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Pixel7',
        'appium:platformVersion': '16',
        'appium:automationName': 'UiAutomator2',
        'appium:app': '/Users/steveng8/Downloads/Book/dexApp.apk',
        'appium:autoGrantPermissions': true,
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 300
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: '',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        ['appium', {
            command: 'appium',
            args: {
                'base-path': '/',
                address: 'localhost',
                port: 4723,
                'relaxed-security': true
            },
            logPath: './logs/'
        }]
    ],
    framework: 'mocha',
    reporters: [
        'spec',
        ['html-nice', {
            outputDir: './html-reports/',
            filename: 'android-report.html',
            reportTitle: 'Android Test Report',
            linkScreenshots: true,
            showInBrowser: false,
            collapseTests: false,
            useOnAfterCommandForScreenshot: false
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    before: function (capabilities: any, specs: any) {
        console.log('Test session started');
    },
    beforeTest: function (test: any, context: any) {
        console.log(`Starting test: ${test.title}`);
    },
    afterTest: function(test: any, context: any, { error, result, duration, passed, retries }: any) {
        if (error) {
            console.log(`Test failed: ${test.title}`);
        } else {
            console.log(`Test passed: ${test.title}`);
        }
    },
    after: function (result: any, capabilities: any, specs: any) {
        console.log('Test session ended');
    }
};