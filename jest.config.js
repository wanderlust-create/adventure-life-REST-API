/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"], // location of tests
  verbose: true, //Should each individual test be reported when run
  forceExit: true, // exit even if pending handlers
  clearMocks: true,
  // globalSetup: "**/**/**/global-setup.ts",
  // globalTeardown: "**/**/**/global-teardown.ts",
};
