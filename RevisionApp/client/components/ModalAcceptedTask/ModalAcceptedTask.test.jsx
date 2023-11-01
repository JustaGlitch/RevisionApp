import React from 'react';
import { it, expect, beforeEach, afterEach, describe } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import ModalAcceptedTask from './ModalAcceptedTask';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter } from 'react-router-dom';
import WrapperComponentForTesting from './WrapperComponentForTesting';
expect.extend(matchers);

describe('ModalAcceptedTask', () => {
    it('renders with the correct content and props', () => {
      const id = 1;
      const time = 30;
  
      render(
        <MemoryRouter>
          <WrapperComponentForTesting id={id} time={time} />
        </MemoryRouter>
      );
      
  
      // Check that the modal is present in the document
      const modal = screen.getByTestId(`acceptedTaskModal-${id}`);
      expect(modal).toBeInTheDocument();
  
      // Check modal title
      const modalTitle = screen.getByText('Congratulation!');
      expect(modalTitle).toBeInTheDocument();
  
      // Check modal body text
      const modalBodyText = screen.getByText("You've accepted the task.");
      expect(modalBodyText).toBeInTheDocument();
  
      // Check "Suggested time:" text
      const suggestedTimeText = screen.getByText("Suggested time:");
      expect(suggestedTimeText).toBeInTheDocument();
  
      // Check the time value
      const timeValue = screen.getByText(`${time} min.`);
      expect(timeValue).toBeInTheDocument();
  
      // Check the link by its text content
      const goToTaskButton = screen.getByText('Go to the Task Page');
      expect(goToTaskButton).toBeInTheDocument();
  
      // Check "Close" button
      const closeButton = screen.getByText('Close');
      expect(closeButton).toBeInTheDocument();
    });
  });