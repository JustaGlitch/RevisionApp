import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import RegisterForm from './RegisterForm';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

describe('RegisterForm', () => {
  beforeEach(() => {
    render(<RegisterForm />);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the registration form', () => {
    const heading = screen.getByRole('heading', { name: /Register Page/ });
    expect(heading).toBeInTheDocument();
  });
  
  

  it('renders input fields for name, password, and confirm password', () => {
    const nameInput = screen.getByPlaceholderText('Your Name');
    const passwordInput = screen.getByPlaceholderText('Your Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Your Password Again');

    expect(nameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
  });

  it('renders a select field for choosing a class', () => {
    const classSelect = screen.getByRole('combobox');
    expect(classSelect).toBeInTheDocument();
  });

it('renders three select options', () => {
    
  const selectOptions = screen.getAllByRole('option', { name: /Select|One|Two|Three/ });
  expect(selectOptions).toHaveLength(4); 
  expect(selectOptions[0].textContent).toBe('Select');
  expect(selectOptions[1].textContent).toBe('One');
  expect(selectOptions[2].textContent).toBe('Two');
  expect(selectOptions[3].textContent).toBe('Three');

});

  it('renders a Register button', () => {
    const registerButton = screen.getByRole('button', { name: /Register/i });
    expect(registerButton).toBeInTheDocument();
  });
});
