import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Kind } from "types";
import Pill from "./Pill";

const icon = (
  <svg viewBox="0 0 20 20">
    <circle cx="10" r="5" cy="10" />
  </svg>
);

describe("test the Pill component", () => {
  it("renders the component", () => {
    const { container } = render(<Pill />);
    expect(container.querySelector(".rc-pill")).toBeTruthy();
  });

  it("renders the label", () => {
    const { container } = render(<Pill label="Hello" />);
    expect(container.querySelector(".rc-pill__label")).toBeTruthy();
    expect(container.querySelector(".rc-pill__label")).toHaveTextContent(
      "Hello"
    );
  });

  it("renders the active state", () => {
    const { container } = render(<Pill active />);
    expect(container.querySelector(".rc-pill")).toHaveClass("rc-pill--active");
  });

  it("renders the inverted state", () => {
    const { container } = render(<Pill inverted />);
    expect(container.querySelector(".rc-pill")).toHaveClass(
      "rc-pill--inverted"
    );
  });

  it("renders the icon", () => {
    const { container } = render(<Pill icon={icon} />);
    expect(container.querySelector(".rc-pill__icon")).toBeTruthy();
  });

  it("renders the prop fill", () => {
    const { container } = render(<Pill icon={icon} fill="#fff" />);
    expect(container.querySelector("svg")).toHaveAttribute("fill", "#fff");
  });

  it("renders the prop className", () => {
    const { container } = render(<Pill className="test" />);
    expect(container.querySelector(".rc-pill")).toHaveClass("test");
  });

  it("renders the prop id", () => {
    const { container } = render(<Pill id="testPillId" />);
    expect(container.querySelector(".rc-pill")).toHaveAttribute(
      "id",
      "testPillId"
    );
  });

  it("renders the default correct kind", () => {
    const { container } = render(<Pill icon={icon} />);
    expect(container.querySelector(".rc-pill")).toHaveClass("rc-pill--default");
  });

  it("renders all the kinds", () => {
    Object.values(Kind).forEach((kind) => {
      const { container } = render(<Pill kind={kind} />);
      expect(container.querySelector(".rc-pill")).toHaveClass(
        `rc-pill--${kind}`
      );
    });
  });

  it("renders the component correctly when multiple props are set", () => {
    const { container } = render(
      <Pill icon={icon} kind="secondary" active fill="#fff" />
    );
    expect(container).toMatchSnapshot();
  });
});
