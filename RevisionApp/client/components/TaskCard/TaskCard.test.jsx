import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import TaskCard from './TaskCard';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
expect.extend(matchers);

describe('TaskCard', () => {
  const task = {
    title: 'Class 1',
    description: 'Some placeholder content in a paragraph',
    timestamp: 'now',
  };

  beforeEach(() => {
    render(
      <MemoryRouter> 
        <TaskCard task={task} />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

    it('renders the component', () => {
      const taskCard = screen.getByTestId('task-card');
      expect(taskCard).toBeInTheDocument();
    });

    it('displays the class name', () => {
      const className = screen.getByText('Class 1', { selector: '.card-list-head h6' });
      expect(className).toBeInTheDocument();
    });
    

    it('displays the task details', () => {
      const taskDescription = screen.getByText(task.description);
      expect(taskDescription).toBeInTheDocument();
    });

    it('displays the timestamp', () => {
      const timestamp = screen.getByText(task.timestamp);
      expect(timestamp).toBeInTheDocument();
    });
});
