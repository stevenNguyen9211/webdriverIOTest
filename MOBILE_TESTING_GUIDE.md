# 📱 Mobile Testing Guide

Hướng dẫn chi tiết để chạy automation testing cho Android mobile apps sử dụng Appium + WebDriverIO.

## Yêu cầu hệ thống

### Phần mềm cần thiết
- **Node.js** (version 16+)
- **Java JDK** 8 hoặc mới hơn
- **Android SDK**
- **Android Studio** (hoặc command line tools)

### Thiết lập Android SDK
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Cài đặt Appium
```bash
# Cài đặt Appium globally
npm install -g appium

# Cài đặt UiAutomator2 driver
appium driver install uiautomator2

# Kiểm tra cài đặt
appium --version
appium driver list
```

## Chuẩn bị thiết bị

### Thiết bị thật (Real Device)
1. Bật **Developer Options**
2. Bật **USB Debugging**
3. Kết nối thiết bị qua USB
4. Kiểm tra kết nối:
   ```bash
   adb devices
   ```

### Emulator
1. Tạo emulator từ Android Studio
2. Khởi động emulator:
   ```bash
   emulator -avd <emulator_name>
   ```

## Cấu hình

### File cấu hình: `config/wdio.conf.ts`
```typescript
capabilities: [{
    platformName: 'Android',
    'appium:deviceName': 'Pixel7',          // Tên thiết bị
    'appium:platformVersion': '16',          // Android version
    'appium:automationName': 'UiAutomator2',
    'appium:app': '/path/to/your/app.apk',   // Đường dẫn APK
    'appium:autoGrantPermissions': true,
    'appium:noReset': false,
    'appium:fullReset': false
}]
```

### Cập nhật cấu hình cho thiết bị của bạn
1. Mở file `config/wdio.conf.ts`
2. Cập nhật `deviceName` và `platformVersion`
3. Cập nhật đường dẫn APK trong `app`

## Chạy tests

### Khởi động Appium server
```bash
# Chạy Appium server (terminal riêng)
appium --relaxed-security --base-path /
```

### Chạy mobile tests
```bash
# Chạy tất cả Android tests
npm run test:android

# Chạy test cụ thể
npx wdio run ./config/wdio.conf.ts --spec test/calculator.spec.ts
npx wdio run ./config/wdio.conf.ts --spec test/basic-interactions.spec.ts
```

## Test suites có sẵn

### 🧮 Calculator Tests (`test/calculator.spec.ts`)
- Test phép cộng, trừ, nhân, chia
- Test chức năng clear
- Test hiển thị kết quả

**Chạy:**
```bash
npx wdio run ./config/wdio.conf.ts --spec test/calculator.spec.ts
```

### 📱 Basic Interactions (`test/basic-interactions.spec.ts`)
- Lấy thông tin thiết bị
- Thay đổi hướng màn hình
- Touch gestures
- Chụp screenshot
- Quản lý app state

**Chạy:**
```bash
npx wdio run ./config/wdio.conf.ts --spec test/basic-interactions.spec.ts
```

### 🚀 Launch Test (`test/launchTest.spec.ts`)
- Test khởi động app cơ bản

**Chạy:**
```bash
npx wdio run ./config/wdio.conf.ts --spec test/launchTest.spec.ts
```

## Sử dụng AndroidHelpers

### Import và sử dụng
```typescript
import AndroidHelpers from '../src/helpers';

// Tìm và tương tác với element
const button = await AndroidHelpers.waitForElement('//android.widget.Button[@text="="]');
await button.click();

// Scroll đến element
await AndroidHelpers.scrollToElement('selector');

// Chụp screenshot
await AndroidHelpers.takeScreenshotWithName('calculation-result');

// Navigation
await AndroidHelpers.pressBack();
```

### Các method hữu ích
- `waitForElement(selector)` - Đợi element xuất hiện
- `scrollToElement(selector)` - Scroll đến element
- `takeScreenshotWithName(name)` - Chụp screenshot với tên
- `pressBack()` - Nhấn nút Back
- `getDeviceInfo()` - Lấy thông tin thiết bị

## Locator strategies

### Android locators phổ biến
```typescript
// Resource ID
await $('~resource-id')

// XPath với text
await $('//android.widget.Button[@text="Calculator"]')

// XPath với resource-id
await $('//android.widget.EditText[@resource-id="com.android.calculator2:id/result"]')

// Class name
await $('android.widget.Button')

// Accessibility ID
await $('~content-desc')
```

### Tips tìm locator
1. Sử dụng **Appium Inspector**
2. Sử dụng **uiautomatorviewer** (Android SDK tools)
3. Sử dụng **adb shell uiautomator dump**

## Xử lý lỗi thường gặp

### 1. Appium server không khởi động
```bash
# Kiểm tra port có bị chiếm không
lsof -i :4723

# Khởi động với port khác
appium --port 4724
```

### 2. Device không tìm thấy
```bash
# Kiểm tra danh sách devices
adb devices

# Restart adb server
adb kill-server
adb start-server
```

### 3. App không cài đặt được
```bash
# Cài đặt manual
adb install /path/to/app.apk

# Kiểm tra app đã cài đặt
adb shell pm list packages | grep <package_name>
```

### 4. Element không tìm thấy
- Thêm thời gian wait dài hơn
- Kiểm tra lại locator với Appium Inspector
- Đảm bảo element visible trên màn hình
- Sử dụng scroll trước khi tìm element

### 5. Session bị terminate
```bash
# Kiểm tra Appium logs
# Restart Appium server
# Đảm bảo thiết bị vẫn kết nối
```

## Performance tips

### Tối ưu hóa test execution
1. **Sử dụng `noReset: true`** để không reset app mỗi lần test
2. **Parallel execution** cho multiple devices
3. **Page Object Model** để tái sử dụng code
4. **Data-driven testing** để test multiple scenarios

### Cấu hình parallel testing
```typescript
// wdio.conf.ts
maxInstances: 2,
capabilities: [
    {
        platformName: 'Android',
        'appium:deviceName': 'Device1',
        // ...
    },
    {
        platformName: 'Android',
        'appium:deviceName': 'Device2',
        // ...
    }
]
```

## Best practices

### 1. Test organization
- Nhóm tests theo chức năng
- Sử dụng describe blocks rõ ràng
- Tách test data ra file riêng

### 2. Element handling
- Luôn sử dụng explicit waits
- Không hardcode thời gian wait
- Sử dụng try-catch cho optional elements

### 3. Test data management
- Không hardcode test data trong test
- Sử dụng environment variables cho sensitive data
- Tạo test data setup/cleanup

### 4. Reporting
- Screenshot khi test fail
- Log chi tiết các bước test
- Sử dụng Allure hoặc reporter khác

## Tài liệu tham khảo

- [Appium Documentation](https://appium.io/docs/en/about-appium/intro/)
- [UiAutomator2 Driver](https://github.com/appium/appium-uiautomator2-driver)
- [Android Testing Guide](https://developer.android.com/training/testing)
- [WebDriverIO Mobile Testing](https://webdriver.io/docs/mobile-testing)