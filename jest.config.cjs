module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/src/test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
};
