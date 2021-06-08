import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Kind } from "types";
import Tooltip from "./Tooltip";

// kind
// onClickOutside

describe("tests the Tooltip props", () => {
  it("renders the Tooltip children", () => {
    const { container } = render(
      <Tooltip label="tooltip!">
        <span>Text</span>
      </Tooltip>
    );
    expect(container.querySelector("span")).toBeTruthy();
    expect(container.querySelector("span")).toHaveTextContent("Text");
  });

  it("renders the tooltip on mouse enter", async () => {
    const dom = render(
      <Tooltip label="tooltip!">
        <span>Child</span>
      </Tooltip>
    );

    fireEvent.mouseEnter(await dom.findByText("Child"));

    expect(await dom.findByText("tooltip!")).toHaveTextContent("tooltip!");
  });

  it("renders with a delay", async () => {
    const dom = render(
      <Tooltip label="tooltip!" delay={1000}>
        <span>Child</span>
      </Tooltip>
    );

    fireEvent.mouseEnter(await dom.findByText("Child"));

    expect(await dom.findByText("tooltip!")).toHaveTextContent("tooltip!");
  });

  it("renders as dark kind by default", async () => {
    const dom = render(
      <Tooltip label="tooltip!">
        <span>Child</span>
      </Tooltip>
    );

    const span = await dom.findByText("Child");
    fireEvent.mouseEnter(span);

    expect(await dom.findByText("tooltip!")).toHaveClass(
      "rc-tooltip__label rc-tooltip__label--dark"
    );
  });

  it("renders custom content", async () => {
    const dom = render(
      <Tooltip content={<div>content</div>}>
        <span>Child</span>
      </Tooltip>
    );

    const span = await dom.findByText("Child");
    fireEvent.mouseEnter(span);

    expect(await dom.findByText("content")).toHaveTextContent("content");
  });
});
