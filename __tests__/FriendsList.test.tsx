/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FriendsList from '@/app/components/FriendsList';
import '@testing-library/jest-dom';
import { useFormState } from 'react-dom';
import { changeStatus } from '../app/lib/actions';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: jest.fn(),
}));

jest.mock('../app/lib/actions', () => ({
  changeStatus: jest.fn(),
}));

describe('FriendsList Component', () => {
  const mockFriends = [
    {
      id: '1',
      name: 'Friend One',
      email: 'friend1@example.com',
      profilePicture: 'http://example.com/picture1.jpg',
      status: 'PENDING',
    },
    {
      id: '2',
      name: 'Friend Two',
      email: 'friend2@example.com',
      profilePicture: 'http://example.com/picture2.jpg',
      status: 'ACCEPTED',
    },
  ];

  beforeEach(() => {
    useFormState.mockImplementation(() => [{}]);
    changeStatus.mockImplementation(() => {});
  });

  it('renders friends list', () => {
    render(<FriendsList friends={mockFriends} />);

    expect(screen.getByText('Friend One')).toBeInTheDocument();
    expect(screen.getByText('Friend Two')).toBeInTheDocument();
  });
});
