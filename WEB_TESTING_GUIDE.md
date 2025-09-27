# 🌐 Web Testing Guide

Hướng dẫn chi tiết để chạy automation testing cho web browsers sử dụng Selenium + WebDriverIO.

## Yêu cầu hệ thống

### Phần mềm cần thiết
- **Node.js** (version 16+)
- **Chrome browser** (latest version)
- **Firefox browser** (optional)

### Drivers tự động quản lý
WebDriverIO 9.x tự động quản lý drivers:
- Tự động download và setup ChromeDriver
- Tự động download và setup GeckoDriver (Firefox)
- Kết nối trực tiếp với browser drivers (không cần Selenium server)
- Sử dụng WebDriver protocol native từ driver

## Cấu hình

### File cấu hình chính: `config/wdio.web.conf.ts`

#### Multi-browser testing
```typescript
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
]
```

#### Modern configuration (No Selenium server needed)
```typescript
export const config = {
    runner: 'local',
    specs: ['test/web/**/*.spec.ts'],
    maxInstances: 3,
    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: ['--no-sandbox', '--disable-dev-shm-usage']
            }
        },
        {
            browserName: 'firefox',
            'moz:firefoxOptions': {
                args: ['--width=1920', '--height=1080']
            }
        }
    ],
    services: [], // No services needed - WebDriverIO handles drivers automatically
    baseUrl: 'https://the-internet.herokuapp.com'
}
```

### HTML Reporting Configuration
```typescript
reporters: [
    'spec',
    ['html-nice', {
        outputDir: './html-reports/',
        filename: 'web-report.html',
        reportTitle: 'Web Test Report',
        linkScreenshots: true,
        showInBrowser: false,
        collapseTests: false
    }]
]
```

## Chạy tests

### Chạy web tests
```bash
# Chạy tất cả web tests (Chrome + Firefox)
npm run test:web

# Chạy web tests (default)
npm test

# Xem HTML reports
npm run report:web
```

### Chạy test suites cụ thể
```bash
# Test login functionality
npm run test:web-login

# Test form interactions
npm run test:web-forms

# Test navigation features
npm run test:web-navigation

# Test UI interactions
npm run test:web-ui
```

### Chạy tests với Chrome only
```bash
npx wdio run ./config/wdio.web.conf.ts --spec test/web/**/*.spec.ts
```

### Chạy test file cụ thể
```bash
# Specific test file
npx wdio run ./config/wdio.web.conf.ts --spec test/web/login.spec.ts

# Multiple test files
npx wdio run ./config/wdio.web.conf.ts --spec test/web/login.spec.ts --spec test/web/form-interactions.spec.ts
```

## Test suites có sẵn

### 🔐 Login Tests (`test/web/login.spec.ts`)

**Chức năng test:**
- ✅ Login với credentials hợp lệ
- ❌ Login với credentials không hợp lệ
- ❌ Login với fields trống
- 🚪 Logout sau khi login thành công

**Chạy:**
```bash
npm run test:web-login
```

**Sample test:**
```typescript
it('should login with valid credentials', async () => {
    await WebHelpers.clearAndType('#username', 'tomsmith');
    await WebHelpers.clearAndType('#password', 'SuperSecretPassword!');
    await loginButton.click();

    await WebHelpers.waitForUrl('/secure');
    const successMessage = await WebHelpers.waitForElement('.flash.success');
    expect(messageText).to.include('You logged into a secure area!');
});
```

### 📝 Form Interactions (`test/web/form-interactions.spec.ts`)

**Chức năng test:**
- Dropdown selections
- Checkbox interactions
- Radio button selections
- File uploads
- Input field handling
- Form validation

**Chạy:**
```bash
npm run test:web-forms
```

### 🧭 Navigation Tests (`test/web/navigation.spec.ts`)

**Chức năng test:**
- Browser navigation (back/forward)
- Multiple windows/tabs handling
- Frame switching
- JavaScript alerts
- URL navigation

**Chạy:**
```bash
npm run test:web-navigation
```

### 🎮 UI Interactions (`test/web/ui-interactions.spec.ts`)

**Chức năng test:**
- Hover effects
- Drag and drop
- Context menus (right-click)
- Dynamic content
- Scrolling behaviors
- Keyboard interactions

