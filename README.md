# WebDriverIO Multi-Platform Testing Framework

Comprehensive testing framework supporting both **Android Mobile Apps** (via Appium) and **Web Browsers** (via Selenium) using WebDriverIO with TypeScript.

## 📚 Quick Start Guides

Choose your testing type for detailed setup and usage instructions:

- **📱 [Mobile Testing Guide](./MOBILE_TESTING_GUIDE.md)** - Android app automation with Appium
- **🍎 [iOS Testing Guide](./IOS_TESTING_GUIDE.md)** - iOS app automation with XCUITest
- **🌐 [Web Testing Guide](./WEB_TESTING_GUIDE.md)** - Browser automation with Selenium

## Features

✅ **Multi-Platform Support**
- 📱 Android Mobile App Testing (Appium + UiAutomator2)
- 🍎 iOS Mobile App Testing (Appium + XCUITest)
- 🌐 Web Browser Testing (Selenium + ChromeDriver/GeckoDriver)

✅ **Modern Tech Stack**
- TypeScript for type safety
- WebDriverIO 9.x latest version
- Appium 3.0 with improved architecture
- Comprehensive test suites

✅ **Rich Test Coverage**
- Login/Authentication flows
- Form interactions (dropdowns, checkboxes, file uploads)
- Navigation and window handling
- UI interactions (hover, drag-drop, context menu)
- Mobile responsive testing

## Quick Installation

```bash
git clone <repository-url>
cd webdriverio-multi-platform-demo
npm install
```

## Quick Commands

```bash
# Web browser tests (Chrome + Firefox)
npm run test:web

# Android mobile tests
npm run test:android

# Mobile web tests (responsive)
npm run test:mobile-web

# Run all tests
npm run test:all
```

## Detailed Setup & Usage

For comprehensive setup instructions, troubleshooting, and advanced usage, please refer to the dedicated guides:

- **📱 [Mobile Testing Guide](./MOBILE_TESTING_GUIDE.md)** - Complete Android testing setup
- **🌐 [Web Testing Guide](./WEB_TESTING_GUIDE.md)** - Complete web testing setup

## Project Structure

```
webdriverio-multi-platform-demo/
├── config/
│   ├── wdio.conf.ts              # Android mobile config
│   ├── wdio.web.conf.ts          # Web browser config
│   └── wdio.mobile-web.conf.ts   # Mobile web config
├── test/
│   ├── android/                  # Android mobile tests
│   │   ├── calculator.spec.ts
│   │   ├── basic-interactions.spec.ts
│   │   └── launchTest.spec.ts
│   ├── web/                      # Web browser tests
│   │   ├── login.spec.ts
│   │   ├── form-interactions.spec.ts
│   │   ├── navigation.spec.ts
│   │   └── ui-interactions.spec.ts
│   └── mobile-web/               # Mobile web tests
│       └── responsive.spec.ts
├── src/
│   ├── helpers.ts               # Android helpers
│   └── web-helpers.ts           # Web browser helpers
├── logs/                        # Log files
├── screenshots/                 # Screenshot files
├── tsconfig.json               # TypeScript configuration
├── wdio-global.d.ts           # Global type definitions
└── package.json
```

## Available Test Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run web tests (default) |
| `npm run test:web` | Run all web browser tests |
| `npm run test:android` | Run Android mobile tests |
| `npm run test:ios` | Run iOS mobile tests |
| `npm run test:all` | Run all test suites sequentially |
| `npm run test:web-login` | Run login functionality tests |
| `npm run test:web-forms` | Run form interaction tests |
| `npm run test:web-navigation` | Run navigation tests |
| `npm run test:web-ui` | Run UI interaction tests |
| `npm run test:ios-launch` | Run iOS app launch tests |
| `npm run test:ios-basic` | Run iOS basic interaction tests |
| `npm run test:ios-ui` | Run iOS UI element tests |
| `npm run report:open` | Open HTML reports directory |
| `npm run report:web` | Open web test HTML report |
| `npm run report:android` | Open Android test HTML report |
| `npm run report:ios` | Open iOS test HTML report |

## 📊 Test Reporting

Project uses **HTML Nice Reporter** for lightweight, clean test reports:

```bash
# Run tests (reports auto-generated)
npm run test:web

# Open specific platform reports
npm run report:web        # Web test report
npm run report:android    # Android test report
npm run report:ios        # iOS test report

# Open all reports directory
npm run report:open
```

**HTML Reporter Features:**
- ✅ Lightweight and fast
- 📊 Clean, readable HTML format
- 🖼️ Screenshots on failure
- 📝 Test execution details
- 🏷️ Collapsible test groups
- 🌐 No external dependencies

## Helper Classes

The project includes comprehensive helper classes for both web and mobile testing:

- **WebHelpers** (`src/web-helpers.ts`) - 60+ utility methods for web automation
- **AndroidHelpers** (`src/helpers.ts`) - Mobile-specific automation utilities

See the detailed guides for complete API documentation and usage examples.

## Test Coverage

### 🌐 Web Browser Tests
- **Login/Authentication** - Valid/invalid credentials, logout flows
- **Form Interactions** - Dropdowns, checkboxes, file uploads
- **Navigation** - Browser controls, windows/tabs, frames, alerts
- **UI Interactions** - Hover, drag-drop, context menus, scrolling

### 📱 Android Mobile Tests
- **Calculator App** - Arithmetic operations, clear functionality
- **Device Interactions** - Orientation, gestures, screenshots
- **App Lifecycle** - Launch, background, foreground states

### 🍎 iOS Mobile Tests
- **App Launch** - Bundle ID activation, app state verification
- **Device Interactions** - Orientation, touch gestures, shake
- **UI Elements** - Buttons, text fields, table views, scroll views
- **App Lifecycle** - Background/foreground, app state management


## Resources

- **📚 [Mobile Testing Guide](./MOBILE_TESTING_GUIDE.md)** - Complete Android automation setup
- **📚 [iOS Testing Guide](./IOS_TESTING_GUIDE.md)** - Complete iOS automation setup
- **📚 [Web Testing Guide](./WEB_TESTING_GUIDE.md)** - Complete web automation setup
- [WebDriverIO Documentation](https://webdriver.io/)
- [Appium Documentation](https://appium.io/)
- [XCUITest Driver](https://appium.github.io/appium-xcuitest-driver/)
- [Selenium Documentation](https://selenium-python.readthedocs.io/)