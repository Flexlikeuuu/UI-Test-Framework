// @ts-check
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file if it exists
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Universal environment and configuration helper.
 */
class Env {
  /**
   * Target application base URL.
   * @returns {string}
   */
  static get baseURL() {
    return process.env.BASE_URL || '';
  }

  /**
   * Default timeout in milliseconds for actions and waits.
   * @returns {number}
   */
  static get defaultTimeout() {
    return parseInt(process.env.DEFAULT_TIMEOUT || '10000', 10);
  }

  /**
   * Whether to run tests in headless mode.
   * @returns {boolean}
   */
  static get isHeadless() {
    return process.env.HEADLESS !== 'false';
  }

  /**
   * Helper to fetch an arbitrary environment variable with a fallback default.
   * @param {string} key
   * @param {string} [defaultValue='']
   * @returns {string}
   */
  static get(key, defaultValue = '') {
    return process.env[key] || defaultValue;
  }
}

module.exports = { Env };
