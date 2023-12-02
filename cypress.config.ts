import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'mqr3hw',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000/for-you',
    defaultCommandTimeout: 5000,
    testIsolation: false,
    watchForFileChanges: false,
  },
});
