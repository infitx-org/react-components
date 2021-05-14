import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Kind, Size } from "types";
import Icon from "./Icon";
import { getIconSizeByComponentSize } from "../shared";

const icon = (
  <svg width="55" height="55" viewBox="-6 -3 55 55">
    <circle cx="10" cy="10" r="20" />
  </svg>
);

describe("tests the icon", () => {
  it("renders the icon", () => {
    const { container } = render(<Icon icon={icon} />);
    expect(container.querySelector("svg")).toBeTruthy();
    expect(container.querySelector("circle")).toBeTruthy();
  });

  it("renders the fill prop", () => {
    const { container } = render(<Icon icon={icon} fill="#f00" />);
    expect(container.querySelector("svg")).toHaveAttribute("fill", "#f00");
  });

  it("renders the stroke prop", () => {
    const { container } = render(<Icon icon={icon} stroke="#f00" />);
    expect(container.querySelector("svg")).toHaveAttribute("stroke", "#f00");
  });

  it("renders the numeric size prop", () => {
    const { container } = render(<Icon icon={icon} size={100} />);
    expect(container.querySelector("svg")).toHaveAttribute("height", "100");
    expect(container.querySelector("svg")).toHaveAttribute("width", "100");
  });

  it("renders the string size prop", () => {
    Object.values(Size).forEach((size) => {
      const { container } = render(<Icon icon={icon} size={size} />);
      expect(container.querySelector("svg")).toHaveAttribute(
        "height",
        getIconSizeByComponentSize(size).toString()
      );
      expect(container.querySelector("svg")).toHaveAttribute(
        "width",
        getIconSizeByComponentSize(size).toString()
      );
    });
  });

  it("renders the id prop", () => {
    const { container } = render(<Icon id="test" icon={icon} />);
    expect(container.querySelector("svg#test")).toBeTruthy();
  });

  it("renders the className prop", () => {
    const { container } = render(<Icon className="test" icon={icon} />);
    expect(container.querySelector("svg.test")).toBeTruthy();
  });

  it("renders the style prop", () => {
    const { container } = render(<Icon style={{ fill: "red" }} icon={icon} />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "style",
      "fill: red;"
    );
  });

  it("renders the default fill prop", () => {
    const { container } = render(<Icon icon={icon} />);
    expect(container.querySelector("svg")).toHaveAttribute("fill", "#000");
  });

  it("renders the default stroke prop", () => {
    const { container } = render(<Icon icon={icon} />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "stroke",
      "transparent"
    );
  });

  it("renders the default numeric size prop", () => {
    const { container } = render(<Icon icon={icon} />);
    expect(container.querySelector("svg")).toHaveAttribute("height", "20");
    expect(container.querySelector("svg")).toHaveAttribute("width", "20");
  });
});

// Snapshot testing
it("renders the Icon correctly when multiple props are set", () => {
  const { container } = render(<Icon icon={icon} fill="#f00" stroke="#000" />);
  expect(container).toMatchSnapshot();
});