**Chạy:**
```bash
npm run test:web-ui
```

## 📊 Test Reporting với HTML Reporter

Project sử dụng **HTML Nice Reporter** để tạo báo cáo test nhẹ và đẹp mắt.

### Tạo và xem reports
```bash
# Chạy tests (report tự động tạo)
npm run test:web

# Xem report
npm run report:web              # Mở web test report
npm run report:open            # Mở thư mục tất cả reports
```

### Tính năng HTML Reporter
- **📊 Dashboard gọn nhẹ** - Thống kê pass/fail, thời gian chạy
- **📝 Chi tiết từng test** - Test steps, status, timing
- **🖼️ Screenshots** - Tự động chụp khi test fail
- **🏷️ Collapsible groups** - Thu gọn/mở rộng test suites
- **🌐 Không phụ thuộc** - Chỉ cần browser, không cần server
- **⚡ Nhanh và nhẹ** - Load tức thì, file size nhỏ
- **🎨 Clean UI** - Giao diện sạch, dễ đọc

## Sử dụng WebHelpers

### Import và basic usage
```typescript
import WebHelpers from '../../src/web-helpers';

// Element interactions
const element = await WebHelpers.waitForElement('#username');
await WebHelpers.clearAndType('#username', 'testuser');
const button = await WebHelpers.waitForElementClickable('button[type="submit"]');
```

### Element handling methods

#### Tìm và đợi elements
```typescript
// Đợi element xuất hiện
await WebHelpers.waitForElement('#selector', 10000);

// Đợi element clickable
await WebHelpers.waitForElementClickable('button', 5000);

// Đợi text xuất hiện trong element
await WebHelpers.waitForText('.message', 'Success', 8000);
```

#### Tương tác với elements
```typescript
// Clear và type text
await WebHelpers.clearAndType('#input', 'new value');

// Click variations
await element.click();
await WebHelpers.doubleClick('#element');
await WebHelpers.rightClick('#element');

// Hover
await WebHelpers.hoverOverElement('.menu-item');

// Drag and drop
await WebHelpers.dragAndDrop('#source', '#target');
```

#### Form interactions
```typescript
// Dropdown selections
await WebHelpers.selectDropdownByText('select', 'Option 1');
await WebHelpers.selectDropdownByValue('select', 'value1');
await WebHelpers.selectDropdownByIndex('select', 0);

// File upload
await WebHelpers.uploadFile('input[type="file"]', '/path/to/file.jpg');
```

### Navigation methods
```typescript
// URL navigation
await WebHelpers.waitForUrl('/dashboard');
await WebHelpers.waitForTitle('Dashboard');

// Browser navigation
await WebHelpers.navigateBack();
await WebHelpers.navigateForward();
await WebHelpers.refresh();
```

### Window & Tab handling
```typescript
// Multiple windows
const handles = await WebHelpers.getWindowHandles();
await WebHelpers.switchToWindow(handles[1]);

// New tab
await WebHelpers.openNewTab('https://example.com');
await WebHelpers.closeCurrentTab();

// Frames
await WebHelpers.switchToFrame('#iframe');
await WebHelpers.switchToDefaultContent();
```

### Scrolling methods
```typescript
// Scroll operations
await WebHelpers.scrollToElement('#bottom-element');
await WebHelpers.scrollToTop();
await WebHelpers.scrollToBottom();
await WebHelpers.scrollByOffset(0, 500);
```

### JavaScript execution
```typescript
// Execute custom JavaScript
const result = await WebHelpers.executeScript('return document.title;');

// Execute with parameters
await WebHelpers.executeScript('arguments[0].style.border = "2px solid red"', element);
```

### Alerts handling
```typescript
// JavaScript alerts
await WebHelpers.acceptAlert();
await WebHelpers.dismissAlert();
const alertText = await WebHelpers.getAlertText();
await WebHelpers.sendAlertText('input text');
```

### Screenshots & utilities
```typescript
// Take screenshot
await WebHelpers.takeScreenshot('test-completed');

// Element properties
const isVisible = await WebHelpers.isElementVisible('#element');
const isEnabled = await WebHelpers.isElementEnabled('#button');
const attribute = await WebHelpers.getElementAttribute('#link', 'href');
const cssProperty = await WebHelpers.getCSSProperty('#element', 'color');
```

