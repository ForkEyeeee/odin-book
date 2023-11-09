/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { Post } from '@/app/components/Post';

describe('Page component', () => {
  test('renders correctly', async () => {
    const post = {
      id: 16,
      content: 'This is a detailed post by User 6, post number 1.',
      imageUrl: null,
      authorId: 6,
      createdAt: new Date(),
      author: {
        id: 6,
        googleId: 'googleId6',
        name: 'Santiago Rodriguez',
        email: 'user6@example.com',
        hashedPassword: 'hashedPassword6',
        profileId: 3,
        profilePicture:
          'https://lh3.googleusercontent.com/a/ACg8ocJ7Gd7Hoa1m0_m66_qfgrFMplyyTUvZaYCPfXtq04cEocs=s96-c',
      },
    };
    const serverComponent = await Post({ post });
    const { getByRole } = render(serverComponent);
    const name = getByRole('img');
    expect(name).toBeInTheDocument();
  });
});
