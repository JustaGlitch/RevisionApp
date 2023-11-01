import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { it, expect, beforeEach, afterEach, describe } from 'vitest';
import ModalAcceptTask from './ModalAcceptTask'; // Adjust the import path as needed

describe('ModalAcceptTask', () => {
  it('renders the modal with initial values', () => {
    const id = 1;
    const { container } = render(<ModalAcceptTask id={id} />);
    
    // Check if the modal is rendered
    const modal = container.querySelector(`#task-${id}`);
    expect(modal).toBeInTheDocument();
    
    // Check if the initial suggested time is displayed
    const suggestedTimeInput = screen.getByTestId(`suggestedTimeInput-${id}`);
    expect(suggestedTimeInput).toHaveValue('30'); // Assuming the initial value is 30
    
    // You can add more assertions for other elements as needed
  });

  it('updates the suggested time when input changes', () => {
    const id = 1;
    render(<ModalAcceptTask id={id} />);
    
    const suggestedTimeInput = screen.getByTestId(`suggestedTimeInput-${id}`);
    
    // Simulate a user changing the suggested time
    fireEvent.change(suggestedTimeInput, { target: { value: '45' } });
    
    // Check if the input value has been updated
    expect(suggestedTimeInput).toHaveValue('45');
  });

  it('opens the "AcceptedTaskModal" when "Accept the Task" button is clicked', () => {
    const id = 1;
    render(<ModalAcceptTask id={id} />);
    
    const acceptTaskButton = screen.getByText('Accept the Task');
    
    // Check if the "AcceptedTaskModal" is not visible initially
    const acceptedTaskModal = screen.queryByTestId(`acceptedTaskModal-${id}`);
    expect(acceptedTaskModal).not.toBeInTheDocument();
    
    // Simulate a user clicking the "Accept the Task" button
    fireEvent.click(acceptTaskButton);
    
    // Check if the "AcceptedTaskModal" is now visible
    const updatedAcceptedTaskModal = screen.queryByTestId(`acceptedTaskModal-${id}`);
    expect(updatedAcceptedTaskModal).toBeInTheDocument();
  });
});
