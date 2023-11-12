import React from 'react';
import { render, screen } from '@testing-library/react';
import Comment from '@/app/components/Comment';
import '@testing-library/jest-dom';

jest.mock(
  'next/link',
  () =>
    ({ children }) =>
      children
);

describe('Comment Component', () => {
  const mockComments = [
    {
      id: '1',
      content: 'First comment',
      createdAt: new Date('2023-01-01'),
    },
    {
      id: '2',
      content: 'Second comment',
      createdAt: new Date('2023-01-02'),
    },
  ];

  it('renders comments correctly', () => {
    render(<Comment comments={mockComments} />);

    expect(screen.getByText('First comment')).toBeInTheDocument();
    expect(screen.getByText('Second comment')).toBeInTheDocument();
  });

  it('renders no comments when the list is empty', () => {
    render(<Comment comments={[]} />);

    expect(screen.queryByText('First comment')).not.toBeInTheDocument();
    expect(screen.queryByText('Second comment')).not.toBeInTheDocument();
  });
});
