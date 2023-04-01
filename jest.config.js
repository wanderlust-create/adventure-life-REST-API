/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"], // location of tests
  verbose: true, //Should each individual test be reported when run
  forceExit: true, // exit even if pending handlers
  clearMocks: true,
  setupFilesAfterEnv: ["jest-extended"],
  globalSetup: "<rootDir>/src/__tests__/global-setup.ts",
  globalTeardown: "<rootDir>/src/__tests__/global-teardown.ts",
};

// module.exports = {
//   clearMocks: true,
//   moduleFileExtensions: ["js"],
//   roots: ["<rootDir>"],
//   testEnvironment: "node",
//   setupFilesAfterEnv: ["jest-extended"],
//   globalSetup: "<rootDir>/src/__tests__/global-setup.ts",
//   globalTeardown: "<rootDir>/src/__tests__/global-teardown.ts",
// };
