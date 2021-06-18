import { render } from "@testing-library/react";
import Column from "./Column";

function getStyle(container: HTMLElement) {
  return window.getComputedStyle(container.querySelector("div") as Element);
}

describe("tests the Column props", () => {
  it("renders the Column", () => {
    const { container } = render(<Column />);
    expect(container.querySelector("div")).toBeTruthy();
  });

  it("renders the children", () => {
    const { container } = render(
      <Column>
        <span>Child</span>
      </Column>
    );
    expect(container.querySelector("span")).toBeTruthy();
  });

  it("renders the className", () => {
    const { container } = render(<Column className="test" />);
    expect(container.querySelector(".test")).toBeTruthy();
  });

  it("renders as a flex-direction: Column", () => {
    const { container } = render(<Column />);
    expect(getStyle(container).flexDirection).toBe("column");
  });

  it("renders the align top as align items flex-start", () => {
    const { container } = render(<Column align="top" />);
    expect(getStyle(container).justifyContent).toBe("flex-start");
  });

  it("renders the align bottom as align items flex-end", () => {
    const { container } = render(<Column align="bottom" />);
    expect(getStyle(container).justifyContent).toBe("flex-end");
  });

  it("renders the align items and justify content flex-end", () => {
    const { container } = render(<Column align="bottom right" />);
    expect(getStyle(container).alignItems).toBe("flex-end");
    expect(getStyle(container).justifyContent).toBe("flex-end");
  });
});
