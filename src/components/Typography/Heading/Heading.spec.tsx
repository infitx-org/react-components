import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Heading from "./Heading";

it("renders correct sizes", () => {
  [1, 2, 3, 4, 5, 6].forEach((size: number) => {
    const { container } = render(
      <Heading size={size.toString()}>Text</Heading>
    );
    expect(container.querySelector(`h${size}`)).toBeTruthy();
  });
});
