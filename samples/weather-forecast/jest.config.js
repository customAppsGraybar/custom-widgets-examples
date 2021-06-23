module.exports = {
  setupFilesAfterEnv: ["./test/jest-setup.js"],
  resetMocks: true,
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/fileMock.js',
  },
};
