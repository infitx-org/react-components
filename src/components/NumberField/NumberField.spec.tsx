import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { Kind, InputSize } from "types";
import NumberField from "./NumberField";

const commonProps = {
  onChange: jest.fn(),
};

function getInput(container: HTMLElement): HTMLInputElement {
  return container.querySelector("input") as HTMLInputElement;
}

describe("tests the NumberField props", () => {
  it("renders the NumberField", () => {
    const { container } = render(<NumberField {...commonProps} />);
    expect(container.querySelector(".rc-numberfield")).toBeTruthy();
    expect(container.querySelectorAll("input")).toHaveLength(1);
  });

  it("renders the value", () => {
    const { container } = render(<NumberField {...commonProps} value={3} />);
    const input = getInput(container);
    expect(input.value).toBe("3");
  });

  it("renders empty string when value is not specified", () => {
    const { container } = render(<NumberField {...commonProps} />);
    const input = getInput(container);
    expect(input.value).toBe("");
  });

  it("renders the placeholder", () => {
    const { container } = render(
      <NumberField {...commonProps} placeholder="test" />
    );
    expect(container.querySelector(".placeholder")).toBeTruthy();
  });

  it("renders the classname", () => {
    const { container } = render(
      <NumberField {...commonProps} className="test" />
    );
    expect(container.querySelector(".test")).toBeTruthy();
  });

  it("renders as disabled", () => {
    const { container } = render(<NumberField {...commonProps} disabled />);
    const input = getInput(container);
    expect(input.disabled).toBeTruthy();
  });

  it("renders as pending", () => {
    const { container } = render(<NumberField {...commonProps} pending />);
    expect(container.querySelector(".rc-spinner")).toBeTruthy();
  });

  it("renders as required", () => {
    const { container } = render(<NumberField {...commonProps} required />);
    expect(container.querySelector(".rc-field--required")).toBeTruthy();
  });

  it("renders as invalid", () => {
    const { container } = render(<NumberField {...commonProps} invalid />);
    expect(container.querySelector(".rc-field--invalid")).toBeTruthy();
    expect(container.querySelector(".rc-invalid-icon")).toBeTruthy();
  });

  it("renders the small, medium, large sizes", () => {
    Object.values(InputSize).forEach((size) => {
      const { container } = render(
        <NumberField {...commonProps} size={size} />
      );
      expect(container.querySelector(`.rc-field--${size}`)).toBeTruthy();
    });
  });

  it("renders all the kinds", () => {
    Object.values(Kind).forEach((kind) => {
      const { container } = render(
        <NumberField {...commonProps} kind={kind} />
      );
      expect(container.querySelector(`.rc-field--${kind}`)).toBeTruthy();
    });
  });

  it("triggers onFocus when focusing", () => {
    const mockFn = jest.fn();
    const { container } = render(
      <NumberField {...commonProps} onFocus={mockFn} />
    );
    fireEvent.focus(getInput(container));
    expect(mockFn).toHaveBeenCalled();
  });

  it("triggers onFocus when clicking", () => {
    const mockFn = jest.fn();
    const { container } = render(
      <NumberField {...commonProps} onFocus={mockFn} />
    );
    userEvent.click(getInput(container));
    expect(mockFn).toHaveBeenCalled();
  });

  it("triggers onFocus when tabbing", () => {
    const mockFn = jest.fn();
    render(<NumberField {...commonProps} onFocus={mockFn} />);
    userEvent.tab();
    expect(mockFn).toHaveBeenCalled();
  });

  it("triggers onBlur when clicking out", () => {
    const mockFn = jest.fn();
    const { container } = render(
      <NumberField {...commonProps} onBlur={mockFn} />
    );
    userEvent.click(getInput(container));
    userEvent.click(document.body);
    expect(mockFn).toHaveBeenCalled();
  });

  // it("triggers onBlur when tabbing away", () => {
  //   const mockFn = jest.fn();
  //   const { container } = render(<NumberField {...commonProps} onBlur={mockFn} />);
  //   userEvent.click(getInput(container));
  //   userEvent.tab();
  //   expect(mockFn).toHaveBeenCalled();
  // });

  it("trigger onChange", async () => {
    const mockFn = jest.fn();
    const { container } = render(<NumberField onChange={mockFn} />);
    fireEvent.change(getInput(container), { target: { value: 3 } });
    expect(getInput(container).value).toBe("3");
    expect(mockFn).toHaveBeenCalledWith(3);
  });
});

// Snapshot testing
it("renders the NumberField correctly when multiple props are set", () => {
  const { container } = render(
    <NumberField {...commonProps} placeholder="test" />
  );
  expect(container).toMatchSnapshot();
});
