import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import TaskCard from './TaskCard';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

describe('TaskCard', () => {
    beforeEach(() => {
      render(<TaskCard />);
    });
  
    afterEach(() => {
      cleanup();
    });


  it('renders the component', () => {
    const taskCard = screen.getByTestId('task-card');
    expect(taskCard).toBeInTheDocument();
  });

  it('displays the class name', () => {
      const className = screen.getByText((content, element) => {
      const parentElement = element.parentElement;
      const hasExpectedClass = parentElement.classList.contains('card-list-head');
      return hasExpectedClass && content === 'Class 1';
    });
  
    expect(className).toBeInTheDocument();
  });
  


  it('displays the task details', () => {
     const taskDescription = screen.getByText((content, element) => {
      const taskDescriptionElement = element.closest('.list-group-item'); 
      return taskDescriptionElement && content.includes('Some placeholder content in a paragraph');
    });
  
    expect(taskDescription).toBeInTheDocument();
  });
  


  it('displays the timestamp', () => {
    const timestamp = screen.getByText((content, element) => {
      return content === 'now' && element.classList.contains('opacity-50');
    });
  
    expect(timestamp).toBeInTheDocument();
  });
  
  
});
