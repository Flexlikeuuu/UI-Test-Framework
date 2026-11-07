// @ts-check
const { test } = require('@playwright/test');

/**
 * WaitHelper provides synchronization utilities for complex UI/network events.
 */
class WaitHelper {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Wait until all network connections are idle (no connections for at least 500ms).
   * @param {number} [timeout=10000]
   */
  async waitForNetworkIdle(timeout = 10000) {
    await test.step('Wait for network idle', async () => {
      await this.page.waitForLoadState('networkidle', { timeout });
    });
  }

  /**
   * Wait for a specific HTTP response URL or predicate.
   * @param {string | RegExp | ((response: import('@playwright/test').Response) => boolean)} urlOrPredicate
   * @param {number} [timeout=10000]
   * @returns {Promise<import('@playwright/test').Response>}
   */
  async waitForResponse(urlOrPredicate, timeout = 10000) {
    return await test.step(`Wait for network response matching: ${urlOrPredicate}`, async () => {
      return await this.page.waitForResponse(urlOrPredicate, { timeout });
    });
  }

  /**
   * Poll a condition function until it returns true or times out.
   * @param {() => Promise<boolean>} conditionFn - Async predicate function
   * @param {number} [timeout=10000] - Total timeout in milliseconds
   * @param {number} [interval=500] - Interval between checks in milliseconds
   * @returns {Promise<boolean>}
   */
  async pollCondition(conditionFn, timeout = 10000, interval = 500) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      try {
        const result = await conditionFn();
        if (result) return true;
      } catch {
        // Continue polling if condition evaluation throws
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
    throw new Error(`Condition was not fulfilled within ${timeout}ms timeout`);
  }
}

module.exports = { WaitHelper };
