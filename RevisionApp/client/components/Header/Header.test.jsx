import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import matchers from '@testing-library/jest-dom/matchers';
import userEvent from '@testing-library/user-event'
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

  it('renders the home link', () => {
    const tasksLink = screen.getByRole('link', { name: /All Tasks/i });
    expect(tasksLink).toBeInTheDocument();
  });

  it('renders the account link', () => {
    const accountLink = screen.getByRole('link', { name: /Account/i });
    expect(accountLink).toBeInTheDocument();
    // userEvent.click(accountLink);
    // expect(window.location.pathname).toEqual('/account');
  
  });

  it('renders the login link', () => {
    const loginLink = screen.getByRole('link', { name: /Login/i });
    expect(loginLink).toBeInTheDocument();
    // userEvent.click(loginLink);
    // expect(window.location.pathname).toBe('/login');
  });

  it('renders the register link', () => {
    const registerLink = screen.getByRole('link', { name: /Register/i });
    expect(registerLink).toBeInTheDocument();
  });

});
