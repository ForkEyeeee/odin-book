/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import Profile from '@/app/components/Profile';

describe('Page component', () => {
  test('renders correctly', () => {
    const profile = {
      id: 6,
      bio: 'yoooo123444',
      dateOfBirth: new Date(),
      gender: 'male',
      userId: 1,
    };

    const serverComponent = Profile({ profile });
    const { getByRole } = render(serverComponent);
  });
});
