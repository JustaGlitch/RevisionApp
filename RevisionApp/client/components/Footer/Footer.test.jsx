import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import Footer from './Footer';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the footer with the correct text', () => {
    const footer = screen.getByText('2023 © Git Sematary');
    expect(footer).toBeInTheDocument();
  });

  it('has the expected CSS classes', () => {
    const footer = screen.getByText('2023 © Git Sematary');
    expect(footer).toHaveClass('w-100 d-flex py-3 justify-content-center bg-footer text-white');
  });
});
