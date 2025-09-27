export const config = {
    runner: 'local',
    specs: [
        'test/web/**/*.spec.ts'
    ],
    tsConfigPath: './tsconfig.json',
    exclude: [],
    maxInstances: 3,
    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-gpu',
                    '--window-size=1920,1080'
                ]
            }
        },
        {
            browserName: 'firefox',
            'moz:firefoxOptions': {
                args: ['--width=1920', '--height=1080']
            }
        }
    ],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://the-internet.herokuapp.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [],
    framework: 'mocha',
    reporters: [
        'spec',
        ['html-nice', {
            outputDir: './html-reports/',
            filename: 'web-report.html',
            reportTitle: 'Web Test Report',
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
    before: function () {
        console.log('Web test session started');
        browser.maximizeWindow();
    },
    beforeTest: function (test: any) {
        console.log(`Starting web test: ${test.title}`);
    },
    afterTest: function(test: any, _context: any, { error }: any) {
        if (error) {
            console.log(`Web test failed: ${test.title}`);
            // Take screenshot on failure
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            browser.saveScreenshot(`./screenshots/FAILED_${test.title}_${timestamp}.png`);
        } else {
            console.log(`Web test passed: ${test.title}`);
        }
    },
    after: function () {
        console.log('Web test session ended');
    }
};