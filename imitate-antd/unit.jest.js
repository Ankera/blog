module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFiles: ['./tests/setup.js'],
  testMatch: ['**/unit/**/*.(spec|test).(js|jsx|ts|tsx)'],
  collectCoverage: true,
  collectCoverageFrom: [
    'components/**/*.(js|jsx|ts|tsx)',
    '!components/**/*.stories.(js|jsx|ts|tsx)',
    '!components/**/*.(spec|test).(js|jsx|ts|tsx)',
  ],
}
