import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import { MockAuthProvider } from './MockAuthContext';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

describe('LoginForm renders elements', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <MockAuthProvider>
          <LoginForm />
        </MockAuthProvider>
      </MemoryRouter>
    );
  });

  // Check if the elements are rendered
  const loginPageTitle = screen.getByRole('heading', { name: 'Login Page' });
  const usernameLabel = screen.getByText('Username');
  const passwordLabel = screen.getByText('Password');

  expect(loginPageTitle).toBeInTheDocument();
  expect(usernameLabel).toBeInTheDocument();
  expect(passwordLabel).toBeInTheDocument();
  // ... Add assertions for other elements
});

// Add cleanup after each test
afterEach(cleanup);
