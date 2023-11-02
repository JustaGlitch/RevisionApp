import React from "react";
import { it, expect, beforeEach, afterEach, describe } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import AddTaskForm from "./index"; 
import matchers from "@testing-library/jest-dom/matchers";
import { MemoryRouter } from "react-router-dom"; 
import fetch from "node-fetch"; 

expect.extend(matchers);


globalThis.fetch = fetch;

describe("AddTaskForm", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <AddTaskForm />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the form", () => {
    const titleInput = screen.getByPlaceholderText("Task title");
    const descriptionInput = screen.getByPlaceholderText("Task description");
    const addButton = screen.getByRole("button", { name: /Add Task/i });
    expect(titleInput).toBeTruthy();
    expect(descriptionInput).toBeTruthy();
    expect(addButton).toBeTruthy();
  });

  it("renders input fields for task title and description", () => {
    const titleInput = screen.getByPlaceholderText("Task title");
    const descriptionInput = screen.getByPlaceholderText("Task description");
    expect(titleInput).toBeTruthy();
    expect(descriptionInput).toBeTruthy();
  });

  it('renders an "Add Task" button', () => {
    const addButton = screen.getByRole("button", { name: /Add Task/i });
    expect(addButton).toBeTruthy();
  });
});