### Cookie management
```typescript
// Cookie operations
await WebHelpers.setCookie({ name: 'session', value: 'abc123' });
const cookies = await WebHelpers.getCookies();
await WebHelpers.deleteCookies();
```

## Locator strategies

### CSS Selectors (Recommended)
```typescript
// ID
await $('#username')

// Class
await $('.btn-primary')

// Attribute
await $('[data-testid="submit-btn"]')

// Hierarchical
await $('.form .input-group input[type="email"]')

// Pseudo-selectors
await $('li:first-child')
await $('tr:nth-child(2)')
```

### XPath (Fallback)
```typescript
// Text content
await $('//button[text()="Submit"]')

// Contains text
await $('//div[contains(text(), "Success")]')

// Attribute contains
await $('//input[contains(@class, "form-control")]')

// Parent/Child relationships
await $('//form//input[@type="email"]')
```

### Advanced selectors
```typescript
// Multiple attributes
await $('input[type="text"][name="username"]')

// Sibling selectors
await $('.label + input')

// Child selectors
await $('.form > .input-group > input')
```

## Test data management

### Environment-based configuration
```typescript
// config/environments.ts
export const environments = {
    staging: {
        baseUrl: 'https://staging.example.com',
        users: {
            admin: { username: 'admin', password: 'pass123' }
        }
    },
    production: {
        baseUrl: 'https://example.com',
        users: {
            admin: { username: 'prod_admin', password: 'secure_pass' }
        }
    }
};
```

### Test data files
```typescript
// test/data/users.json
{
    "validUser": {
        "username": "tomsmith",
        "password": "SuperSecretPassword!"
    },
    "invalidUser": {
        "username": "wronguser",
        "password": "wrongpass"
    }
}

// Usage in test
import userData from '../data/users.json';
await WebHelpers.clearAndType('#username', userData.validUser.username);
```

## Page Object Model

### Page class example
```typescript
// pages/LoginPage.ts
class LoginPage {
    private usernameInput = '#username';
    private passwordInput = '#password';
    private loginButton = 'button[type="submit"]';
    private errorMessage = '.flash.error';

    async login(username: string, password: string) {
        await WebHelpers.clearAndType(this.usernameInput, username);
        await WebHelpers.clearAndType(this.passwordInput, password);
        const button = await WebHelpers.waitForElementClickable(this.loginButton);
        await button.click();
    }

    async getErrorMessage() {
        const element = await WebHelpers.waitForElement(this.errorMessage);
        return await element.getText();
    }
}

export default new LoginPage();
```

### Usage in tests
```typescript
import LoginPage from '../pages/LoginPage';

it('should show error for invalid login', async () => {
    await browser.url('/login');
    await LoginPage.login('invalid', 'credentials');

    const errorMsg = await LoginPage.getErrorMessage();
    expect(errorMsg).to.include('Your username is invalid!');
});
```

## Debugging tips

### Visual debugging
```typescript
// Pause execution for debugging
await browser.debug();

// Highlight element before interaction
await browser.execute((selector) => {
    document.querySelector(selector).style.border = '3px solid red';
}, '#element');

// Take screenshot at specific points
await WebHelpers.takeScreenshot('before-click');
await element.click();
await WebHelpers.takeScreenshot('after-click');
```

### Console logging
```typescript
// Log current URL
console.log('Current URL:', await browser.getUrl());

// Log element text
const element = await $('#element');
console.log('Element text:', await element.getText());

// Log page title
console.log('Page title:', await browser.getTitle());
```

### Wait strategies
```typescript
// Wait for element to be displayed
await element.waitForDisplayed({ timeout: 10000 });

// Wait for element to exist in DOM
await element.waitForExist({ timeout: 5000 });

// Wait for element to be clickable
await element.waitForClickable({ timeout: 8000 });

// Custom wait condition
await browser.waitUntil(async () => {
    const elements = await $$('.dynamic-item');
    return elements.length > 5;
}, { timeout: 10000, timeoutMsg: 'Expected more than 5 items' });
```

## Performance optimization

### Parallel execution
```typescript
// wdio.web.conf.ts
maxInstances: 3,  // Run up to 3 browsers simultaneously
capabilities: [
    {
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--no-sandbox', '--disable-dev-shm-usage']
        }
    },
    {
        browserName: 'firefox',
        'moz:firefoxOptions': {
            args: ['--headless'] // Optional: run headless for faster execution
        }
    }
]
```

