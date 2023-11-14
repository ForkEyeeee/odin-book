import React from 'react';
import { render, screen } from '@testing-library/react';
import TimeLineTabs from '@/app/components/TimeLineTabs';
import { PostWithAuthor, Author } from '@/app/lib/definitions';

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

const mockAuthors: Author[] = [
  {
    id: 1,
    googleId: 'googleId1',
    name: 'Author One',
    email: 'author1@example.com',
    hashedPassword: 'hashedPassword1',
    profileId: 101,
    profilePicture: 'http://example.com/profile1.jpg',
  },
  {
    id: 2,
    googleId: 'googleId2',
    name: 'Author Two',
    email: 'author2@example.com',
    hashedPassword: 'hashedPassword2',
    profileId: 102,
    profilePicture: 'http://example.com/profile2.jpg',
  },
];

const mockForYouPosts: PostWithAuthor[] = [
  {
    id: 1,
    content: 'For You Post Content',
    imageUrl: 'http://example.com/forYouImage.jpg',
    authorId: 1,
    createdAt: new Date('2023-01-01'),
    likes: [],
    author: mockAuthors[0],
  },
];

const mockDiscoverPosts: PostWithAuthor[] = [
  {
    id: 2,
    content: 'Discover Post Content',
    imageUrl: 'http://example.com/discoverImage.jpg',
    authorId: 2,
    createdAt: new Date('2023-01-02'),
    likes: [],
    author: mockAuthors[1],
  },
];

describe('TimeLineTabs Component', () => {
  test('renders one post in each tab', () => {
    render(<TimeLineTabs forYouPosts={mockForYouPosts} discoverPosts={mockDiscoverPosts} />);

    expect(screen.getByText('For You Post Content')).toBeInTheDocument();

    expect(screen.getByText('Discover Post Content')).toBeInTheDocument();
  });
});
