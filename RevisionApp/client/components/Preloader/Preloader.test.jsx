import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, cleanup, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import matchers from '@testing-library/jest-dom/matchers';
import userEvent from '@testing-library/user-event';

import Loader from './Preloader';

expect.extend(matchers);

// Wrap the component in MemoryRouter as it uses react-router.
const renderComponent = () => {
  render(
    <MemoryRouter>
      <Loader />
    </MemoryRouter>
  );
};

describe('Loader Component', () => {
  beforeEach(() => {
    renderComponent();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the loader component with "Loading" text', () => {
    const loadingText = screen.getByText('Loading');
    expect(loadingText).toBeInTheDocument();
  });

  it('renders the loader component with an image', () => {
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });

//   it('matches the snapshot', () => {
//     const loader = screen.getByRole('loader');
//     expect(loader).toMatchSnapshot();
//   });

//   it('handles user interaction', () => {
//     const button = screen.getByRole('button');
//     userEvent.click(button);

//     // Perform assertions based on the user interaction.
//   });
});