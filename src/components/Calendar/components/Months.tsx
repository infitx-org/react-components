import classnames from "classnames";

function ArrayChunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}

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

function EmptyMonthCell() {
  return <td className="rc-calendar__month__cell--empty" colSpan={2} />;
}

interface MonthProps {
  month: string;
  isCurrent?: boolean;
  isToday?: boolean;
  onClick: () => void;
}

function Month({ month, isCurrent, isToday, onClick }: MonthProps) {
  const className = classnames([
    "rc-calendar__month",
    isCurrent && "rc-calendar__month--current",
  ]);

  const cellClassName = classnames([
    "rc-calendar__month__cell",
    isToday && "rc-calendar__month__cell--today",
  ]);
  return (
    <td className={cellClassName} onClick={onClick} role="presentation">
      <div className={className}>{month.substr(0, 3)}</div>
    </td>
  );
}

interface MonthsProps {
  todayMonth: number;
  currentMonth: number;
  onMonthClick: (month: number) => void;
}

export default function Months({
  currentMonth,
  todayMonth,
  onMonthClick,
}: MonthsProps) {
  const matrix = ArrayChunk(monthNames, 3);

  return (
    <>
      {matrix.map((monthsChunk, index) => (
        <tr key={index.toString()}>
          <EmptyMonthCell />
          {monthsChunk.map((monthName) => {
            const monthIndex = monthNames.indexOf(monthName);
            return (
              <Month
                month={monthName}
                isCurrent={currentMonth === monthIndex}
                isToday={todayMonth === monthIndex}
                key={monthName}
                onClick={() => onMonthClick(monthIndex)}
              />
            );
          })}
          <EmptyMonthCell />
        </tr>
      ))}
    </>
  );
}