### Advantages of Direct Driver Connection
- **Faster startup** - No Selenium server overhead
- **Better stability** - Direct WebDriver protocol communication
- **Simpler setup** - WebDriverIO handles driver management automatically
- **Less memory usage** - No intermediate Selenium layer

### Smart waits
```typescript
// Instead of fixed sleep
await browser.pause(3000);  // ❌ Bad

// Use dynamic waits
await WebHelpers.waitForElement('#result');  // ✅ Good
```

### Reuse browser sessions
```typescript
// In wdio config
mochaOpts: {
    bail: 0,  // Don't stop on first failure
},
// Keep browser open between tests
afterTest: function(test, context, { error }) {
    if (!error) {
        // Only restart browser on failure
        return;
    }
}
```

## Best practices

### 1. Test structure
```typescript
describe('Feature Name', () => {
    beforeEach(async () => {
        await browser.url('/feature');
        await WebHelpers.waitForPageLoad();
    });

    it('should perform specific action', async () => {
        // Arrange
        const testData = { username: 'test', password: 'pass' };

        // Act
        await WebHelpers.clearAndType('#username', testData.username);
        await WebHelpers.clearAndType('#password', testData.password);

        // Assert
        const result = await WebHelpers.waitForElement('.success');
        expect(await result.getText()).to.include('Success');
    });
});
```

### 2. Error handling
```typescript
try {
    await WebHelpers.waitForElement('#optional-element', 2000);
} catch (error) {
    console.log('Optional element not found, continuing...');
}
```

### 3. Test isolation
```typescript
afterEach(async () => {
    // Clear cookies/localStorage between tests
    await WebHelpers.deleteCookies();
    await browser.execute(() => {
        localStorage.clear();
        sessionStorage.clear();
    });
});
```

### 4. Assertions
```typescript
// Use meaningful assertions
expect(await element.getText()).to.equal('Expected Text');
expect(await element.isDisplayed()).to.be.true;
expect(await WebHelpers.getElementAttribute('#link', 'href')).to.include('example.com');
```

## Troubleshooting

### Common issues

#### 1. Element not found
```typescript
// Solution: Add explicit wait
await WebHelpers.waitForElement('#element', 10000);

// Or check if element exists first
if (await WebHelpers.isElementVisible('#element')) {
    await element.click();
}
```

#### 2. Element not clickable
```typescript
// Solution: Wait for clickable state
await WebHelpers.waitForElementClickable('#button', 5000);

// Or scroll to element first
await WebHelpers.scrollToElement('#button');
```

#### 3. Stale element reference
```typescript
// ❌ Bad: Reusing element reference
const element = await $('#dynamic-element');
await browser.refresh();
await element.click();  // Will fail

// ✅ Good: Get fresh element reference
await browser.refresh();
const element = await $('#dynamic-element');
await element.click();
```

#### 4. Timing issues
```typescript
// ❌ Bad: Fixed wait
await browser.pause(5000);

// ✅ Good: Wait for specific condition
await browser.waitUntil(async () => {
    const elements = await $$('.loaded-item');
    return elements.length > 0;
});
```

#### 5. Browser crashes or driver issues
- Reduce `maxInstances` if running out of memory
- Update browser to latest version
- Let WebDriverIO auto-manage drivers (no manual installation needed)
- Add browser arguments for stability:
```typescript
'goog:chromeOptions': {
    args: [
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-extensions',
        '--disable-background-timer-throttling'
    ]
}
```

#### 6. Driver version mismatch
- **No longer an issue!** WebDriverIO automatically matches driver versions with browser versions
- If issues persist, try:
```bash
npm install chromedriver@latest geckodriver@latest
```

## Tài liệu tham khảo

- [WebDriverIO Documentation](https://webdriver.io/docs/gettingstarted)
- [Selenium WebDriver Guide](https://selenium-python.readthedocs.io/)
- [CSS Selectors Reference](https://www.w3schools.com/cssref/css_selectors.asp)
- [XPath Tutorial](https://www.w3schools.com/xml/xpath_intro.asp)
- [Chai Assertion Library](https://www.chaijs.com/)