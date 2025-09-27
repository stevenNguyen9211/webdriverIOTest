# 🍎 iOS Testing Guide

Hướng dẫn chi tiết để chạy automation testing cho iOS apps sử dụng Appium + WebDriverIO với XCUITest.

## Yêu cầu hệ thống

### Phần mềm cần thiết
- **macOS** (bắt buộc cho iOS testing)
- **Node.js** (version 16+)
- **Xcode** (latest version với Command Line Tools)
- **iOS Device** hoặc **iOS Simulator**

### Xcode và Code Signing Setup
```bash
# Cài đặt Xcode Command Line Tools
xcode-select --install

# Kiểm tra Xcode path
xcode-select -p

# Cài đặt iOS DevTools
brew install ios-deploy
brew install ideviceinstaller
```

### Cài đặt Appium và Drivers
```bash
# Cài đặt Appium globally
npm install -g appium

# Cài đặt XCUITest driver cho iOS
appium driver install xcuitest

# Kiểm tra driver đã cài đặt
appium driver list
```

## Chuẩn bị thiết bị và app

### iOS Real Device
1. **Enable Developer Mode** trên device
2. **Trust Developer** trong Settings > General > VPN & Device Management
3. Kết nối device qua USB
4. Kiểm tra UDID:
   ```bash
   instruments -s devices
   # hoặc
   idevice_id -l
   ```

### iOS Simulator
```bash
# List available simulators
xcrun simctl list devices

# Boot simulator
xcrun simctl boot "iPhone 15 Pro"

# Install app to simulator (if using .app file)
xcrun simctl install booted /path/to/YourApp.app
```

## Cấu hình

### File cấu hình: `config/wdio.ios.conf.ts`

#### Các tham số chính (dựa theo project Java của bạn):

```typescript
capabilities: [{
    platformName: 'iOS',
    'appium:deviceName': 'iPhone15prmBlue',        // Optional
    'appium:udid': '00008130-00161C620EE3803A',     // Required for real device
    'appium:platformVersion': '18.6.2',            // iOS version
    'appium:automationName': 'XCUITest',

    // App configuration - 2 cách:
    // Cách 1: Sử dụng bundleId (app đã cài sẵn)
    'appium:bundleId': 'nguyen.homecapp.welcomeApp',

    // Cách 2: Cài từ .ipa file
    // 'appium:app': '/absolute/path/to/YourApp.ipa',

    // Code signing (bắt buộc với real device)
    'appium:xcodeOrgId': '66Z2CMZ549',
    'appium:xcodeSigningId': 'Apple Development',
    'appium:updatedWDABundleId': 'nguyen.homecapp.WebDriverAgentRunner',
}]
```

### Cập nhật configuration cho setup của bạn

1. **Mở file** `config/wdio.ios.conf.ts`
2. **Cập nhật UDID** của device:
   ```bash
   instruments -s devices
   ```
3. **Cập nhật bundleId** của app cần test
4. **Cập nhật code signing** (xcodeOrgId, xcodeSigningId)
5. **Cập nhật platformVersion** theo iOS version

## Chạy tests

### Chuẩn bị môi trường
```bash
# 1. Khởi động Appium server
appium --relaxed-security --base-path /

# 2. Đảm bảo device/simulator sẵn sàng
instruments -s devices

# 3. Verify app bundle ID (nếu cần)
ideviceinstaller -l -u YOUR_UDID
```

### Chạy iOS tests
```bash
# Chạy tất cả iOS tests
npm run test:ios

# Chạy test cụ thể
npm run test:ios-launch      # App launch tests
npm run test:ios-basic       # Basic interactions
npm run test:ios-ui          # UI element tests

# Chạy specific test file
npx wdio run ./config/wdio.ios.conf.ts --spec test/ios/launchTest.spec.ts
```

## Test suites có sẵn

### 🚀 Launch Tests (`test/ios/launchTest.spec.ts`)
- Test app khởi động thành công
- Verify app state = RUNNING_IN_FOREGROUND
- Get device information
- Take screenshots

**Chạy:**
```bash
npm run test:ios-launch
```

