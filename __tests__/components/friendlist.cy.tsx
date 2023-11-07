import NavBar from '@/app/components/NavBar';
import { SessionProvider } from 'next-auth/react';
/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress Component Test
describe('<NavBar />', () => {
  it('should render and display expected content', () => {
    // Mount the React component for the About page

    const index = 0;

    // Then you can mount your component with this mock data
    cy.mount(
      <SessionProvider>
        <NavBar />
      </SessionProvider>
    );

    // The new page should contain an p with "John Doe"
    cy.contains('John Doe');
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
