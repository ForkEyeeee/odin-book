import { render, screen, act } from '@testing-library/react';
import React from 'react';
import Providers from '../../app/components/Providers';
import pretty from 'pretty';
import AppBar from '../../app/components/AppBar';

describe('Test HTML generation for AppBar component', () => {
  it('should generate HTML without crashing', async () => {
    await act(async () => {
      render(
        <Providers>
          <AppBar />
        </Providers>
      );
    });

    const element = screen.getByText('Logo');
    expect(element).toBeInTheDocument();
  });
});
