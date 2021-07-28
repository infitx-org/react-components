import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Calendar from "./Calendar";

function getDay(
  container: HTMLElement,
  { cell = false, day = "01" }: { cell?: boolean; day: string }
): Element | undefined {
  const days = container.querySelectorAll(".rc-calendar__day__cell");
  const dayCell = Array.from(days).find((d) => d.textContent === day);
  if (cell) {
    return dayCell;
  }
  return dayCell?.querySelector(".rc-calendar__day") as Element;
}

describe("tests the Calendar", () => {
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

  it("Sets the correct initialYear prop", () => {
    const { container } = render(
      <Calendar initialMonth={0} initialYear={2000} />
    );
    expect(
      container.querySelector(".rc-calendar__current-year")
    ).toHaveTextContent("2000");
  });

  it("Sets the correct initialMonth prop", () => {
    const { container } = render(
      <Calendar initialYear={2021} initialMonth={0} />
    );
    expect(
      container.querySelector(".rc-calendar__current-month")
    ).toHaveTextContent("January");
  });

  it("Renders disabled sundays", () => {
    const { container } = render(
      <Calendar
        initialYear={2021}
        initialMonth={0}
        disabledDays={(d) => d.getDay() === 0}
      />
    );
    const JanuaryThree = getDay(container, { day: "03", cell: true });
    const JanuaryTen = getDay(container, { day: "10", cell: true });

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
    const JanuaryFive = getDay(container, { day: "05" });
    expect(
      JanuaryFive?.className.includes("rc-calendar__day--selected")
    ).toBeTruthy();
  });

  it("renders the selected range", () => {
    const { container } = render(
      <Calendar
        initialYear={2021}
        initialMonth={0}
        selectedDate={new Date(2021, 0, 5)}
      />
    );
    const JanuaryFive = getDay(container, { day: "05" });
    expect(
      JanuaryFive?.className.includes("rc-calendar__day--selected")
    ).toBeTruthy();
  });

  it("triggers onDayClick", () => {
    const onDayClickMock = jest.fn();
    const { container } = render(
      <Calendar
        initialYear={2021}
        initialMonth={0}
        onDayClick={onDayClickMock}
      />
    );
    const JanuaryTen = getDay(container, { day: "10" }) as Element;

    userEvent.click(JanuaryTen);

    const date = new Date("2021-01-10T00:00:00.000Z");
    const exportValue = [date, { selected: false }];

    expect(onDayClickMock).toHaveBeenCalledWith(...exportValue);
  });

  it("triggers onRangeClick", () => {
    const onDayClickMock = jest.fn();
    const onRangeClickMock = jest.fn();
    const { container } = render(
      <Calendar
        initialYear={2021}
        initialMonth={0}
        onDayClick={onDayClickMock}
        onDateRangeClick={onRangeClickMock}
      />
    );
    const JanuaryTen = getDay(container, { day: "10" }) as Element;
    const JanuaryTwelve = getDay(container, { day: "12" }) as Element;

    userEvent.click(JanuaryTen);
    userEvent.click(JanuaryTwelve);

    const startDate = new Date("2021-01-10T00:00:00.000Z");
    const exportStart = [startDate, { selected: false }];

    const endDate = new Date("2021-01-12T00:00:00.000Z");
    const exportEnd = [endDate, { selected: false }];

    expect(onDayClickMock).toHaveBeenCalledTimes(2);
    expect(onDayClickMock).toHaveBeenCalledWith(...exportStart);
    expect(onDayClickMock).toHaveBeenCalledWith(...exportEnd);

    expect(onRangeClickMock).toHaveBeenCalledTimes(2);
    expect(onRangeClickMock).toHaveBeenCalledWith([startDate, undefined]);
    expect(onRangeClickMock).toHaveBeenCalledWith([startDate, endDate]);
  });
});

describe("Tests the calendar year selection", () => {
  it("Sets the prev year clicking on the prev year icon button", () => {
    const { container } = render(
      <Calendar initialYear={2021} initialMonth={0} />
    );

    userEvent.click(
      container.querySelector(".rc-calendar__year-prev") as Element
    );
    expect(
      container.querySelector(".rc-calendar__current-year")
    ).toHaveTextContent("2020");
  });

  it("Sets the next year clicking on the next year icon button", () => {
    const { container } = render(
      <Calendar initialYear={2021} initialMonth={0} />
    );

    userEvent.click(
      container.querySelector(".rc-calendar__year-next") as Element
    );
    expect(
      container.querySelector(".rc-calendar__current-year")
    ).toHaveTextContent("2022");
  });
});

describe("Tests the calendar month selection", () => {
  it("Sets the prev month clicking on the prev month icon button", () => {
    const { container } = render(
      <Calendar initialYear={2021} initialMonth={0} />
    );

    userEvent.click(
      container.querySelector(".rc-calendar__month-prev") as Element
    );
    expect(
      container.querySelector(".rc-calendar__current-month")
    ).toHaveTextContent("December");
  });

  it("Sets the next month clicking on the next month icon button", () => {
    const { container } = render(
      <Calendar initialYear={2021} initialMonth={0} />
    );

    userEvent.click(
      container.querySelector(".rc-calendar__month-next") as Element
    );
    expect(
      container.querySelector(".rc-calendar__current-month")
    ).toHaveTextContent("February");
  });

  it("Opens the month selection when clicking on the month name", () => {
    const { container } = render(
      <Calendar initialYear={2021} initialMonth={0} />
    );

    userEvent.click(
      container.querySelector(".rc-calendar__current-month") as Element
    );
    const months = container.querySelectorAll(".rc-calendar__month");
    expect(months).toHaveLength(12);
  });

  it("Closes the month selection when clicking on the month name twice", () => {
    const { container } = render(
      <Calendar initialYear={2021} initialMonth={0} />
    );

    userEvent.click(
      container.querySelector(".rc-calendar__current-month") as Element
    );
    userEvent.click(
      container.querySelector(".rc-calendar__current-month") as Element
    );
    const months = container.querySelectorAll(".rc-calendar__month");
    expect(months).not.toHaveLength(12);
    expect(container.querySelectorAll(".rc-calendar__day")).toHaveLength(31);
  });

  it("Changes the current month when clicking on a month in the month picker", () => {
    const { container } = render(
      <Calendar initialYear={2021} initialMonth={0} />
    );

    userEvent.click(
      container.querySelector(".rc-calendar__current-month") as Element
    );
    const months = container.querySelectorAll(".rc-calendar__month");
    userEvent.click(months[3] as Element);
    const currentMonth = container.querySelector(".rc-calendar__current-month");
    expect(currentMonth).toHaveTextContent("April");
  });
});
