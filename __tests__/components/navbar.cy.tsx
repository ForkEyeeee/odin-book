/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress
// Cypress Component Test
import NavBar from '@/app/components/NavBar';
import Providers from '@/app/components/Providers';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const router = {
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  push: () => {},
  replace: () => {},
  reload: () => {},
  back: () => {},
  prefetch: () => {},
  beforePopState: () => {},
  forward: () => {},
  refresh: () => {},
};

describe('<NavBar />', () => {
  it('should render and display expected content', () => {
    cy.mount(
      <AppRouterContext.Provider value={router}>
        <Providers>
          <NavBar />
        </Providers>
      </AppRouterContext.Provider>
    );

    cy.get('button').contains('Sign In');
  });
});

export {};
