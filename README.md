# Universal Playwright + JavaScript Test Automation Framework (POM)

A clean, site-agnostic test automation framework using **Playwright**, **JavaScript**, and the **Page Object Model (POM)** pattern. Designed to be reused across any web application or testing project.

---

## 📁 Project Structure

```text
TestFramework/
├── src/
│   ├── fixtures/
│   │   └── testFixtures.js       # Playwright test extension with dependency injection
│   ├── pages/
│   │   ├── BasePage.js           # Generic base class with reusable Playwright actions
│   │   ├── BaseComponent.js      # Base class for reusable scoped UI components
│   │   └── index.js              # Export entry point for pages and components
│   └── utils/
│       └── helpers.js            # General-purpose utility functions
├── tests/                        # Directory for your test specifications
├── playwright.config.js          # Playwright test runner configuration
├── package.json                  # Dependencies and execution scripts
└── README.md
```

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install browser binaries:**
   ```bash
   npx playwright install
   ```

---

## 💡 How to Use for Any Website

### 1. Create a Page Object (`src/pages/MyPage.js`)
Extend `BasePage` and define your selectors and business actions:

```javascript
// @ts-check
const { BasePage } = require('./BasePage');

class MyPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Locators
    this.searchField = this.page.locator('input[type="search"]');
    this.searchButton = this.page.locator('button[type="submit"]');
    this.results = this.page.locator('.result-item');
  }

  async open() {
    await this.navigate('/search');
  }

  async search(query) {
    await this.fill(this.searchField, query, `Type search query: ${query}`);
    await this.click(this.searchButton, {}, 'Submit search query');
  }

  async getResultsCount() {
    return await this.results.count();
  }
}

module.exports = { MyPage };
```

---

### 2. Register Page in Fixtures (`src/fixtures/testFixtures.js`)
Wire your page into Playwright's test context:

```javascript
// @ts-check
const base = require('@playwright/test');
const { MyPage } = require('../pages/MyPage');

const test = base.test.extend({
  myPage: async ({ page }, use) => {
    await use(new MyPage(page));
  },
});

module.exports = { test, expect: base.expect };
```

---

### 3. Write a Test (`tests/myTest.spec.js`)
Inject your page object cleanly into the test function:

```javascript
// @ts-check
const { test, expect } = require('../src/fixtures/testFixtures');

test.describe('Search Feature', () => {
  test('should display search results', async ({ myPage }) => {
    await myPage.open();
    await myPage.search('Playwright');

    const count = await myPage.getResultsCount();
    expect(count).toBeGreaterThan(0);
  });
});
```

---

## 🛠 Available `BasePage` Methods

| Category | Method | Description |
|---|---|---|
| **Navigation** | `navigate(path, options)` | Navigate to relative path or URL |
| | `waitForURL(urlOrPattern)` | Wait for URL to match pattern/string |
| | `reload(options)` | Reload current page |
| | `goBack()` / `goForward()` | Browser history navigation |
| | `getUrl()` / `getTitle()` | Get current URL / document title |
| **Actions** | `click(target, options, desc)` | Safe click with auto-wait & step report |
| | `dblclick(target, options, desc)` | Double-click element |
| | `fill(target, text, desc)` | Clear and fill input field |
| | `type(target, text, options)` | Sequentially type characters |
| | `clear(target)` | Clear input field |
| | `pressKey(target, key)` | Press keyboard key (e.g. 'Enter') |
| | `selectOption(target, values)` | Select dropdown value(s) |
| | `check(target)` / `uncheck(target)` | Check / uncheck checkbox |
| | `hover(target)` | Hover mouse over element |
| | `dragAndDrop(source, dest)` | Drag source and drop onto target |
| | `uploadFile(target, filePaths)` | Upload file(s) to input element |
| **State & Checks** | `getText(target)` | Get trimmed inner text |
| | `getAllTexts(target)` | Get array of texts for all matches |
| | `getAttribute(target, attr)` | Get attribute value |
| | `getInputValue(target)` | Get current value of input/textarea |
| | `isVisible(target, timeout)` | Returns boolean (doesn't fail test) |
| | `isHidden(target, timeout)` | Returns boolean whether element is hidden |
| | `isEnabled(target)` | Returns boolean whether element is enabled |
| | `isChecked(target)` | Returns boolean whether checkbox is checked |
| | `waitForElement(target, state, timeout)` | Explicit wait for state (`visible`/`hidden`/etc.) |
| | `scrollIntoView(target)` | Scroll element into view |
| | `takeScreenshot(path, target)` | Screenshot full page or element |

---

## ▶️ Available Scripts

- `npm test` — Run all tests across configured browsers.
- `npm run test:chromium` — Run tests exclusively in Chromium.
- `npm run test:headed` — Run tests with visible browser window.
- `npm run test:ui` — Run tests in interactive Playwright UI mode.
- `npm run test:debug` — Step-by-step debug mode with Playwright Inspector.
- `npm run report` — View latest HTML execution report.
