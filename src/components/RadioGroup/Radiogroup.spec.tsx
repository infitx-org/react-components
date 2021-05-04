import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import RadioGroup from "./RadioGroup";

const { log } = console;

const options = new Array(5)
  .fill(0)
  .map((_, index) => ({ label: index.toString(), value: index.toString() }));

const commonProps = {
  options,
  name: "test-name",
  onChange: jest.fn(),
  label: "test-label",
};

describe("tests the radio group", () => {
  it("renders the option group", () => {
    const { container } = render(<RadioGroup {...commonProps} />);
    expect(container.querySelector(".input-radiogroup span")).toBeTruthy();
    expect(container.querySelectorAll('input[type="radio"]')).toHaveLength(5);
  });

  it("renders the label prop", () => {
    const { container } = render(<RadioGroup {...commonProps} />);
    expect(container.querySelector(".input-radiogroup span")).toHaveTextContent(
      "test-label"
    );
  });

  it("renders the id prop", () => {
    const { container } = render(<RadioGroup {...commonProps} id="test-id" />);
    expect(container.querySelector(".input-radiogroup")).toHaveAttribute(
      "id",
      "test-id"
    );
  });

  it("renders the name prop", () => {
    const { container } = render(<RadioGroup {...commonProps} />);
    const inputs = container.querySelectorAll('input[type="radio"]');
    inputs.forEach((input) => {
      expect(input).toHaveAttribute("name", "test-name");
    });
  });

  it("renders selected prop", () => {
    const { container } = render(<RadioGroup {...commonProps} selected="1" />);
    const inputs = container.querySelectorAll('input[type="radio"][checked]');
    expect(inputs).toHaveLength(1);
  });

  it("renders disabled prop", () => {
    const { container } = render(<RadioGroup {...commonProps} disabled />);
    const inputs = container.querySelectorAll('input[type="radio"]');
    inputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  it("triggers the onChange", () => {
    const mockEvent = jest.fn();
    const { container } = render(
      <RadioGroup {...commonProps} onChange={mockEvent} />
    );
    userEvent.click(container.querySelector('input[type="radio"][value="1"]'));
    expect(mockEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "1" }),
      })
    );
  });
});

// Snapshot testing
it("renders the Icon correctly when multiple props are set", () => {
  const { container } = render(<RadioGroup {...commonProps} />);
  expect(container).toMatchSnapshot();
});
