// import classnames from "classnames";
import { format } from "date-fns";
import Arrow from "../../../resources/icons/arrow.svg";
import IconButton from "../../IconButton";
import Days from "./Days";
import Months from "./Months";
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
  onGoToTodayClick: () => void;
  onCurrentMonthClick: () => void;
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
          <th className="rc-calendar__year-control">
            <IconButton
              className="rc-calendar__year-prev"
              size={24}
              icon={<Arrow />}
              onClick={onPrevYearClick}
            />
          </th>
          <th colSpan={5} className="rc-calendar__current-year">
            {year}
          </th>
          <th className="rc-calendar__year-control">
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
          <th className="rc-calendar__month-control">
            <IconButton
              className="rc-calendar__month-prev"
              size={24}
              icon={<Arrow />}
              onClick={onPrevMonthClick}
            />
          </th>
          <th
            colSpan={5}
            className="rc-calendar__current-month"
            onClick={onCurrentMonthClick}
          >
            {monthNames[month]}
          </th>
          <th className="rc-calendar__month-control">
            <IconButton
              className="rc-calendar__month-next"
              size={24}
              icon={<Arrow />}
              onClick={onNextMonthClick}
            />
          </th>
        </tr>
        {showMonthMatrix ? (
          <Months onMonthClick={onMonthClick} selectedMonth={month} />
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
          />
        )}
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
      </tbody>
    </table>
  );
}
