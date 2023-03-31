/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"], // location of tests
  verbose: true, //Should each individual test be reported when run
  forceExit: true, // exit even if pending handlers
  clearMocks: true,
  globalSetup: "'<rootDir>/src/_tests_/global-setup.ts'",
  globalTeardown: "<rootDir>/src/_tests_/global-teardown.ts",
};