### 📱 Basic Interactions (`test/ios/basic-interactions.spec.ts`)
- Device orientation changes
- Touch gestures (swipe, long press)
- App background/foreground
- Alert handling
- Shake gesture
- Page source debugging

**Chạy:**
```bash
npm run test:ios-basic
```

### 🎮 UI Elements (`test/ios/ui-elements.spec.ts`)
- Find buttons, text fields, labels
- Navigation bars, tab bars, toolbars
- Scroll view interactions
- Table view cells
- Input field testing

**Chạy:**
```bash
npm run test:ios-ui
```

## iOS Locator Strategies

### XPath với XCUITest elements
```typescript
// Buttons
await driver.$('//XCUIElementTypeButton[@name="Login"]')
await driver.$('//XCUIElementTypeButton[contains(@name, "Submit")]')

// Text elements
await driver.$('//XCUIElementTypeStaticText[@name="Welcome"]')
await driver.$('//XCUIElementTypeTextField[@name="username"]')

// Navigation
await driver.$('//XCUIElementTypeNavigationBar')
await driver.$('//XCUIElementTypeTabBar')

// Table views
await driver.$('//XCUIElementTypeTable')
await driver.$('//XCUIElementTypeCell')

// Scroll views
await driver.$('//XCUIElementTypeScrollView')
```

### Accessibility ID (Recommended)
```typescript
// Sử dụng accessibility identifier từ app
await driver.$('~login_button')
await driver.$('~username_field')
await driver.$('~welcome_message')
```

### Predicate locators
```typescript
// iOS specific predicate format
await driver.$('-ios predicate string:name == "Login"')
await driver.$('-ios predicate string:type == "XCUIElementTypeButton"')
await driver.$('-ios predicate string:enabled == 1')
```

### Class chain locators
```typescript
// iOS class chain format
await driver.$('-ios class chain:**/XCUIElementTypeButton[`name == "Login"`]')
await driver.$('-ios class chain:**/XCUIElementTypeNavigationBar/XCUIElementTypeButton')
```

## Gestures và Interactions

### Touch gestures
```typescript
// Tap
await element.click()

// Long press
await driver.touchAction([
    { action: 'press', x: 200, y: 300 },
    { action: 'wait', ms: 3000 },
    { action: 'release' }
]);

// Swipe
await driver.touchAction([
    { action: 'press', x: 200, y: 400 },
    { action: 'wait', ms: 500 },
    { action: 'moveTo', x: 200, y: 100 },
    { action: 'release' }
]);

// Pinch/Zoom
await driver.touchAction([
    { action: 'press', x: 100, y: 200 },
    { action: 'press', x: 200, y: 200 },
    { action: 'wait', ms: 500 },
    { action: 'moveTo', x: 50, y: 200 },
    { action: 'moveTo', x: 250, y: 200 },
    { action: 'release' }
]);
```

### Device interactions
```typescript
// Orientation
await driver.setOrientation('LANDSCAPE')
await driver.setOrientation('PORTRAIT')

// Shake
await driver.execute('mobile: shake')

// Background app
await driver.background(-1)
await driver.activateApp('your.bundle.id')

// Device info
const orientation = await driver.getOrientation()
const deviceTime = await driver.getDeviceTime()
const { width, height } = await driver.getWindowSize()
```

## Xử lý lỗi thường gặp

### 1. WebDriverAgent build failed
```bash
# Kiểm tra Xcode signing
open /Applications/Xcode.app

# Clear derived data
rm -rf ~/Library/Developer/Xcode/DerivedData

# Rebuild WebDriverAgent
cd /usr/local/lib/node_modules/appium/node_modules/appium-xcuitest-driver/WebDriverAgent
xcodebuild -project WebDriverAgent.xcodeproj -scheme WebDriverAgentRunner -destination 'id=YOUR_UDID' test
```

### 2. Code signing issues
```bash
# Check signing identity
security find-identity -v -p codesigning

# Update team ID and signing identity in config
'appium:xcodeOrgId': 'YOUR_TEAM_ID',
'appium:xcodeSigningId': 'Apple Development: your.email@example.com'
```

### 3. Device not found
```bash
# Check connected devices
instruments -s devices
idevice_id -l

# Restart device and reconnect
# Trust computer on device
```

