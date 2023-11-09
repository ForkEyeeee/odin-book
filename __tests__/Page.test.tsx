/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import Page from '@/app/page';
const { generateSecret } = require('jose/util/generate_secret');

describe('Page component', () => {
  test('renders correctly', async () => {
    const serverComponent = await Page();
    const { getByRole } = render(serverComponent);
    console.log(getByRole);
  });
});
