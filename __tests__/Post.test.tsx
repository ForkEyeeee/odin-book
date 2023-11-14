/**
 * @jest-environment jsdom
 *
 */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Post } from '@/app/components/Post';
import '@testing-library/jest-dom';

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
describe('Post Component', () => {
  const mockPost = {
    id: 1,
    content: 'Sample post content',
    createdAt: new Date('2023-01-01'),
    author: {
      id: 1,
      name: 'Author One',
      email: 'author1@example.com',
      profilePicture: 'http://example.com/profile1.jpg',
    },
    comments: [],
    likes: [],
    imageUrl: 'http://example.com/image1.jpg',
    authorId: 1,
  };

  it('renders post content, author information, and action buttons', () => {
    // render(<Post post={mockPost} index={0} />);
    render(<Post post={mockPost} index={0} />);
    // const { getByRole } = render(serverComponent);

    expect(screen.getByText('Author One')).toBeInTheDocument();
    expect(screen.getByText('Sample post content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Like' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Share' })).toBeInTheDocument();
  });
});
