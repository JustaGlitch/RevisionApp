import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { it, expect, beforeEach, afterEach, describe } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Index from './index';

it('renders links to different account sections', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Index />
    </MemoryRouter>
  );

  const collectionLink = getByText('Collection');
  const allTasksLink = getByText('All Tasks');
  const accountLink = getByText('Account');

  expect(collectionLink).toBeInTheDocument();
  expect(allTasksLink).toBeInTheDocument();
  expect(accountLink).toBeInTheDocument();
});
