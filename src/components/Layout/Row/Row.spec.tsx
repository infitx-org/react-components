import { render } from "@testing-library/react";
import Row from "./Row";

function getStyle(container: HTMLElement) {
  return window.getComputedStyle(container.querySelector("div") as Element);
}

describe("tests the Row props", () => {
  it("renders the Row", () => {
    const { container } = render(<Row />);
    expect(container.querySelector("div")).toBeTruthy();
  });

  it("renders the children", () => {
    const { container } = render(
      <Row>
        <span>Child</span>
      </Row>
    );
    expect(container.querySelector("span")).toBeTruthy();
  });

  it("renders the className", () => {
    const { container } = render(<Row className="test" />);
    expect(container.querySelector(".test")).toBeTruthy();
  });

  it("renders as a flex-direction: row", () => {
    const { container } = render(<Row />);
    expect(getStyle(container).flexDirection).toBe("row");
  });

  it("renders the align top as align items flex-start", () => {
    const { container } = render(<Row align="top center" />);
    expect(getStyle(container).alignItems).toBe("flex-start");
  });

  it("renders the align bottom as align items flex-end", () => {
    const { container } = render(<Row align="bottom center" />);
    expect(getStyle(container).alignItems).toBe("flex-end");
  });

  it("renders the align left as justify content flex-start", () => {
    const { container } = render(<Row align="left" />);
    expect(getStyle(container).justifyContent).toBe("flex-start");
  });

  it("renders the align right as justify content flex-end", () => {
    const { container } = render(<Row align="right" />);
    expect(getStyle(container).justifyContent).toBe("flex-end");
  });

  it("renders the align items and justify content flex-end", () => {
    const { container } = render(<Row align="bottom right" />);
    expect(getStyle(container).alignItems).toBe("flex-end");
    expect(getStyle(container).justifyContent).toBe("flex-end");
  });
});
