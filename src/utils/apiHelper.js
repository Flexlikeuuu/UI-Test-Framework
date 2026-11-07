// @ts-check
const { test } = require('@playwright/test');

/**
 * ApiHelper provides a generic wrapper around Playwright's APIRequestContext.
 * Useful for test preconditions (data setup), postconditions (cleanup),
 * or direct API assertion in any testing project.
 */
class ApiHelper {
  /**
   * @param {import('@playwright/test').APIRequestContext} request - Playwright APIRequestContext
   * @param {string} [baseURL=''] - Optional base URL for API endpoints
   */
  constructor(request, baseURL = '') {
    this.request = request;
    this.baseURL = baseURL;
  }

  /**
   * Builds the full URL given an endpoint path.
   * @param {string} endpoint
   * @returns {string}
   */
  resolveUrl(endpoint) {
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      return endpoint;
    }
    return `${this.baseURL}${endpoint}`;
  }

  /**
   * Send HTTP GET request.
   * @param {string} endpoint
   * @param {object} [options]
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  async get(endpoint, options = {}) {
    const url = this.resolveUrl(endpoint);
    return await test.step(`API GET ${url}`, async () => {
      return await this.request.get(url, options);
    });
  }

  /**
   * Send HTTP POST request.
   * @param {string} endpoint
   * @param {object} [options] - e.g. { data: { key: 'value' } }
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  async post(endpoint, options = {}) {
    const url = this.resolveUrl(endpoint);
    return await test.step(`API POST ${url}`, async () => {
      return await this.request.post(url, options);
    });
  }

  /**
   * Send HTTP PUT request.
   * @param {string} endpoint
   * @param {object} [options]
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  async put(endpoint, options = {}) {
    const url = this.resolveUrl(endpoint);
    return await test.step(`API PUT ${url}`, async () => {
      return await this.request.put(url, options);
    });
  }

  /**
   * Send HTTP PATCH request.
   * @param {string} endpoint
   * @param {object} [options]
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  async patch(endpoint, options = {}) {
    const url = this.resolveUrl(endpoint);
    return await test.step(`API PATCH ${url}`, async () => {
      return await this.request.patch(url, options);
    });
  }

  /**
   * Send HTTP DELETE request.
   * @param {string} endpoint
   * @param {object} [options]
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  async delete(endpoint, options = {}) {
    const url = this.resolveUrl(endpoint);
    return await test.step(`API DELETE ${url}`, async () => {
      return await this.request.delete(url, options);
    });
  }
}

module.exports = { ApiHelper };
