// jest.config.mjs
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const clientTestConfig = {
  displayName: 'client',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/__tests__/client/*.[jt]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

const serverTestConfig = {
  displayName: 'server',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/server/*.[jt]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  projects: [
    await createJestConfig(clientTestConfig)(),
    await createJestConfig(serverTestConfig)(),
  ],
};

export default config;
