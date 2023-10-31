import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import Footer from './Footer';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer bgColor="bg-footer" textColor="text-white" />);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the footer with the correct text', () => {
    const footer = screen.getByText('2023 © Git Sematary');
    expect(footer).toBeInTheDocument();
  });

  it('has the expected inline styles for background and text color', () => {
    const footer = screen.getByText('2023 © Git Sematary');
    expect(footer).toHaveStyle({ backgroundColor: 'bg-footer', color: 'text-white' });
  });
});
