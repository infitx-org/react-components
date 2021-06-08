import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { InputSize, Kind } from "types";
import Field from "./Field";

describe("tests the Field props", () => {
  it("renders the Field", () => {
    const { container } = render(<Field>test</Field>);
    expect(container.querySelector(".rc-field")).toBeTruthy();
  });

  it("renders the children", () => {
    const { container } = render(
      <Field>
        <span>Child</span>
      </Field>
    );
    expect(container.querySelector("span")).toHaveTextContent("Child");
  });

  it("renders the classname", () => {
    const { container } = render(<Field className="test">test</Field>);
    expect(container.querySelector(".test")).toBeTruthy();
  });

  it("renders as disabled", () => {
    const { container } = render(<Field disabled>test</Field>);
    expect(container.querySelector(".rc-field--disabled")).toBeTruthy();
  });

  it("renders as required", () => {
    const { container } = render(<Field required>test</Field>);
    expect(container.querySelector(".rc-field--required")).toBeTruthy();
  });

  it("renders as invalid", () => {
    const { container } = render(<Field invalid>test</Field>);
    expect(container.querySelector(".rc-field--invalid")).toBeTruthy();
  });

  it("renders as focused", () => {
    const { container } = render(<Field focused>test</Field>);
    expect(container.querySelector(".rc-field--focused")).toBeTruthy();
  });

  it("renders the small, medium, large sizes", () => {
    Object.values(InputSize).forEach((size) => {
      const { container } = render(<Field size={size}>test</Field>);
      expect(container.querySelector(`.rc-field--${size}`)).toBeTruthy();
    });
  });

  it("renders the kinds", () => {
    Object.values(Kind).forEach((kind) => {
      const { container } = render(<Field kind={kind}>test</Field>);
      expect(container.querySelector(`.rc-field--${kind}`)).toBeTruthy();
    });
  });

  it("triggers onClick when clicking", () => {
    const mockFn = jest.fn();
    const { container } = render(<Field onClick={mockFn}>test</Field>);
    userEvent.click(container.querySelector(".rc-field") as Element);
    expect(mockFn).toHaveBeenCalled();
  });
});

// Snapshot testing
it("renders the Field correctly when multiple props are set", () => {
  const { container } = render(
    <Field required invalid disabled>
      test
    </Field>
  );
  expect(container).toMatchSnapshot();
});
