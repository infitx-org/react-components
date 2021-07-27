import React from "react";
import classnames from "classnames";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import { isSameDay } from "../helpers";
import { Month, Matrix, PossibleDay, DisabledDays, DateRange } from "../types";

interface DayProps {
  isToday: boolean;
  isSelected: boolean;
  isRangeSelected?: boolean;
  isRangeBetween?: boolean;
  isDisabled?: boolean;
  day: PossibleDay;
  onClick: () => void;
}

function Day({
  isToday,
  isSelected,
  isRangeSelected,
  isRangeBetween,
  isDisabled,
  day,
  onClick,
}: DayProps) {
  const className = classnames([
    "rc-calendar__day",
    isToday && "rc-calendar__day--today",
    isSelected && "rc-calendar__day--selected",
    isRangeBetween && "rc-calendar__day--range-between",
    isRangeSelected && "rc-calendar__day--range-selected",
    isDisabled && "rc-calendar__day--disabled",
  ]);
  return (
    <td className={className} onClick={onClick} role="presentation">
      {day}
    </td>
  );
}

function EmptyDay() {
  return <td className="rc-calendar__day rc-calendar__day--empty" />;
}

interface DaysProps {
  matrix: Matrix;
  today: Date;
  year: number;
  month: Month;
  selectedDay?: Date;
  selectedRange: DateRange;
  disabledDays?: DisabledDays;
  onDayClick: (day: Date) => void;
}
export default function Days({
  matrix,
  year,
  month,
  today,
  selectedDay,
  selectedRange,
  disabledDays,
  onDayClick,
}: DaysProps) {
  const [from, to] = selectedRange;
  return (
    <>
      {matrix.map((week) => (
        <tr key={week.toString()}>
          {week.map((day, index) => {
            if (!day) {
              return <EmptyDay key={index.toString()} />;
            }
            const dayDate = new Date(year, month, parseInt(day, 10));

            const isDisabled = disabledDays?.(dayDate);
            const isToday = isSameDay(today, dayDate);
            const isSelected = isSameDay(dayDate, selectedDay);
            const isRangeSelected =
              isSameDay(dayDate, from) || isSameDay(dayDate, to);
            const isRangeBetween =
              from && to && isAfter(dayDate, from) && isBefore(dayDate, to);

            return (
              <Day
                day={day}
                key={(day || index).toString()}
                isToday={isToday}
                isSelected={isSelected}
                isRangeSelected={isRangeSelected}
                isRangeBetween={isRangeBetween}
                isDisabled={isDisabled}
                onClick={() => onDayClick(dayDate)}
              />
            );
          })}
        </tr>
      ))}
    </>
  );
}
