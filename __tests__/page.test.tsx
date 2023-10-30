import { render, screen } from '@testing-library/react';
import HomePage from '@/app/components/HomePage';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders a heading', () => {
    const data = [
      {
        id: 219,
        content: 'This is a detailed post by User 1, post number 1.',
        imageUrl: null,
        authorId: 89,
        createdAt: new Date(),
      },
    ];
    render(<HomePage data={data} />);
    expect(screen.getByText('This is a detailed post by User 1, post number 1.')).toBeVisible();
  });
});
