import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Kind } from "types";
import MessageBox from "./MessageBox";

const icon = (
  <svg viewBox="0 0 20 20">
    <circle cx="10" r="5" cy="10" />
  </svg>
);

describe("test the MessageBox component", () => {
  it("renders the component", () => {
    const { container } = render(<MessageBox message="message" />);
    expect(container.querySelector(".rc-message-box")).toBeTruthy();
  });

  it("renders the message", () => {
    const { container } = render(<MessageBox message="message" />);
    expect(container.querySelector(".rc-message-box__messages")).toBeTruthy();
    expect(
      container.querySelector(".rc-message-box__messages")
    ).toHaveTextContent("message");
  });

  it("renders the center state", () => {
    const { container } = render(<MessageBox message="message" center />);
    expect(container.querySelector(".rc-message-box")).toHaveClass(
      "rc-message-box--centered"
    );
  });

  it("renders the active state", () => {
    const { container } = render(<MessageBox message="message" active />);
    expect(container.querySelector(".rc-message-box")).toHaveClass(
      "rc-message-box--active"
    );
  });

  it("renders the inverted state", () => {
    const { container } = render(<MessageBox message="message" inverted />);
    expect(container.querySelector(".rc-message-box")).toHaveClass(
      "rc-message-box--inverted"
    );
  });

  it("renders the icon", () => {
    const { container } = render(<MessageBox message="message" icon={icon} />);
    expect(container.querySelector(".rc-message-box__icon")).toBeTruthy();
  });

  it("renders the prop fill", () => {
    const { container } = render(
      <MessageBox message="message" icon={icon} fill="#fff" />
    );
    expect(container.querySelector("svg")).toHaveAttribute("fill", "#fff");
  });

  it("renders the prop className", () => {
    const { container } = render(
      <MessageBox message="message" className="test" />
    );
    expect(container.querySelector(".rc-message-box")).toHaveClass("test");
  });

  it("renders the prop id", () => {
    const { container } = render(
      <MessageBox message="message" id="testMessageBoxId" />
    );
    expect(container.querySelector(".rc-message-box")).toHaveAttribute(
      "id",
      "testMessageBoxId"
    );
  });

  it("renders the default correct kind", () => {
    const { container } = render(<MessageBox message="message" icon={icon} />);
    expect(container.querySelector(".rc-message-box")).toHaveClass(
      "rc-message-box--default"
    );
  });

  it("renders all the kinds", () => {
    Object.values(Kind).forEach((kind) => {
      const { container } = render(
        <MessageBox message="message" kind={kind} />
      );
      expect(container.querySelector(".rc-message-box")).toHaveClass(
        `rc-message-box--${kind}`
      );
    });
  });

  it("renders the button correctly when multiple props are set", () => {
    const { container } = render(
      <MessageBox
        message="message"
        icon={icon}
        kind="secondary"
        active
        fill="#fff"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
