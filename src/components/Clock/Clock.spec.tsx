import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
// import userEvent from "@testing-library/user-event";
import userEvent from "@testing-library/user-event";
import Clock from "./Clock";

function getHourPicker(container: Element): Element {
  const timeValues = Array.from(
    container.querySelectorAll(".rc-clock__picker")
  );
  return timeValues[0];
}
function getMinutePicker(container: Element): Element {
  const timeValues = Array.from(
    container.querySelectorAll(".rc-clock__picker")
  );
  return timeValues[1];
}
function getSecondPicker(container: Element): Element {
  const timeValues = Array.from(
    container.querySelectorAll(".rc-clock__picker")
  );
  return timeValues[2];
}

function getHours(container: Element): Element[] {
  return Array.from(
    getHourPicker(container).querySelectorAll(".rc-clock__picker__item")
  );
}
function getMinutes(container: Element): Element[] {
  return Array.from(
    getMinutePicker(container).querySelectorAll(".rc-clock__picker__item")
  );
}
function getSeconds(container: Element): Element[] {
  return Array.from(
    getSecondPicker(container).querySelectorAll(".rc-clock__picker__item")
  );
}

function getSelectedHour(container: Element): Element | null {
  return getHourPicker(container).querySelector(
    ".rc-clock__picker__item--selected"
  );
}
function getSelectedMinute(container: Element): Element | null {
  return getMinutePicker(container).querySelector(
    ".rc-clock__picker__item--selected"
  );
}
function getSelectedSecond(container: Element): Element | null {
  return getSecondPicker(container).querySelector(
    ".rc-clock__picker__item--selected"
  );
}

describe("tests the Clock", () => {
  it("renders the Clock", () => {
    const { container } = render(
      <Clock hour={9} minute={10} second={11} onChange={jest.fn()} />
    );
    expect(container.querySelector(".rc-clock")).toBeTruthy();
    expect(container.querySelectorAll(".rc-clock__picker")).toHaveLength(3);
    expect(container.querySelectorAll(".rc-clock__picker__item")).toHaveLength(
      144
    );
  });

  it("Sets the correct hour prop", () => {
    const { container } = render(<Clock hour={10} onChange={jest.fn()} />);
    expect(getSelectedHour(container)?.textContent).toBe("10");
  });

  it("Sets the correct minute prop", () => {
    const { container } = render(<Clock minute={10} onChange={jest.fn()} />);
    expect(getSelectedMinute(container)?.textContent).toBe("10");
  });

  it("Sets the correct second prop", () => {
    const { container } = render(<Clock second={10} onChange={jest.fn()} />);
    expect(getSelectedSecond(container)?.textContent).toBe("10");
  });

  it("Triggers onChange when clicking an hour", () => {
    const mockOnChange = jest.fn();
    const { container } = render(<Clock hour={10} onChange={mockOnChange} />);
    const [, h1] = getHours(container);
    userEvent.click(h1);
    expect(getSelectedHour(container)?.textContent).toBe("01");
    expect(mockOnChange).toHaveBeenCalledWith(1, 0, 0);
  });

  it("Triggers onChange when clicking an minute", () => {
    const mockOnChange = jest.fn();
    const { container } = render(<Clock minute={10} onChange={mockOnChange} />);
    const [, m1] = getMinutes(container);
    userEvent.click(m1);
    expect(getSelectedMinute(container)?.textContent).toBe("01");
    expect(mockOnChange).toHaveBeenCalledWith(0, 1, 0);
  });

  it("Triggers onChange when clicking an second", () => {
    const mockOnChange = jest.fn();
    const { container } = render(<Clock second={10} onChange={mockOnChange} />);
    const [, s1] = getSeconds(container);
    userEvent.click(s1);
    expect(getSelectedSecond(container)?.textContent).toBe("01");
    expect(mockOnChange).toHaveBeenCalledWith(0, 0, 1);
  });
});
