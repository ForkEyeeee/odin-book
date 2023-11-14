/**
 * @jest-environment jsdom
 *
 */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Page from '@/app/components/component';
import '@testing-library/jest-dom';

describe('Post Component', () => {
  it('renders post content, author information, and action buttons', async () => {
    const serverComponent = await Page();
    const { getByRole } = render(serverComponent);
    const headingElement = getByRole('heading');
    expect(headingElement).toBeInTheDocument();
    expect(screen.getByText('App router')).toBeInTheDocument();
  });
});
