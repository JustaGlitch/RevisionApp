import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import LeftColumn from "./LeftColumn";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

describe("LeftColumn", () => {
  beforeEach(() => {
    render(<LeftColumn />);
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the component with the correct title", () => {
    const title = screen.getByText("class_id");
    expect(title).toBeInTheDocument();
  });

  it("renders three checkboxes with labels", () => {
    const checkboxes = screen.getAllByRole("checkbox");
    const checkboxLabels = screen.getAllByRole("checkbox", {
      name: /Class 1|Class 2|Tom Byrne/i,
    });

    expect(checkboxes).toHaveLength(3);
    expect(checkboxLabels).toHaveLength(3);
  });

  it("has correct labels for checkboxes", () => {
    const checkboxLabels = screen.getAllByText(/Class 1|Class 2|Tom Byrne/i);

    expect(checkboxLabels[0]).toHaveTextContent("Class 1");
    expect(checkboxLabels[1]).toHaveTextContent("Class 2");
    expect(checkboxLabels[2]).toHaveTextContent("Tom Byrne");
  });
});
