import React from "react";
import classnames from "classnames";
import isSameDay from "date-fns/isSameDay";
import parseISO from "date-fns/parseISO";
import { Month, Matrix, PossibleDay } from "../types";

interface DayProps {
  isToday: boolean;
  isSelected: boolean;
  day: PossibleDay;
  onClick: () => void;
}

function Day({ isToday, isSelected, day, onClick }: DayProps) {
  const className = classnames([
    "rc-calendar__day",
    isToday && "rc-calendar__day--today",
    isSelected && "rc-calendar__day--selected",
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
  onDayClick: (day: Date) => void;
}
export default function Days({
  matrix,
  year,
  month,
  today,
  selectedDay,
  onDayClick,
}: DaysProps) {
  return (
    <>
      {matrix.map((week) => (
        <tr key={week.toString()}>
          {week.map((day, index) => {
            if (!day) {
              return <EmptyDay key={index.toString()} />;
            }
            const dayDate = new Date(year, month, parseInt(day, 10));

            const isToday = isSameDay(today, dayDate);
            const isSelected = !!selectedDay && isSameDay(dayDate, selectedDay);

            return (
              <Day
                day={day}
                key={(day || index).toString()}
                isToday={isToday}
                isSelected={isSelected}
                onClick={() => onDayClick(dayDate)}
              />
            );
          })}
        </tr>
      ))}
    </>
  );
}
