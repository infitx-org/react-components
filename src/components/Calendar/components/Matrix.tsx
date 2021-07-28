// import classnames from "classnames";
import { format } from "date-fns";
import Days from "./Days";
import Months from "./Months";
import Control from "./Control";
import { DateRange, DisabledDays } from "../types";
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

interface MatrixProps {
  today: Date;
  year: number;
  month: number;
  selectedDay?: Date;
  selectedRange: DateRange;
  tempRangeEnd: Date | undefined;
  disabledDays?: DisabledDays;
  showMonthMatrix: boolean;
  onPrevYearClick: () => void;
  onNextYearClick: () => void;
  onMonthClick: (month: number) => void;
  onPrevMonthClick: () => void;
  onNextMonthClick: () => void;
  onDayClick: (day: Date) => void;
  onDayHover: (day: Date) => void;
  onCurrentMonthClick: () => void;
  onGoToTodayClick: () => void;
}

export default function Matrix({
  today,
  year,
  month,
  selectedDay,
  selectedRange,
  tempRangeEnd,
  disabledDays,
  showMonthMatrix,
  onPrevYearClick,
  onNextYearClick,
  onMonthClick,
  onPrevMonthClick,
  onNextMonthClick,
  onDayClick,
  onDayHover,
  onCurrentMonthClick,
  onGoToTodayClick,
}: MatrixProps) {
  const matrix = getMountMatrix({ year, month }, (day, { sameMonth }) => {
    return sameMonth ? format(day, "dd") : undefined;
  });

  return (
    <table className="rc-calendar__table">
      <thead>
        <tr className="rc-calendar__year-row">
          <Control type="year" direction="prev" onClick={onPrevYearClick} />
          <th colSpan={5} className="rc-calendar__current-year">
            {year}
          </th>
          <Control type="year" direction="next" onClick={onNextYearClick} />
        </tr>
      </thead>
      <tbody>
        <tr>
          <Control type="month" direction="prev" onClick={onPrevMonthClick} />
          <th
            colSpan={5}
            className="rc-calendar__current-month"
            onClick={onCurrentMonthClick}
          >
            {monthNames[month]}
          </th>
          <Control type="month" direction="next" onClick={onNextMonthClick} />
        </tr>
        {showMonthMatrix ? (
          <Months
            onMonthClick={onMonthClick}
            todayMonth={today.getMonth()}
            currentMonth={month}
          />
        ) : (
          <Days
            matrix={matrix}
            today={today}
            year={year}
            month={month}
            selectedDay={selectedDay}
            selectedRange={selectedRange}
            tempRangeEnd={tempRangeEnd}
            disabledDays={disabledDays}
            onDayClick={onDayClick}
            onDayHover={onDayHover}
            onGoToTodayClick={onGoToTodayClick}
          />
        )}
      </tbody>
    </table>
  );
}
