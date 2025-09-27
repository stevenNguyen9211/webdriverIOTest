export const config = {
    runner: 'local',
    port: 4723,
    specs: [
        'test/ios/**/*.spec.ts'
    ],
    tsConfigPath: './tsconfig.json',
    exclude: [],
    maxInstances: 1,
    capabilities: [{
        platformName: 'iOS',
        'appium:deviceName': 'iPhone15prmBlue',        // Optional: device name
        'appium:udid': '00008130-00161C620EE3803A',     // Required for real device
        'appium:platformVersion': '18.6.2',            // iOS version, can be empty ""
        'appium:automationName': 'XCUITest',

        // App configuration - choose one method:
        // Method 1: Use bundleId for already installed app
        'appium:bundleId': 'nguyen.homecapp.welcomeApp',

        // Method 2: Install from .ipa file (uncomment if needed)
        // 'appium:app': '/absolute/path/to/YourApp.ipa',

        // Required for real device testing (code signing)
        'appium:xcodeOrgId': '66Z2CMZ549',
        'appium:xcodeSigningId': 'Apple Development',   // Must match Xcode signing identity
        'appium:updatedWDABundleId': 'nguyen.homecapp.WebDriverAgentRunner',

        // Optional settings
        'appium:autoGrantPermissions': true,
        'appium:noReset': false,                        // Keep app data between sessions
        'appium:fullReset': false,                      // Don't uninstall app
        'appium:newCommandTimeout': 300,                // Session timeout (seconds)
        'appium:wdaLaunchTimeout': 180000,             // WebDriverAgent launch timeout (ms)
        'appium:wdaConnectionTimeout': 120000,          // WebDriverAgent connection timeout (ms)

        // Performance settings
        'appium:usePrebuiltWDA': true,                  // Use existing WebDriverAgent
        'appium:derivedDataPath': '/tmp/wda',           // Custom derived data path
        'appium:useSimpleBuildTest': false,             // Disable for complex apps

        // Debugging options
        'appium:showIOSLog': false,                     // Show iOS device logs
        'appium:realDeviceLogger': '/usr/local/lib/node_modules/deviceconsole/deviceconsole',
        'appium:clearSystemFiles': false,               // Don't clear system files
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: '',
    waitforTimeout: 30000,                              // Increased for iOS
    connectionRetryTimeout: 180000,                     // Increased for iOS
    connectionRetryCount: 3,
    services: [
        ['appium', {
            command: 'appium',
            args: {
                'base-path': '/',
                address: 'localhost',
                port: 4723,
                'relaxed-security': true,
                'log-level': 'info'
            },
            logPath: './logs/'
        }]
    ],
    framework: 'mocha',
    reporters: [
        'spec',
        ['html-nice', {
            outputDir: './html-reports/',
            filename: 'ios-report.html',
            reportTitle: 'iOS Test Report',
            linkScreenshots: true,
            showInBrowser: false,
            collapseTests: false,
            useOnAfterCommandForScreenshot: false
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 120000                                 // Increased timeout for iOS
    },
    before: function (capabilities: any, specs: any) {
        console.log('iOS test session started');
        console.log('Device UDID:', capabilities['appium:udid']);
        console.log('Bundle ID:', capabilities['appium:bundleId']);
    },
    beforeTest: function (test: any, context: any) {
        console.log(`Starting iOS test: ${test.title}`);
    },
    afterTest: function(test: any, context: any, { error, result, duration, passed, retries }: any) {
        if (error) {
            console.log(`iOS test failed: ${test.title}`);
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            driver.saveScreenshot(`./screenshots/iOS_FAILED_${test.title}_${timestamp}.png`);
        } else {
            console.log(`iOS test passed: ${test.title}`);
        }
    },
    after: function (result: any, capabilities: any, specs: any) {
        console.log('iOS test session ended');
    }
};