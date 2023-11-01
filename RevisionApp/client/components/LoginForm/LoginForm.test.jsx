import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import LoginForm from './LoginForm';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

describe('LoginForm', () => {
  beforeEach(() => {
    render(<LoginForm />);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the login form', () => {
    const heading = screen.getByRole('heading', { name: /Login Page/ });
    expect(heading).toBeInTheDocument();
  });

  it('renders input fields for name and password', () => {
    const nameInput = screen.getByPlaceholderText('Your Name');
    const passwordInput = screen.getByPlaceholderText('Your Password');

    expect(nameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('renders a login button', () => {
    const loginButton = screen.getByRole('button', { name: /Login/i });
    expect(loginButton).toBeInTheDocument();
  });
});