import { render, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { Kind, InputSize } from "types";
import FileUploader from "./FileUploader";

const testFile = new File(
  [new Blob(["test"], { type: "text/plain" })],
  "test.dat"
);
const commonProps = {
  onChange: jest.fn(),
};

function getInput(container: HTMLElement): HTMLInputElement {
  return container.querySelector("input[type='file']") as HTMLInputElement;
}

function getButton(container: HTMLElement): HTMLInputElement {
  return container.querySelector("button") as HTMLInputElement;
}

function getFileName(container: HTMLElement): HTMLInputElement {
  return container.querySelector(".rc-fileuploader") as HTMLInputElement;
}

describe("tests the FileUploader props", () => {
  it("renders the FileUploader", () => {
    const { container } = render(<FileUploader {...commonProps} />);
    expect(container.querySelector(".rc-fileuploader")).toBeTruthy();
    expect(container.querySelectorAll('input[type="file"]')).toHaveLength(1);
  });

  it("renders the file", () => {
    const { container } = render(
      <FileUploader {...commonProps} file={testFile} />
    );
    const fileName = getFileName(container);
    expect(fileName).toHaveTextContent(testFile.name);
  });

  it("renders no filename when file is not specified", () => {
    const { container } = render(<FileUploader {...commonProps} />);
    const fileName = getFileName(container);
    expect(fileName).toHaveTextContent("");
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

  it("renders all the kinds", () => {
    Object.values(Kind).forEach((kind) => {
      const { container } = render(
        <FileUploader {...commonProps} kind={kind} />
      );
      expect(container.querySelector(`.rc-field--${kind}`)).toBeTruthy();
    });
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

  it("trigger onChange and selects the file", async () => {
    const mockFn = jest.fn();
    const { container } = render(<FileUploader onChange={mockFn} />);
    await waitFor(() => userEvent.upload(getInput(container), testFile));
    const input = await waitFor(() => getInput(container));
    expect(input.files?.[0]?.name).toBe(testFile.name);
    expect(getFileName(container)).toHaveTextContent(testFile.name);
    expect(mockFn).toHaveBeenCalledWith("test");
  });

  it("trigger onChange when removing the selected file", async () => {
    const mockFn = jest.fn();
    const { container } = render(
      <FileUploader onChange={mockFn} file={testFile} />
    );
    fireEvent.click(getButton(container) as Element);
    expect(getFileName(container)).toHaveTextContent("");
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
