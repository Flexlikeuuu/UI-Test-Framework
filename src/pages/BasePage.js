// @ts-check
const { test } = require('@playwright/test');

/**
 * BasePage is a site-agnostic base class for all Page Objects.
 * It encapsulates common Playwright actions, auto-waiting, locator resolutions,
 * and step reporting to provide a robust foundation for any web application.
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright Page instance
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Resolves a string selector or an existing Locator into a Playwright Locator.
   * @param {string | import('@playwright/test').Locator} target
   * @returns {import('@playwright/test').Locator}
   */
  getLocator(target) {
    return typeof target === 'string' ? this.page.locator(target) : target;
  }

  // =========================================================================
  // Navigation & Page State
  // =========================================================================

  /**
   * Navigate to a specified relative path or absolute URL.
   * @param {string} [path='']
   * @param {import('@playwright/test').PageGotoOptions} [options]
   */
  async navigate(path = '', options = {}) {
    await test.step(`Navigate to "${path || '/'}"`, async () => {
      await this.page.goto(path, { waitUntil: 'domcontentloaded', ...options });
    });
  }

  /**
   * Wait for the page URL to match a specific string, regex, or predicate.
   * @param {string | RegExp | ((url: URL) => boolean)} urlOrPattern
   * @param {object} [options]
   */
  async waitForURL(urlOrPattern, options = {}) {
    await test.step(`Wait for URL to match: ${urlOrPattern}`, async () => {
      await this.page.waitForURL(urlOrPattern, options);
    });
  }

  /**
   * Reload the current page.
   * @param {object} [options]
   */
  async reload(options = {}) {
    await test.step('Reload current page', async () => {
      await this.page.reload({ waitUntil: 'domcontentloaded', ...options });
    });
  }

  /**
   * Navigate back in browser history.
   */
  async goBack() {
    await test.step('Navigate back in browser history', async () => {
      await this.page.goBack();
    });
  }

  /**
   * Navigate forward in browser history.
   */
  async goForward() {
    await test.step('Navigate forward in browser history', async () => {
      await this.page.goForward();
    });
  }

  /**
   * Get the current page URL.
   * @returns {string}
   */
  getUrl() {
    return this.page.url();
  }

  /**
   * Get the document title.
   * @returns {Promise<string>}
   */
  async getTitle() {
    return await this.page.title();
  }

  // =========================================================================
  // Element Interactions (Click, Fill, Press, Select, Check)
  // =========================================================================

  /**
   * Click an element with automatic waiting and custom step description.
   * @param {string | import('@playwright/test').Locator} target
   * @param {object} [options] - Playwright click options
   * @param {string} [stepDescription] - Optional step label for reports
   */
  async click(target, options = {}, stepDescription = '') {
    const locator = this.getLocator(target);
    const desc = stepDescription || `Click on: ${locator}`;
    await test.step(desc, async () => {
      await locator.click(options);
    });
  }

  /**
   * Double-click an element.
   * @param {string | import('@playwright/test').Locator} target
   * @param {object} [options]
   * @param {string} [stepDescription]
   */
  async dblclick(target, options = {}, stepDescription = '') {
    const locator = this.getLocator(target);
    const desc = stepDescription || `Double-click on: ${locator}`;
    await test.step(desc, async () => {
      await locator.dblclick(options);
    });
  }

  /**
   * Clear an input field and type value.
   * @param {string | import('@playwright/test').Locator} target
   * @param {string} text
   * @param {string} [stepDescription]
   */
  async fill(target, text, stepDescription = '') {
    const locator = this.getLocator(target);
    const desc = stepDescription || `Fill input with: "${text}"`;
    await test.step(desc, async () => {
      await locator.fill(text);
    });
  }

  /**
   * Type text character-by-character (useful for auto-complete and search inputs).
   * @param {string | import('@playwright/test').Locator} target
   * @param {string} text
   * @param {object} [options] - e.g., { delay: 100 }
   */
  async type(target, text, options = {}) {
    const locator = this.getLocator(target);
    await test.step(`Sequentially type: "${text}"`, async () => {
      await locator.pressSequentially(text, options);
    });
  }

  /**
   * Clear the input field content.
   * @param {string | import('@playwright/test').Locator} target
   */
  async clear(target) {
    const locator = this.getLocator(target);
    await test.step(`Clear input field: ${locator}`, async () => {
      await locator.clear();
    });
  }

  /**
   * Press a keyboard key on an element (e.g. 'Enter', 'Escape', 'Tab', 'ArrowDown').
   * @param {string | import('@playwright/test').Locator} target
   * @param {string} key
   */
  async pressKey(target, key) {
    const locator = this.getLocator(target);
    await test.step(`Press key [${key}] on element: ${locator}`, async () => {
      await locator.press(key);
    });
  }

  /**
   * Select an option in a <select> dropdown by value, label, or index.
   * @param {string | import('@playwright/test').Locator} target
   * @param {string | string[] | { value?: string, label?: string, index?: number }} values
   */
  async selectOption(target, values) {
    const locator = this.getLocator(target);
    await test.step(`Select dropdown option: ${JSON.stringify(values)}`, async () => {
      await locator.selectOption(values);
    });
  }

  /**
   * Check a checkbox or radio button.
   * @param {string | import('@playwright/test').Locator} target
   */
  async check(target) {
    const locator = this.getLocator(target);
    await test.step(`Check element: ${locator}`, async () => {
      await locator.check();
    });
  }

  /**
   * Uncheck a checkbox.
   * @param {string | import('@playwright/test').Locator} target
   */
  async uncheck(target) {
    const locator = this.getLocator(target);
    await test.step(`Uncheck element: ${locator}`, async () => {
      await locator.uncheck();
    });
  }

  /**
   * Hover over an element.
   * @param {string | import('@playwright/test').Locator} target
   */
  async hover(target) {
    const locator = this.getLocator(target);
    await test.step(`Hover over element: ${locator}`, async () => {
      await locator.hover();
    });
  }

  /**
   * Drag an element and drop it onto another element.
   * @param {string | import('@playwright/test').Locator} source
   * @param {string | import('@playwright/test').Locator} destination
   */
  async dragAndDrop(source, destination) {
    const sourceLoc = this.getLocator(source);
    const destLoc = this.getLocator(destination);
    await test.step(`Drag ${sourceLoc} and drop onto ${destLoc}`, async () => {
      await sourceLoc.dragTo(destLoc);
    });
  }

  /**
   * Upload one or more files to an <input type="file"> element.
   * @param {string | import('@playwright/test').Locator} target
   * @param {string | string[]} filePaths
   */
  async uploadFile(target, filePaths) {
    const locator = this.getLocator(target);
    await test.step(`Upload file(s): ${JSON.stringify(filePaths)}`, async () => {
      await locator.setInputFiles(filePaths);
    });
  }

  // =========================================================================
  // Getters & Assertions Helpers
  // =========================================================================

  /**
   * Get trimmed inner text of an element.
   * @param {string | import('@playwright/test').Locator} target
   * @returns {Promise<string>}
   */
  async getText(target) {
    const locator = this.getLocator(target);
    return (await locator.innerText()).trim();
  }

  /**
   * Get trimmed inner texts of all matching elements.
   * @param {string | import('@playwright/test').Locator} target
   * @returns {Promise<string[]>}
   */
  async getAllTexts(target) {
    const locator = this.getLocator(target);
    const texts = await locator.allInnerTexts();
    return texts.map((t) => t.trim());
  }

  /**
   * Get value of an attribute (e.g. 'href', 'placeholder', 'class').
   * @param {string | import('@playwright/test').Locator} target
   * @param {string} attributeName
   * @returns {Promise<string | null>}
   */
  async getAttribute(target, attributeName) {
    const locator = this.getLocator(target);
    return await locator.getAttribute(attributeName);
  }

  /**
   * Get the current value of an <input>, <textarea>, or <select>.
   * @param {string | import('@playwright/test').Locator} target
   * @returns {Promise<string>}
   */
  async getInputValue(target) {
    const locator = this.getLocator(target);
    return await locator.inputValue();
  }

  /**
   * Check whether an element is visible on page without throwing an assertion error.
   * @param {string | import('@playwright/test').Locator} target
   * @param {number} [timeout=5000]
   * @returns {Promise<boolean>}
   */
  async isVisible(target, timeout = 5000) {
    try {
      const locator = this.getLocator(target);
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check whether an element is hidden or detached.
   * @param {string | import('@playwright/test').Locator} target
   * @param {number} [timeout=5000]
   * @returns {Promise<boolean>}
   */
  async isHidden(target, timeout = 5000) {
    try {
      const locator = this.getLocator(target);
      await locator.waitFor({ state: 'hidden', timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if an element is enabled.
   * @param {string | import('@playwright/test').Locator} target
   * @returns {Promise<boolean>}
   */
  async isEnabled(target) {
    const locator = this.getLocator(target);
    return await locator.isEnabled();
  }

  /**
   * Check if a checkbox or radio button is checked.
   * @param {string | import('@playwright/test').Locator} target
   * @returns {Promise<boolean>}
   */
  async isChecked(target) {
    const locator = this.getLocator(target);
    return await locator.isChecked();
  }

  /**
   * Wait for element to reach a specific state ('visible' | 'hidden' | 'attached' | 'detached').
   * @param {string | import('@playwright/test').Locator} target
   * @param {'visible' | 'hidden' | 'attached' | 'detached'} [state='visible']
   * @param {number} [timeout=10000]
   */
  async waitForElement(target, state = 'visible', timeout = 10000) {
    const locator = this.getLocator(target);
    await test.step(`Wait for element state "${state}": ${locator}`, async () => {
      await locator.waitFor({ state, timeout });
    });
  }

  /**
   * Scroll an element into view if needed.
   * @param {string | import('@playwright/test').Locator} target
   */
  async scrollIntoView(target) {
    const locator = this.getLocator(target);
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Capture a full-page screenshot or an element screenshot.
   * @param {string} path - Output file path
   * @param {string | import('@playwright/test').Locator} [target] - Target element (optional)
   */
  async takeScreenshot(path, target = null) {
    if (target) {
      await this.getLocator(target).screenshot({ path });
    } else {
      await this.page.screenshot({ path, fullPage: true });
    }
  }
}

module.exports = { BasePage };
