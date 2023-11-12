/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Profile from '@/app/components/Profile';
import '@testing-library/jest-dom';
import { useFormState } from 'react-dom';
import { getSession } from 'next-auth/react';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
  getSession: jest.fn(),
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

describe('Profile Component', () => {
  const mockProfile = {
    userId: '1',
    bio: 'This is a bio',
    dateOfBirth: new Date('1990-01-01'),
    gender: 'male',
  };

  beforeEach(() => {
    useFormState.mockImplementation(() => [{}]);
    getSession.mockResolvedValue({ user: { id: '1' } });
  });

  it('renders profile information', () => {
    render(<Profile profile={mockProfile} />);

    expect(screen.getByText('User Profile')).toBeInTheDocument();
    expect(screen.getByText('This is a bio')).toBeInTheDocument();
  });
});
