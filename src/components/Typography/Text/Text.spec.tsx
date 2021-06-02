import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Text from "./Text";

function getStyle(container: HTMLElement) {
  return window.getComputedStyle(container.querySelector("span") as Element);
}

describe("tests the Text component", () => {
  it("renders as a span", () => {
    const { container } = render(<Text>Text</Text>);
    expect(container.querySelector("span")).toBeTruthy();
  });

  it("renders as bold", () => {
    const { container } = render(<Text bold>Text</Text>);
    expect(container.querySelector(".rc-text--bold")).toBeTruthy();
  });

  it("renders as italic", () => {
    const { container } = render(<Text italic>Text</Text>);
    expect(container.querySelector(".rc-text--italic")).toBeTruthy();
  });

  it("renders as underlined", () => {
    const { container } = render(<Text underline>Text</Text>);
    expect(container.querySelector(".rc-text--underline")).toBeTruthy();
  });

  it("renders as highlighted", () => {
    const { container } = render(<Text highlight>Text</Text>);
    expect(container.querySelector(".rc-text--highlight")).toBeTruthy();
  });

  it("renders as light", () => {
    const { container } = render(<Text light>Text</Text>);
    expect(container.querySelector(".rc-text--light")).toBeTruthy();
  });

  it("renders as disabled", () => {
    const { container } = render(<Text disabled>Text</Text>);
    expect(container.querySelector(".rc-text--disabled")).toBeTruthy();
  });

  it("renders with color", () => {
    const { container } = render(<Text color="red">Text</Text>);
    expect(getStyle(container).color).toBe("red");
  });

  it("renders with style", () => {
    const { container } = render(
      <Text style={{ background: "red" }}>Text</Text>
    );
    expect(getStyle(container).backgroundColor).toBe("red");
  });

  it("renders with className", () => {
    const { container } = render(<Text className="test">Text</Text>);
    expect(container.querySelector("span.test")).toBeTruthy();
  });
});
