// @ts-check
const base = require('@playwright/test');
const { BasePage } = require('../pages/BasePage');
const { ApiHelper } = require('../utils/apiHelper');
const { WaitHelper } = require('../utils/waitHelper');
const { Env } = require('../utils/env');

/**
 * Custom test runner with dependency injection fixtures.
 * You can extend this fixture with your custom Page Objects:
 *
 * Example:
 * const test = base.test.extend({
 *   myPage: async ({ page }, use) => {
 *     await use(new MyCustomPage(page));
 *   },
 * });
 */
const test = base.test.extend({
  /**
   * Generic basePage fixture available to all tests out of the box.
   * @param {{ page: import('@playwright/test').Page }} param0
   * @param {(basePage: BasePage) => Promise<void>} use
   */
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },

  /**
   * Universal API helper fixture for API requests and test data preparation.
   * @param {{ request: import('@playwright/test').APIRequestContext }} param0
   * @param {(apiHelper: ApiHelper) => Promise<void>} use
   */
  apiHelper: async ({ request }, use) => {
    const apiHelper = new ApiHelper(request, Env.baseURL);
    await use(apiHelper);
  },

  /**
   * Universal wait and synchronization helper fixture.
   * @param {{ page: import('@playwright/test').Page }} param0
   * @param {(waitHelper: WaitHelper) => Promise<void>} use
   */
  waitHelper: async ({ page }, use) => {
    const waitHelper = new WaitHelper(page);
    await use(waitHelper);
  },
});

module.exports = {
  test,
  expect: base.expect,
};
