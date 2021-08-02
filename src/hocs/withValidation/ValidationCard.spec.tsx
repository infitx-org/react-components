import { render } from "@testing-library/react";
import ValidationCard from "./ValidationCard";

describe("tests the ValidationCards with active messages", () => {
  const messages = [
    {
      active: true,
      message: "This is an error",
    },
    {
      active: true,
      message: "Field cannot be empty",
    },
  ];

  it("renders required=true invalid=true", () => {
    const { container } = render(
      <ValidationCard empty={false} messages={messages} required invalid />
    );
    expect(container.querySelector(".rc-validation__messages")).toBeTruthy();
    expect(
      container.querySelector(".rc-validation__messages--required")
    ).toBeTruthy();
    expect(
      container.querySelector(".rc-validation__messages--invalid")
    ).toBeTruthy();
  });

  it("renders all messages", () => {
    const { container } = render(
      <ValidationCard empty={false} messages={messages} required invalid />
    );
    expect(container.children[0].getElementsByTagName("li").length).toBe(
      messages.length
    );
  });

  it("renders success", () => {
    const { container } = render(
      <ValidationCard
        empty={false}
        messages={messages.map((m) => ({ ...m, active: false }))}
        required
        invalid
      />
    );
    expect(container.querySelector(".rc-validation__messages")).toBeTruthy();
    expect(
      container.querySelector(".rc-validation__messages--required")
    ).toBeTruthy();
    expect(
      container.querySelector(".rc-validation__messages--valid")
    ).toBeTruthy();
  });

  it("renders invalid unset empty=true", () => {
    const { container } = render(
      <ValidationCard
        empty
        messages={messages.map((m) => ({ ...m, active: undefined }))}
        required={false}
        invalid
      />
    );
    expect(container.querySelector(".rc-validation__messages")).toBeTruthy();
    expect(
      container.querySelector(".rc-validation__messages--invalid")
    ).toBeTruthy();
    expect(
      container.querySelector(".rc-validation__messages--unset")
    ).toBeTruthy();
  });

  it("Checks invalid=false required=true empty=false unset class not rendered ", () => {
    const { container } = render(
      <ValidationCard empty={false} messages={messages} required invalid />
    );
    expect(container.querySelector(".rc-validation__messages")).toBeTruthy();
    expect(
      container.querySelector(".rc-validation__messages--invalid")
    ).toBeTruthy();
    expect(
      container.querySelector(".rc-validation__messages--unset")
    ).toBeNull();
  });
});
