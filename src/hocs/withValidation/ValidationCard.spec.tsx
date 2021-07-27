import { render, screen } from "@testing-library/react";

/* eslint-disable no-console */
const { log } = console;

// eslint-disable-next-line react/no-unused-prop-types
const Button = ({ label }: { label: string; onClick?: any }) => <div />;

describe("tests the buttton", () => {
  it("renders the label", () => {
    render(<Button label="Test-Button" onClick={log} />);
    expect(screen.getByText("Test-Button")).toBeDefined();
  });
});
