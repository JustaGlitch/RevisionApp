import React from 'react';
import { it, expect, beforeEach, afterEach, describe } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import AddTaskForm from '../AddTaskForm'; // Update the import path

describe('AddTaskForm', () => {
  beforeEach(() => {
    render(<AddTaskForm />);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the form', () => {

    const titleInput = screen.getByPlaceholderText('Task title');
    const descriptionInput = screen.getByPlaceholderText('Task description');
    const addButton = screen.getByRole('button', { name: /Add Task/i });
    expect(titleInput).toBeTruthy();
    expect(descriptionInput).toBeTruthy();
    expect(addButton).toBeTruthy();
  });

  it('renders input fields for task title and description', () => {
    const titleInput = screen.getByPlaceholderText('Task title');
    const descriptionInput = screen.getByPlaceholderText('Task description');
    expect(titleInput).toBeTruthy();
    expect(descriptionInput).toBeTruthy();
  });

  it('renders an "Add Task" button', () => {
    const addButton = screen.getByRole('button', { name: /Add Task/i });
    expect(addButton).toBeTruthy();
  });

});
