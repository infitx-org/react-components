import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TestIcon from "resources/icons/test.svg";
import { Kind } from "types";
import MessageBox from "./MessageBox";

const icon = <TestIcon />;

describe("test the MessageBox component", () => {
  it("renders the component", () => {
    const { container } = render(<MessageBox message="message" />);
    expect(container.querySelector(".rc-message-box")).toBeTruthy();
  });

  it("renders null if no message or children are set", () => {
    const { container } = render(<MessageBox />);
    expect(container.querySelector(".rc-message-box")).toBeFalsy();
  });

  it("renders the message", () => {
    const { container } = render(<MessageBox message="message" />);
    expect(container.querySelector(".rc-message-box__messages")).toBeTruthy();
    expect(
      container.querySelector(".rc-message-box__messages")
    ).toHaveTextContent("message");
  });

  it("renders multiple messages", () => {
    const { container } = render(
      <MessageBox message={["message", "message2"]} />
    );
    expect(container.querySelector(".rc-message-box__messages")).toBeTruthy();
    expect(container.querySelectorAll(".rc-message-box__message").length).toBe(
      2
    );
  });

  it("renders the children before the message", () => {
    const { container } = render(
      <MessageBox message="message">
        <span>child</span>
      </MessageBox>
    );
    expect(container.querySelector(".rc-message-box__messages")).toBeTruthy();
    expect(
      container.querySelector(".rc-message-box__messages")
    ).toHaveTextContent("child");
  });

  it("renders the prop center", () => {
    const { container } = render(<MessageBox message="message" center />);
    expect(container.querySelector(".rc-message-box")).toHaveClass(
      "rc-message-box--centered"
    );
  });

  it("renders the prop active", () => {
    const { container } = render(<MessageBox message="message" active />);
    expect(container.querySelector(".rc-message-box")).toHaveClass(
      "rc-message-box--active"
    );
  });

  it("renders the prop inverted", () => {
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
    const { container } = render(<MessageBox message="message" />);
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

  it("renders the correct font size", () => {
    const { container } = render(
      <MessageBox message="message" fontSize={40} />
    );
    expect(
      window.getComputedStyle(
        container.querySelector(".rc-message-box__messages") as Element
      ).fontSize
    ).toBe("40px");
  });

  it("renders the correct icon size", () => {
    const { container } = render(
      <MessageBox message="message" icon={icon} size={40} />
    );
    expect(container.querySelector("svg")).toHaveAttribute("width", "40");
    expect(container.querySelector("svg")).toHaveAttribute("height", "40");
  });

  it("renders the component correctly when multiple props are set", () => {
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
