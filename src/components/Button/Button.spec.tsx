import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Button from "./Button";

/* eslint-disable no-console */

describe("rtl test", () => {
  it("renders the label", () => {
    render(<Button label="Test-Button" onClick={console.log} />);
    expect(screen.getByText("Test-Button")).toBeDefined();
  });

  it("renders the children", () => {
    render(<Button onClick={console.log}>Test-Button</Button>);
    expect(screen.getByText("Test-Button")).toBeDefined();
  });
});
