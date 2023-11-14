import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Search from '@/app/components/Search';
import * as actionsModule from '@/app/lib/actions';

jest.mock('../app/lib/actions', () => ({
  getUsers: jest.fn(),
  searchUsers: jest.fn(),
  addFriend: jest.fn(),
  removeFriend: jest.fn(),
}));

describe('Search Component', () => {
  beforeEach(() => {
    actionsModule.getUsers.mockResolvedValue([]);
    actionsModule.searchUsers.mockResolvedValue([]);
  });

  test('renders the search component', async () => {
    render(<Search />);

    const searchInput = screen.getByPlaceholderText('Enter Search');
    expect(searchInput).toBeInTheDocument();
  });
});
