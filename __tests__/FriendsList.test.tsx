/**
 * @jest-environment jsdom
 */
// FriendsList.test.tsx
import { render, screen } from '@testing-library/react';
import FriendsList from '../app/components/FriendList';

describe('FriendsList component', () => {
  it('renders correctly with provided data', () => {
    const dummyData = [
      {
        id: 4,
        user1Id: 2,
        user2Id: 4,
        status: 'ACCEPTED',
        googleId: 'googleId4',
        name: 'John Doe',
        email: 'user4@example.com',
        hashedPassword: 'hashedPassword4',
        profileId: null,
        profilePicture: null,
      },
    ];

    render(<FriendsList friends={dummyData} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
