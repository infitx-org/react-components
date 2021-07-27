import eachDayOfInterval from "date-fns/eachDayOfInterval";
import endOfISOWeek from "date-fns/endOfISOWeek";
import endOfMonth from "date-fns/endOfMonth";
import isSameMonth from "date-fns/isSameMonth";
import startOfISOWeek from "date-fns/startOfISOWeek";
import startOfMonth from "date-fns/startOfMonth";
import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import { Month, PossibleDay, Matrix } from "./types";

type Options = {
  year: number;
  month: Month;
};

export const getMountMatrix = (
  { year, month }: Options,
  convertDate: (d: Date, { sameMonth }: { sameMonth: boolean }) => PossibleDay
): Matrix => {
  const date = new Date(year, month);

  const matrix = eachWeekOfInterval(
    {
      start: startOfMonth(date),
      end: endOfMonth(date),
    },
    { weekStartsOn: 1 }
  );

  return matrix.map((weekDay) =>
    eachDayOfInterval({
      start: startOfISOWeek(weekDay),
      end: endOfISOWeek(weekDay),
    }).map((day) =>
      convertDate(day, {
        sameMonth: isSameMonth(date, day),
      })
    )
  );
};
