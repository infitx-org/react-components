import React from "react";
// import classnames from "classnames";
import { format } from "date-fns";
import Arrow from "../../../resources/icons/arrow.svg";
import IconButton from "../../IconButton";
import Days from "./Days";
import { DateRange, DisabledDays, Month } from "../types";
import { getMountMatrix } from "../helpers";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface MatrixProps {
  today: Date;
  year: number;
  month: Month;
  selectedDay?: Date;
  selectedRange: DateRange;
  disabledDays?: DisabledDays;
  onPrevYearClick: () => void;
  onNextYearClick: () => void;
  onPrevMonthClick: () => void;
  onNextMonthClick: () => void;
  onDayClick: (day: Date) => void;
}

export default function Matrix({
  today,
  year,
  month,
  selectedDay,
  selectedRange,
  disabledDays,
  onPrevYearClick,
  onNextYearClick,
  onPrevMonthClick,
  onNextMonthClick,
  onDayClick,
}: MatrixProps) {
  const matrix = getMountMatrix({ year, month }, (day, { sameMonth }) =>
    sameMonth ? format(day, "dd") : undefined
  );

  return (
    <table className="rc-calendar__table">
      <thead>
        <tr className="rc-calendar__year-row">
          <th>
            <IconButton
              className="rc-calendar__year-prev"
              size={24}
              icon={<Arrow />}
              onClick={onPrevYearClick}
            />
          </th>
          <th colSpan={5} className="rc-calendar__year">
            {year}
          </th>
          <th>
            <IconButton
              className="rc-calendar__year-next"
              size={24}
              icon={<Arrow />}
              onClick={onNextYearClick}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>
            <IconButton
              className="rc-calendar__month-prev"
              size={24}
              icon={<Arrow />}
              onClick={onPrevMonthClick}
            />
          </th>
          <th colSpan={5} className="rc-calendar__month">
            {monthNames[month]}
          </th>
          <th>
            <IconButton
              className="rc-calendar__month-next"
              size={24}
              icon={<Arrow />}
              onClick={onNextMonthClick}
            />
          </th>
        </tr>
        <tr>
          {dayNames.map((dayName) => (
            <td key={dayName} className="rc-calendar__dayname">
              {dayName}
            </td>
          ))}
        </tr>
        <Days
          matrix={matrix}
          today={today}
          year={year}
          month={month}
          selectedDay={selectedDay}
          selectedRange={selectedRange}
          disabledDays={disabledDays}
          onDayClick={onDayClick}
        />
      </tbody>
    </table>
  );
}
