# WebDriverIO + Appium Android Testing Demo

Dự án demo đơn giản sử dụng WebDriverIO kết hợp với Appium để test ứng dụng Android.

## Yêu cầu hệ thống

### Cài đặt cơ bản
- Node.js (version 16+)
- npm hoặc yarn
- Java JDK 8+
- Android SDK
- Android Studio (hoặc command line tools)

### Thiết lập Android SDK
1. Cài đặt Android Studio
2. Thiết lập ANDROID_HOME environment variable
3. Thêm Android SDK tools vào PATH

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Cài đặt Appium Server
```bash
npm install -g appium
appium driver install uiautomator2
```

## Cấu trúc project

```
WebDriverIODemo/
├── config/
│   └── wdio.conf.js          # Cấu hình WebDriverIO
├── test/
│   ├── calculator.spec.js     # Test ứng dụng Calculator
│   └── basic-interactions.spec.js # Test các tương tác cơ bản
├── src/
│   └── helpers.js            # Các helper functions
├── logs/                     # Log files
├── screenshots/              # Screenshot files
└── package.json
```

## Cách sử dụng

### 1. Cài đặt dependencies
```bash
cd /Users/steveng8/Documents/WebDriverIODemo
npm install
```

### 2. Thiết lập Android Emulator hoặc Device
- Tạo và khởi động Android emulator
- Hoặc kết nối Android device với USB debugging enabled

### 3. Cập nhật cấu hình
Chỉnh sửa file `config/wdio.conf.js`:
- `deviceName`: Tên device/emulator
- `platformVersion`: Phiên bản Android
- `app`: Đường dẫn đến file APK (nếu test app riêng)

### 4. Chạy tests

#### Chạy tất cả tests:
```bash
npm test
```

#### Chạy test cụ thể:
```bash
npx wdio run ./config/wdio.conf.js --spec ./test/calculator.spec.js
```

## Các test có sẵn

### 1. Calculator Tests (`calculator.spec.js`)
- Test phép cộng cơ bản
- Test phép trừ cơ bản
- Test chức năng clear

### 2. Basic Interactions (`basic-interactions.spec.js`)
- Lấy thông tin device
- Thay đổi orientation
- Thực hiện swipe gesture
- Chụp screenshot
- Background/foreground app

## Helper Functions

File `src/helpers.js` chứa các helper functions hữu ích:

- `waitForElement()`: Chờ element xuất hiện
- `findElementByText()`: Tìm element bằng text
- `scrollToElement()`: Scroll để tìm element
- `takeScreenshotWithName()`: Chụp screenshot với tên
- `swipeLeft/Right()`: Vuốt trái/phải
- `pressBack/Home()`: Nhấn nút Back/Home

## Sử dụng Helper Functions

```javascript
const AndroidHelpers = require('../src/helpers');

// Trong test
it('should scroll and find element', async () => {
    const element = await AndroidHelpers.scrollToElement('//android.widget.Button[@text="Submit"]');
    await element.click();
});
```

## Troubleshooting

### Lỗi thường gặp:

1. **Appium server not running**
   ```bash
   appium --relaxed-security
   ```

2. **Device not found**
   - Kiểm tra `adb devices`
   - Đảm bảo USB debugging enabled

3. **App not installed**
   - Cài đặt app trước khi chạy test
   - Hoặc cập nhật đường dẫn APK trong config

4. **Element not found**
   - Sử dụng Appium Inspector để tìm locator chính xác
   - Thêm wait time cho element

## Ghi chú

- Project này được thiết lập để test ứng dụng Calculator mặc định của Android
- Có thể tùy chỉnh để test các ứng dụng khác bằng cách thay đổi package name và locators
- Screenshots và logs sẽ được lưu trong thư mục tương ứng

## Tài liệu tham khảo

- [WebDriverIO Documentation](https://webdriver.io/)
- [Appium Documentation](https://appium.io/)
- [Android Testing Guide](https://developer.android.com/training/testing)