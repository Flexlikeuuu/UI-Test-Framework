// @ts-check

/**
 * Universal utility functions for testing across any website.
 */
class Helpers {
  /**
   * Generates a random alphanumeric string with the given length.
   * Useful for dynamic usernames, emails, or unique form values.
   * @param {number} [length=8]
   * @returns {string}
   */
  static getRandomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generates a random email address.
   * @param {string} [domain='example.com']
   * @returns {string}
   */
  static getRandomEmail(domain = 'example.com') {
    return `test_${this.getRandomString(6).toLowerCase()}@${domain}`;
  }

  /**
   * Pause execution for a given number of milliseconds.
   * (Prefer explicit waits over sleep where possible).
   * @param {number} ms
   * @returns {Promise<void>}
   */
  static sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

module.exports = { Helpers };
