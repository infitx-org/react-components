import classnames from "classnames";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isWithinInterval from "date-fns/isWithinInterval";
import { isSameDaySafe, sortDates, getDayNames } from "../helpers";
import { Month, Matrix, PossibleDay, DisabledDays, DateRange } from "../types";

interface DayProps {
  isToday: boolean;
  isSelected: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  isRangePartial?: boolean;
  isRangeBetween?: boolean;
  isTempRangeBetween?: boolean;
  isDisabled?: boolean;
  day: PossibleDay;
  onClick: () => void;
  onMouseEnter: () => void;
}

function Day({
  isToday,
  isSelected,
  isRangeStart,
  isRangeEnd,
  isRangePartial,
  isRangeBetween,
  isTempRangeBetween,
  isDisabled,
  day,
  onClick,
  onMouseEnter,
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
    isTempRangeBetween && "rc-calendar__day--temp-range-between",
  ]);

  const cellClassName = classnames([
    "rc-calendar__day__cell",
    isToday && "rc-calendar__day__cell--today",
    isDisabled && "rc-calendar__day__cell--disabled",
  ]);
  return (
    <td
      className={cellClassName}
      onClick={onClick}
      role="presentation"
      onMouseEnter={onMouseEnter}
    >
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
  tempRangeEnd: Date | undefined;
  disabledDays?: DisabledDays;
  onDayClick: (day: Date) => void;
  onDayHover: (day: Date) => void;
  onGoToTodayClick: () => void;
}
export default function Days({
  matrix,
  year,
  month,
  today,
  selectedDay,
  selectedRange,
  tempRangeEnd,
  disabledDays,
  onDayClick,
  onDayHover,
  onGoToTodayClick,
}: DaysProps) {
  const [from, to] = selectedRange;
  return (
    <>
      <tr>
        {getDayNames().map((dayName) => (
          <td key={dayName} className="rc-calendar__dayname">
            {dayName}
          </td>
        ))}
      </tr>
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

            let isTempRangeBetween = false;
            if (!to && from && tempRangeEnd && !isRangeStart) {
              const [start, end] =
                from && tempRangeEnd && sortDates(from, tempRangeEnd);
              isTempRangeBetween = isWithinInterval(dayDate, { start, end });
            }

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
                isTempRangeBetween={isTempRangeBetween}
                isDisabled={isDisabled}
                onClick={() => onDayClick(dayDate)}
                onMouseEnter={() => onDayHover(dayDate)}
              />
            );
          })}
        </tr>
      ))}
      <tr>
        <td className="rc-calendar__go-to-today__cell" colSpan={7}>
          {(today.getMonth() !== month || today.getFullYear() !== year) && (
            <div
              role="presentation"
              className="rc-calendar__go-to-today"
              onClick={onGoToTodayClick}
            >
              Today
            </div>
          )}
        </td>
      </tr>
    </>
  );
}
