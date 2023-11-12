/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import NavBar from '@/app/components/NavBar';
import '@testing-library/jest-dom';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

jest.mock('next-auth/react');
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));
jest.mock(
  'next/link',
  () =>
    ({ children }) =>
      children
);
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));
jest.mock('../app/lib/actions', () => ({
  likePost: jest.fn(),
  createComment: jest.fn(),
}));

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: jest.fn(() => [
    {
      comment: '',
    },
    jest.fn(),
  ]),
}));

HTMLFormElement.prototype.requestSubmit = jest.fn().mockImplementation(function () {
  this.dispatchEvent(new Event('submit', { cancelable: true }));
});
describe('NavBar Component', () => {
  beforeEach(() => {
    useSession.mockReturnValue({ data: null });
    signIn.mockImplementation(jest.fn());
    signOut.mockImplementation(() => Promise.resolve());
    useRouter.mockReturnValue({ push: jest.fn() });
  });

  it('renders sign-in button when not signed in', () => {
    render(<NavBar />);

    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});
