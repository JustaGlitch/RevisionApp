import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Header from './Header';

describe('Header', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the Home link', () => {
    const homeLink = screen.getByRole('link', { name: /All Tasks/i });
    expect(homeLink).toBeInTheDocument();
  });

  it('renders the Points link', () => {
    const pointsLink = screen.getByRole('link', { name: /Account/i });
    expect(pointsLink).toBeInTheDocument();
  });

  it('renders the Letter link', () => {
    const letterLink = screen.getByRole('link', { name: /Login/i });
    expect(letterLink).toBeInTheDocument();
  });

  it('renders the Letter link', () => {
    const letterLink = screen.getByRole('link', { name: /Register/i });
    expect(letterLink).toBeInTheDocument();
  });

});
