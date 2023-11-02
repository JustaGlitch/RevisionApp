import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import TasksList from '../TasksList';
import { MemoryRouter } from 'react-router-dom';
expect.extend(matchers);

describe('TasksList', () => {
  const tasks = [
    { id: 1, title: 'Task 1', status: 'Pending' },
    { id: 2, title: 'Task 2', status: 'Completed' },
    { id: 3, title: 'Task 3', status: 'Pending' },
    { id: 4, title: 'Task 4', status: 'Completed' },
  ];

  it('renders a list of tasks with "All" filter', () => {
    render(
      <MemoryRouter>
        <TasksList tasks={tasks} filter="All" />
      </MemoryRouter>
    );
    const taskElements = screen.getAllByTestId('task-card');
    expect(taskElements).toHaveLength(tasks.length);
  });

  it('renders filtered tasks based on the "filter" prop', () => {
    render(
      <MemoryRouter>
        <TasksList tasks={tasks} filter="Completed" />
      </MemoryRouter>
    );
    const taskElements = screen.getAllByTestId('task-card');

    console.log(taskElements); // Log the taskElements

    expect(taskElements).toHaveLength(2); // Two tasks are completed
  });

  it('renders task cards with the correct data', () => {
    render(
      <MemoryRouter>
        <TasksList tasks={tasks} filter="All" />
      </MemoryRouter>
    );

    // You can use getByText or other queries to find task data in TaskCard
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });
});
