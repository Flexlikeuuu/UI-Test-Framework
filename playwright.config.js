// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Universal Playwright configuration file.
 * Compatible with any website, CI/CD pipelines, and local debugging.
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',

  // Run tests in parallel within files
  fullyParallel: true,

  // Fail the build on CI if test.only was left in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI if resources are limited
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],

  // Shared settings for all projects
  use: {
    // Base URL can be configured via environment variable
    baseURL: process.env.BASE_URL || '',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Take screenshot on test failure
    screenshot: 'only-on-failure',

    // Retain video recording on test failure
    video: 'retain-on-failure',

    // Maximum time each action such as `click()` can take
    actionTimeout: 10000,

    // Maximum time navigation can take
    navigationTimeout: 15000,
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