### 4. App bundle ID not found
```bash
# List installed apps
ideviceinstaller -l -u YOUR_UDID

# Install app if needed
ideviceinstaller -i YourApp.ipa -u YOUR_UDID

# Verify bundle ID
ideviceinstaller -l -u YOUR_UDID | grep your.bundle.id
```

### 5. Simulator không khởi động
```bash
# List simulators
xcrun simctl list devices

# Boot specific simulator
xcrun simctl boot "iPhone 15 Pro"

# Reset simulator if needed
xcrun simctl erase "iPhone 15 Pro"
```

### 6. Element not found
- Sử dụng Appium Inspector để tìm element
- Thêm explicit waits
- Check app đã load xong chưa
- Verify element accessibility properties

```typescript
// Wait for element
await driver.waitUntil(async () => {
    const elements = await driver.$$('//XCUIElementTypeButton');
    return elements.length > 0;
}, { timeout: 10000 });
```

## Performance Tips

### Tối ưu hóa test execution
```typescript
// Use existing WebDriverAgent
'appium:usePrebuiltWDA': true,

// Custom derived data path
'appium:derivedDataPath': '/tmp/wda',

// Disable unnecessary features
'appium:showIOSLog': false,
'appium:clearSystemFiles': false,

// Increase timeouts for iOS
'appium:wdaLaunchTimeout': 180000,
'appium:wdaConnectionTimeout': 120000,
```

### Parallel testing (nếu có nhiều devices)
```typescript
capabilities: [
    {
        platformName: 'iOS',
        'appium:udid': 'DEVICE_1_UDID',
        'appium:wdaLocalPort': 8100,
        // ...
    },
    {
        platformName: 'iOS',
        'appium:udid': 'DEVICE_2_UDID',
        'appium:wdaLocalPort': 8101,
        // ...
    }
]
```

## Best Practices

### 1. Test organization
```typescript
describe('iOS App Feature', () => {
    beforeEach(async () => {
        // Reset app state
        await driver.execute('mobile: terminateApp', { bundleId: 'your.app.id' });
        await driver.execute('mobile: launchApp', { bundleId: 'your.app.id' });
    });

    afterEach(async () => {
        // Take screenshot on failure
        if (this.currentTest?.state === 'failed') {
            await driver.saveScreenshot(`./screenshots/${this.currentTest.title}.png`);
        }
    });
});
```

### 2. Element handling
```typescript
class IOSPage {
    private loginButton = '~login_button';

    async tapLogin() {
        const button = await driver.$(this.loginButton);
        await button.waitForDisplayed({ timeout: 10000 });
        await button.click();
    }
}
```

### 3. Wait strategies
```typescript
// Wait for element
await element.waitForDisplayed({ timeout: 10000 });

// Wait for condition
await driver.waitUntil(async () => {
    const appState = await driver.queryAppState('your.app.id');
    return appState === 4; // RUNNING_IN_FOREGROUND
});

// Wait for page load
await driver.pause(2000); // Use sparingly
```

### 4. Error handling
```typescript
try {
    await driver.acceptAlert();
} catch (error) {
    console.log('No alert present');
    // Continue with test
}
```

## Environment Variables

Bạn có thể sử dụng environment variables để manage different configurations:

```bash
# .env file
IOS_UDID=00008130-00161C620EE3803A
IOS_BUNDLE_ID=nguyen.homecapp.welcomeApp
XCODE_ORG_ID=66Z2CMZ549
```

```typescript
// config/wdio.ios.conf.ts
'appium:udid': process.env.IOS_UDID,
'appium:bundleId': process.env.IOS_BUNDLE_ID,
'appium:xcodeOrgId': process.env.XCODE_ORG_ID,
```

## Tài liệu tham khảo

- [Appium XCUITest Driver](https://appium.github.io/appium-xcuitest-driver/)
- [iOS Real Device Setup](https://appium.io/docs/en/drivers/ios-xcuitest-real-devices/)
- [XCUITest Element Types](https://developer.apple.com/documentation/xctest/xcuielementtype)
- [WebDriverIO iOS Testing](https://webdriver.io/docs/mobile-testing)
- [Appium Inspector](https://github.com/appium/appium-inspector)