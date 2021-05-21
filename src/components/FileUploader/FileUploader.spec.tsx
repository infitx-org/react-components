import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { InputSize } from "types";
import FileUploader from "./FileUploader";

const commonProps = {
  onChange: jest.fn(),
};

function getCalendarDays(container: HTMLElement): NodeListOf<HTMLDivElement> {
  return container.querySelectorAll(
    ".DayPicker-Day:not(.DayPicker-Day--outside)"
  ) as NodeListOf<HTMLDivElement>;
}
function getCalendar(container: HTMLElement): HTMLDivElement {
  return container.querySelector(
    ".rc-FileUploader__calendar"
  ) as HTMLDivElement;
}
function getInput(container: HTMLElement): HTMLInputElement {
  return container.querySelector("input[type='text']") as HTMLInputElement;
}

describe("tests the FileUploader props", () => {
  it("renders the FileUploader", () => {
    const { container } = render(<FileUploader {...commonProps} />);
    expect(container.querySelector(".rc-FileUploader")).toBeTruthy();
    expect(container.querySelectorAll('input[type="text"]')).toHaveLength(1);
  });

  it("does not render the closed calendar", () => {
    const { container } = render(<FileUploader {...commonProps} />);
    expect(container.querySelector(".rc-FileUploader__calendar")).toBeFalsy();
  });

  it("renders the date", () => {
    const { container } = render(
      <FileUploader
        {...commonProps}
        value={new Date("12/31/2021").toString()}
        format="MM/dd/yyyy"
      />
    );
    const input = getInput(container);
    expect(input.value).toBe("12/31/2021");
  });

  it("renders no date when value is not specified", () => {
    const { container } = render(<FileUploader {...commonProps} />);
    const input = getInput(container);
    expect(input.value).toBe("");
  });

  it("renders the placeholder", () => {
    const { container } = render(
      <FileUploader {...commonProps} placeholder="test" />
    );
    expect(container.querySelector(".placeholder")).toBeTruthy();
  });

  it("renders the classname", () => {
    const { container } = render(
      <FileUploader {...commonProps} className="test" />
    );
    expect(container.querySelector(".test")).toBeTruthy();
  });

  it("renders as disabled", () => {
    const { container } = render(<FileUploader {...commonProps} disabled />);
    const input = getInput(container);
    expect(input.disabled).toBeTruthy();
  });

  it("renders as pending", () => {
    const { container } = render(<FileUploader {...commonProps} pending />);
    expect(container.querySelector(".rc-spinner")).toBeTruthy();
  });

  it("renders as required", () => {
    const { container } = render(<FileUploader {...commonProps} required />);
    expect(container.querySelector(".rc-field--required")).toBeTruthy();
  });

  it("renders as invalid", () => {
    const { container } = render(<FileUploader {...commonProps} invalid />);
    expect(container.querySelector(".rc-field--invalid")).toBeTruthy();
    expect(container.querySelector(".rc-invalid-icon")).toBeTruthy();
  });

  it("renders the small, medium, large sizes", () => {
    Object.values(InputSize).forEach((size) => {
      const { container } = render(
        <FileUploader {...commonProps} size={size} />
      );
      expect(container.querySelector(`.rc-field--${size}`)).toBeTruthy();
    });
  });

  it("renders the calendar when clicked", () => {
    const { container } = render(<FileUploader {...commonProps} />);
    userEvent.click(getInput(container));
    expect(getCalendar(container)).toBeInTheDocument();
  });

  it("renders the calendar when focused", () => {
    const { container } = render(<FileUploader {...commonProps} />);
    fireEvent.focus(getInput(container));
    expect(getCalendar(container)).toBeInTheDocument();
  });

  it("selects a date when clicking a day", () => {
    const { container } = render(<FileUploader {...commonProps} format="dd" />);
    userEvent.click(getInput(container));
    const days = getCalendarDays(container);
    userEvent.click(days[0]);
    expect(getInput(container).value).toBe("01");
  });

  it("unselects a date when clicking the same day", () => {
    const { container } = render(<FileUploader {...commonProps} format="dd" />);
    userEvent.click(getInput(container));
    const days = getCalendarDays(container);
    userEvent.click(days[0]);
    userEvent.click(days[0]);
    expect(getInput(container).value).toBe("");
  });

  it("triggers onFocus when focusing", () => {
    const mockFn = jest.fn();
    const { container } = render(
      <FileUploader {...commonProps} onFocus={mockFn} />
    );
    fireEvent.focus(getInput(container));
    expect(mockFn).toHaveBeenCalled();
  });

  it("triggers onFocus when clicking", () => {
    const mockFn = jest.fn();
    const { container } = render(
      <FileUploader {...commonProps} onFocus={mockFn} />
    );
    userEvent.click(getInput(container));
    expect(mockFn).toHaveBeenCalled();
  });

  it("triggers onFocus when tabbing", () => {
    const mockFn = jest.fn();
    render(<FileUploader {...commonProps} onFocus={mockFn} />);
    userEvent.tab();
    expect(mockFn).toHaveBeenCalled();
  });

  it("triggers onBlur when clicking out", () => {
    const mockFn = jest.fn();
    const { container } = render(
      <FileUploader {...commonProps} onBlur={mockFn} />
    );
    userEvent.click(getInput(container));
    userEvent.click(document.body);
    expect(mockFn).toHaveBeenCalled();
  });

  // it("triggers onBlur when tabbing away", () => {
  //   const mockFn = jest.fn();
  //   const { container } = render(<FileUploader {...commonProps} onBlur={mockFn} />);
  //   userEvent.click(getInput(container));
  //   userEvent.tab();
  //   expect(mockFn).toHaveBeenCalled();
  // });

  it("triggers onChange when selecting a date", () => {
    const mockEvent = jest.fn();
    const { container } = render(<FileUploader onChange={mockEvent} />);
    userEvent.click(getInput(container));
    const days = getCalendarDays(container);
    userEvent.click(days[0]);
    // const [call] = mockEvent.calls;
    expect(mockEvent).toHaveBeenCalled();
    const [[date]] = mockEvent.mock.calls;
    expect(date).toBeInstanceOf(Date);
  });

  it("triggers onChange when clicking the same day", () => {
    const mockFn = jest.fn();
    const { container } = render(
      <FileUploader
        {...commonProps}
        onChange={mockFn}
        value={new Date("01/01/2021").toString()}
      />
    );
    userEvent.click(getInput(container));
    const days = getCalendarDays(container);
    userEvent.click(days[0]);
    expect(mockFn).toHaveBeenCalledWith(undefined);
  });
});

// Snapshot testing
it("renders the FileUploader correctly when multiple props are set", () => {
  const { container } = render(
    <FileUploader {...commonProps} placeholder="test" />
  );
  expect(container).toMatchSnapshot();
});
