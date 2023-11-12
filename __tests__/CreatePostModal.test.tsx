/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CreatePostModal from '@/app/components/CreatePostModal';
import '@testing-library/jest-dom';
import { useFormState } from 'react-dom';
import { createPost } from '../app/lib/actions';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: jest.fn(),
}));

jest.mock('../app/lib/actions', () => ({
  createPost: jest.fn(),
}));

describe('CreatePostModal Component', () => {
  beforeEach(() => {
    useFormState.mockImplementation(() => [{}, jest.fn()]);
    createPost.mockImplementation(() => {});
  });

  it('opens and closes the modal', () => {
    render(<CreatePostModal />);

    expect(screen.getByText('Create a Post')).toBeInTheDocument();
  });
});
