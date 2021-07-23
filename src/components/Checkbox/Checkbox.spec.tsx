import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Checkbox from "./Checkbox";

const commonProps = {
  name: "test-name",
  onChange: jest.fn(),
  label: "test-label",
};

describe("tests the checbox", () => {
  it("renders the checkbox group", () => {
    const { container } = render(<Checkbox {...commonProps} />);
    expect(container.querySelector(".rc-checkbox__wrapper")).toBeTruthy();
    expect(
      container.querySelector('input[type="checkbox"]')
    ).toBeInTheDocument();
  });

  it("renders the label prop", () => {
    const { container } = render(<Checkbox {...commonProps} />);
    expect(container.querySelector(".rc-checkbox__label")).toHaveTextContent(
      "test-label"
    );
  });

  it("renders the id prop", () => {
    const { container } = render(<Checkbox {...commonProps} id="test-id" />);
    expect(container.querySelector('input[type="checkbox"]')).toHaveAttribute(
      "id",
      "test-id"
    );
  });

  it("renders the name prop", () => {
    const { container } = render(<Checkbox {...commonProps} />);
    expect(container.querySelector('input[type="checkbox"]')).toHaveAttribute(
      "name",
      "test-name"
    );
  });

  it("renders the checked prop", () => {
    const { container } = render(<Checkbox {...commonProps} checked />);
    expect(
      container.querySelector('input[type="checkbox"][checked]')
    ).toBeInTheDocument();
  });

  it("renders the disabled prop", () => {
    const { container } = render(<Checkbox {...commonProps} disabled />);
    expect(
      container.querySelector('input[type="checkbox"][disabled]')
    ).toBeInTheDocument();
  });

  it("renders the semi prop", () => {
    const { container } = render(<Checkbox {...commonProps} semi />);
    expect(
      container.querySelector(
        'input[type="checkbox"].rc-checkbox--semi-checked'
      )
    ).toBeInTheDocument();
  });

  it("renders the round prop", () => {
    const { container } = render(<Checkbox {...commonProps} round />);
    expect(
      container.querySelector('input[type="checkbox"].rc-checkbox--round')
    ).toBeInTheDocument();
  });

  it("triggers the onChange", () => {
    const mockEvent = jest.fn();
    const { container } = render(
      <Checkbox {...commonProps} onChange={mockEvent} />
    );
    userEvent.click(
      container.querySelector('input[type="checkbox"]') as Element
    );
    expect(mockEvent).toHaveBeenCalledWith(true);
    // TODO: Let's see if using boolean is better than changeEvent
    // expect.objectContaining({
    //   type: "change",
    //   target: expect.objectContaining({ checked: true }),
    // })
    // );
  });
});

// Snapshot testing
it("renders the Checkbox correctly when multiple props are set", () => {
  const { container } = render(<Checkbox {...commonProps} />);
  expect(container).toMatchSnapshot();
});
