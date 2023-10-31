import { render, screen } from '@testing-library/react';
import HomePage from '@/app/components/HomePage';
import '@testing-library/jest-dom';
import TimeLineTabs from '@/app/components/TimeLineTabs';

describe('Home', () => {
  it('renders a heading', async () => {
    const timelinePosts = [
      {
        id: 219,
        content: 'This is a detailed post by User 1, post number 1.',
        imageUrl: null,
        authorId: 89,
        createdAt: new Date(),
      },
    ];
    const otherTimeLinePosts = [
      {
        id: 31,
        content: 'This is a detailed post by User 2, post number 1.',
        imageUrl: null,
        authorId: 89,
        createdAt: new Date(),
      },
    ];
    render(<HomePage data={timelinePosts} otherData={otherTimeLinePosts} />);
    screen.debug();
    expect(screen.getByText('Main Content Here')).toBeVisible();
  });
});
