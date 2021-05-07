import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Button from "./Button";
import { Kind, Size } from "../types";

/* eslint-disable no-console */
const { log } = console;

const icon = (
  <svg width="55" height="55" viewBox="-6 -3 55 55">
    <circle cx="10" cy="10" r="20" />
  </svg>
);

describe("tests the buttton", () => {
  it("renders the label", () => {
    render(<Button label="Test-Button" onClick={log} />);
    expect(screen.getByText("Test-Button")).toBeDefined();
  });

  it("renders the children", () => {
    render(<Button onClick={log}>Test-Button</Button>);
    expect(screen.getByText("Test-Button")).toBeDefined();
  });

  it("renders the disabled state", () => {
    const { container } = render(
      <Button onClick={log} disabled>
        Test-Button
      </Button>
    );
    expect(container.querySelector("button")).toBeDisabled();
  });

  it("renders the spinner", () => {
    const { container } = render(<Button onClick={log} pending />);
    expect(container.querySelector(".el-spinner")).toBeTruthy();
  });

  it("renders the spinner before the icon", () => {
    const { container } = render(<Button icon={icon} onClick={log} pending />);
    expect(container.querySelector(".el-spinner")).toBeTruthy();
  });

  it("renders the icon", () => {
    const { container } = render(<Button icon={icon} onClick={log} />);
    expect(container.querySelector("svg")).toBeTruthy();
  });

  it("renders the id", () => {
    const { container } = render(<Button id="test" onClick={log} />);
    expect(container.querySelector("button#test")).toBeTruthy();
  });

  it("renders the className", () => {
    const { container } = render(<Button className="test" onClick={log} />);
    expect(container.querySelector("button.test")).toBeTruthy();
  });

  it("renders the style prop", () => {
    const { container } = render(
      <Button style={{ fill: "red" }} onClick={log} />
    );
    expect(container.querySelector("button")).toHaveAttribute(
      "style",
      "fill: red;"
    );
  });

  it("renders the default kind as primary kind", () => {
    const { container } = render(<Button onClick={log} />);
    expect(
      container.querySelector("button.input-button--primary")
    ).toBeTruthy();
  });

  it("renders all the kinds", () => {
    Object.values(Kind).forEach((kind) => {
      const { container } = render(<Button onClick={log} kind={kind} />);
      expect(
        container.querySelector(`button.input-button--${kind}`)
      ).toBeTruthy();
    });
  });

  it('renders with the "noFill" prop', () => {
    const { container } = render(<Button onClick={log} noFill />);
    expect(container.querySelector("button.input-button--noFill")).toBeTruthy();
  });

  it("renders the large, medium, small sizes", () => {
    Object.values(Size).forEach((size) => {
      const { container } = render(<Button onClick={log} size={size} />);
      expect(container.querySelector(`.input-button--${size}`)).toBeTruthy();
    });
  });

  it("triggers the onClick prop", () => {
    const mockEvent = jest.fn();
    const { container } = render(<Button onClick={mockEvent} />);
    userEvent.click(container.querySelector("button") as HTMLButtonElement);
    expect(mockEvent).toHaveBeenCalled();
  });
});

// // Snapshot testing

it("renders the button correctly when multiple props are set", () => {
  const { container } = render(
    <Button
      onClick={log}
      label="Snapshot button"
      kind="secondary"
      disabled
      pending
    />
  );
  expect(container).toMatchSnapshot();
});
