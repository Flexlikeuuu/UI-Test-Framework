// @ts-check
const { BasePage } = require('./BasePage');

/**
 * BaseComponent is a base class for reusable UI components (e.g. modals, navigation bars,
 * dropdowns, data tables) that can be embedded into Page Objects.
 * All queries can be optionally scoped inside `rootLocator`.
 */
class BaseComponent extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright Page instance
   * @param {string | import('@playwright/test').Locator} [rootLocator] - Optional root container of the component
   */
  constructor(page, rootLocator = null) {
    super(page);
    this.rootLocator = rootLocator ? this.getLocator(rootLocator) : null;
  }

  /**
   * Finds an element scoped within the component's root locator if defined,
   * otherwise queries from the whole page.
   * @param {string | import('@playwright/test').Locator} target
   * @returns {import('@playwright/test').Locator}
   */
  getScopedLocator(target) {
    if (typeof target !== 'string') {
      return target;
    }
    return this.rootLocator ? this.rootLocator.locator(target) : this.page.locator(target);
  }

  /**
   * Check if the component root is visible.
   * @param {number} [timeout=5000]
   * @returns {Promise<boolean>}
   */
  async isComponentVisible(timeout = 5000) {
    if (!this.rootLocator) {
      return true;
    }
    return await this.isVisible(this.rootLocator, timeout);
  }
}

module.exports = { BaseComponent };
