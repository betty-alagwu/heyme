import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    "^.+\\.(ts|js)x?$": "babel-jest",
  },
  moduleDirectories: ['node_modules'],
  preset: 'ts-jest', 
  moduleNameMapper: {
    "^@/pages(.*)$": "<rootDir>/pages/$1",
    "^@/components(.*)$": "<rootDir>/components/$1",
    "^@/utils(.*)$": "<rootDir>/utils/$1",
    "^@/config(.*)$": "<rootDir>/config/$1",
    "^@/lib(.*)$": "<rootDir>/lib/$1",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy",
  },
};

export default config;


