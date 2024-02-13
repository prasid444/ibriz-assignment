/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^constants/address$': '<rootDir>/src/constants/address.ts',
    '^components$': '<rootDir>/src/components',
    // Add other module mappings as needed
  },
};
