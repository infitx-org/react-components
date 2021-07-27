import classnames from "classnames";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import { isSameDaySafe } from "../helpers";
import { Month, Matrix, PossibleDay, DisabledDays, DateRange } from "../types";

interface DayProps {
  isToday: boolean;
  isSelected: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  isRangePartial?: boolean;
  isRangeBetween?: boolean;
  isDisabled?: boolean;
  day: PossibleDay;
  onClick: () => void;
}

function Day({
  isToday,
  isSelected,
  isRangeStart,
  isRangeEnd,
  isRangePartial,
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
    isRangeStart && "rc-calendar__day--range-start",
    isRangeEnd && "rc-calendar__day--range-end",
    (isRangeStart || isRangeEnd) &&
      isRangePartial &&
      "rc-calendar__day--range-partial",
    isDisabled && "rc-calendar__day--disabled",
  ]);

  const cellClassName = classnames([
    "rc-calendar__day__cell",
    isToday && "rc-calendar__day__cell--today",
  ]);
  return (
    <td className={cellClassName} onClick={onClick} role="presentation">
      <div className={className}>{day}</div>
    </td>
  );
}

function EmptyDay() {
  return (
    <td className="rc-calendar__day__cell rc-calendar__day__cell--empty" />
  );
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
            const isToday = isSameDaySafe(today, dayDate);
            const isSelected = isSameDaySafe(dayDate, selectedDay);
            const isRangeStart = isSameDaySafe(dayDate, from);
            const isRangeEnd = isSameDaySafe(dayDate, to);
            const isRangeBetween =
              from && to && isAfter(dayDate, from) && isBefore(dayDate, to);

            return (
              <Day
                day={day}
                key={(day || index).toString()}
                isToday={isToday}
                isSelected={isSelected}
                isRangeStart={isRangeStart}
                isRangeEnd={isRangeEnd}
                isRangePartial={(from && !to) || (to && !from)}
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
