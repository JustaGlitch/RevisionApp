import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Index from './index';
import { MemoryRouter } from 'react-router-dom';
import { it, expect, beforeEach, afterEach, describe } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

it('renders account information', () => {
  render(<MemoryRouter>
    <Index />
  </MemoryRouter>);

  afterEach(() => {
    cleanup();
  });
  

  const header = screen.getByText('Account information');
  const nameElement = screen.getByText('Name:');
  const passwordElement = screen.getByText('Password:');
  const classElement = screen.getByText('Your Class:');
  const collectionLink = screen.getByText('18/510');
  

  expect(header).toBeInTheDocument();
  expect(nameElement).toBeInTheDocument();
  expect(passwordElement).toBeInTheDocument();
  expect(classElement).toBeInTheDocument();
  
  fireEvent.click(collectionLink); 
});

it('opens the "Change Your Info" modal when button is clicked', () => {
  render(<MemoryRouter>
    <Index />
    </MemoryRouter>);
  
  const updateButton = screen.getByText('Change your details');
  fireEvent.click(updateButton); 
  

  const modalTitle = screen.getByText('Change Your Info');
  expect(modalTitle).toBeInTheDocument();
});
