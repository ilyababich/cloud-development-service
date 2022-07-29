import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  rootDir: './',
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '^@libs/(.*)$': '<rootDir>/src/libs/$1',
    '^@functions/(.*)$': '<rootDir>/src/functions/$1',
    '^@mocks/(.*)$': '<rootDir>/src/mocks/$1',
  }
};
export default config;
