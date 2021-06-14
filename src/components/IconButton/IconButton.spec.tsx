import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TestIcon from "resources/icons/test.svg";
import { Kind } from "types";
import IconButton from "./IconButton";

const { log } = console;

const icon = <TestIcon />;

describe("tests the IconButton props", () => {
  it("renders the IconButton", () => {
    const { container } = render(<IconButton onClick={log} icon={icon} />);
    expect(container.querySelector(".rc-icon-button")).toBeTruthy();
    expect(container.querySelector(".rc-icon-button__icon")).toBeTruthy();
  });

  it("renders all the kinds", () => {
    Object.values(Kind).forEach((kind) => {
      const { container } = render(
        <IconButton onClick={log} icon={icon} kind={kind} />
      );
      expect(container.querySelector(`.rc-icon-button--${kind}`)).toBeTruthy();
    });
  });

  it("renders the classname", () => {
    const { container } = render(
      <IconButton onClick={log} className="test" icon={icon} />
    );
    expect(container.querySelector(".test")).toBeTruthy();
  });

  it("renders as disabled", () => {
    const { container } = render(
      <IconButton onClick={log} disabled icon={icon} />
    );
    expect(container.querySelector(".rc-icon-button--disabled")).toBeTruthy();
  });

  it("renders the size", () => {
    const { container } = render(
      <IconButton onClick={log} size={30} icon={icon} />
    );
    const { width, height } = window.getComputedStyle(
      container.querySelector(".rc-icon-button") as Element
    );
    expect(width).toBe("30px");
    expect(height).toBe("30px");
  });
  it("trigger onClick", () => {
    const mockFn = jest.fn();
    const { container } = render(
      <IconButton onClick={mockFn} size={30} icon={icon} />
    );
    fireEvent.click(container.querySelector(".rc-icon-button") as Element);
    expect(mockFn).toHaveBeenCalled();
  });
});
