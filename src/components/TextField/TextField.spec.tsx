import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { Kind, InputSize } from "types";
import TextField from "./TextField";

const testFile = new File(
  [new Blob(["test"], { type: "text/plain" })],
  "test.dat"
);
const commonProps = {
  onChange: jest.fn(),
};

function getInput(container: HTMLElement): HTMLInputElement {
  return container.querySelector("input") as HTMLInputElement;
}

describe("tests the TextField props", () => {
  it("renders the TextField", () => {
    const { container } = render(<TextField {...commonProps} />);
    expect(container.querySelector(".rc-textfield")).toBeTruthy();
    expect(container.querySelectorAll("input")).toHaveLength(1);
  });

  it("renders the value", () => {
    const { container } = render(<TextField {...commonProps} value="test" />);
    const input = getInput(container);
    expect(input.value).toBe("test");
  });

  it("renders empty string when value is not specified", () => {
    const { container } = render(<TextField {...commonProps} />);
    const input = getInput(container);
    expect(input.value).toBe("");
  });

  it("renders the placeholder", () => {
    const { container } = render(
      <TextField {...commonProps} placeholder="test" />
    );
    expect(container.querySelector(".placeholder")).toBeTruthy();
  });

  it("renders the classname", () => {
    const { container } = render(
      <TextField {...commonProps} className="test" />
    );
    expect(container.querySelector(".test")).toBeTruthy();
  });

  it("renders as disabled", () => {
    const { container } = render(<TextField {...commonProps} disabled />);
    const input = getInput(container);
    expect(input.disabled).toBeTruthy();
  });

  it("renders as pending", () => {
    const { container } = render(<TextField {...commonProps} pending />);
    expect(container.querySelector(".rc-spinner")).toBeTruthy();
  });

  it("renders as required", () => {
    const { container } = render(<TextField {...commonProps} required />);
    expect(container.querySelector(".rc-field--required")).toBeTruthy();
  });

  it("renders as invalid", () => {
    const { container } = render(<TextField {...commonProps} invalid />);
    expect(container.querySelector(".rc-field--invalid")).toBeTruthy();
    expect(container.querySelector(".rc-invalid-icon")).toBeTruthy();
  });

  it("renders the small, medium, large sizes", () => {
    Object.values(InputSize).forEach((size) => {
      const { container } = render(<TextField {...commonProps} size={size} />);
      expect(container.querySelector(`.rc-field--${size}`)).toBeTruthy();
    });
  });

  it("renders all the kinds", () => {
    Object.values(Kind).forEach((kind) => {
      const { container } = render(<TextField {...commonProps} kind={kind} />);
      expect(container.querySelector(`.rc-field--${kind}`)).toBeTruthy();
    });
  });

  it("triggers onFocus when focusing", () => {
    const mockFn = jest.fn();
    const { container } = render(
      <TextField {...commonProps} onFocus={mockFn} />
    );
    fireEvent.focus(getInput(container));
    expect(mockFn).toHaveBeenCalled();
  });

  it("triggers onFocus when clicking", () => {
    const mockFn = jest.fn();
    const { container } = render(
      <TextField {...commonProps} onFocus={mockFn} />
    );
    userEvent.click(getInput(container));
    expect(mockFn).toHaveBeenCalled();
  });

  it("triggers onFocus when tabbing", () => {
    const mockFn = jest.fn();
    render(<TextField {...commonProps} onFocus={mockFn} />);
    userEvent.tab();
    expect(mockFn).toHaveBeenCalled();
  });

  it("triggers onBlur when clicking out", () => {
    const mockFn = jest.fn();
    const { container } = render(
      <TextField {...commonProps} onBlur={mockFn} />
    );
    userEvent.click(getInput(container));
    userEvent.click(document.body);
    expect(mockFn).toHaveBeenCalled();
  });

  // it("triggers onBlur when tabbing away", () => {
  //   const mockFn = jest.fn();
  //   const { container } = render(<TextField {...commonProps} onBlur={mockFn} />);
  //   userEvent.click(getInput(container));
  //   userEvent.tab();
  //   expect(mockFn).toHaveBeenCalled();
  // });

  it("trigger onChange", async () => {
    const mockFn = jest.fn();
    const { container } = render(<TextField onChange={mockFn} />);
    fireEvent.change(getInput(container), { target: { value: "test" } });
    expect(getInput(container).value).toBe("test");
    expect(mockFn).toHaveBeenCalledWith("test");
  });
});

// Snapshot testing
it("renders the TextField correctly when multiple props are set", () => {
  const { container } = render(
    <TextField {...commonProps} placeholder="test" />
  );
  expect(container).toMatchSnapshot();
});
