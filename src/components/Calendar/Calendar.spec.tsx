import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MockDate from "../../../__mocks__/dateMock";
import Calendar from "./Calendar";

// selectedDate ?: Date;
// selectedRange ?: DateRange;
// disabledDays ?: DisabledDays;
// onDayClick ?: (day: Date, { selected }: { selected: boolean }) => void;
// onDateRangeClick ?: (range: DateRange) => void;

describe("tests the Calendar", () => {
  // beforeAll(() => {
  //   // @ts-ignore
  //   window.Date = MockDate;
  //   // @ts-ignore
  //   global.Date = MockDate;
  // });

  // afterAll(() => {
  //   window.Date = MockDate.getRealDate();
  // });
  it("renders the Calendar", () => {
    const { container } = render(
      <Calendar initialMonth={0} initialYear={2021} />
    );
    expect(container.querySelector(".rc-calendar")).toBeTruthy();
    expect(container.querySelectorAll(".rc-calendar__day")).toHaveLength(31);
  });

  // it("shows the correct current date", () => {
  // Find a way to do that!
  // });

  it("Sets the correct Initial Year", () => {
    const { container } = render(
      <Calendar initialMonth={0} initialYear={2000} />
    );
    expect(container.querySelector(".rc-calendar__year")).toHaveTextContent(
      "2000"
    );
  });

  it("Sets the correct Initial Month", () => {
    const { container } = render(
      <Calendar initialYear={2021} initialMonth={0} />
    );
    expect(container.querySelector(".rc-calendar__month")).toHaveTextContent(
      "January"
    );
  });

  it("Renders disabled sundays", () => {
    const { container } = render(
      <Calendar
        initialYear={2021}
        initialMonth={0}
        disabledDays={(d) => d.getDay() === 0}
      />
    );
    const days = container.querySelectorAll(".rc-calendar__day__cell");
    const JanuaryThree = Array.from(days).find((d) => d.textContent === "03");
    const JanuaryTen = Array.from(days).find((d) => d.textContent === "10");
    expect(
      JanuaryThree?.className.includes("rc-calendar__day__cell--disabled")
    ).toBeTruthy();
    expect(
      JanuaryTen?.className.includes("rc-calendar__day__cell--disabled")
    ).toBeTruthy();
  });

  it("renders the selected date", () => {
    const { container } = render(
      <Calendar
        initialYear={2021}
        initialMonth={0}
        selectedDate={new Date(2021, 0, 5)}
      />
    );
    const days = container.querySelectorAll(".rc-calendar__day");
    const JanuaryFive = Array.from(days).find((d) => d.textContent === "05");
    expect(
      JanuaryFive?.className.includes("rc-calendar__day--selected")
    ).toBeTruthy();
  });
});
