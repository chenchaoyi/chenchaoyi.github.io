# Running Tests Locally

This directory contains the Playwright test suite for Situ E. Chen's website. Follow these steps to run the tests locally.

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Setup

1. Navigate to the tests directory:
   ```bash
   cd tests
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

There are several ways to run the tests:

1. Run all tests in headless mode:
   ```bash
   npm test
   ```

2. Run tests with UI mode (recommended for debugging):
   ```bash
   npm run test:ui
   ```

3. Run tests in debug mode:
   ```bash
   npm run test:debug
   ```

4. Run tests in headed mode (browser visible):
   ```bash
   npm run test:headed
   ```

## Test Files

- `homepage.spec.ts`: Tests for the homepage
- `blog.spec.ts`: Tests for the blog page
- `contact.spec.ts`: Tests for the contact page

## Test Results

Test results and reports are stored in the `test-results` directory. After running tests, you can find:
- Screenshots of failed tests
- Test execution traces
- HTML reports

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed correctly
2. Check that you're in the correct directory (tests/)
3. Ensure you have the correct Node.js version
4. Try clearing the test-results directory and running tests again

## Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Test API](https://playwright.dev/docs/test-api-testing) 