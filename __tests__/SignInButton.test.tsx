import React from 'react';
import { render, screen } from '@testing-library/react';
import SignInButton from '@/app/components/SignInButton';
import { useSession } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

describe('SignInButton Component', () => {
  test('renders sign-in button when user is not signed in', () => {
    useSession.mockReturnValue({ data: null });

    render(<SignInButton />);

    const signInButton = screen.getByRole('button', { name: /signinbutton/i });
    expect(signInButton).toBeInTheDocument();
  });
});
