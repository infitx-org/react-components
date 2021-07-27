import eachDayOfInterval from "date-fns/eachDayOfInterval";
import endOfWeek from "date-fns/endOfWeek";
import endOfMonth from "date-fns/endOfMonth";
import isSameMonth from "date-fns/isSameMonth";
import enUSLocale from "date-fns/locale/en-US";
import isSameDayDateFns from "date-fns/isSameDay";
import startOfWeek from "date-fns/startOfWeek";
import startOfMonth from "date-fns/startOfMonth";
import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import { Month, PossibleDay, Matrix } from "./types";

type Options = {
  year: number;
  month: Month;
};

export function sortDates(dateLeft: Date, dateRight: Date): [Date, Date] {
  if (dateLeft.getTime() < dateRight.getTime()) {
    return [dateLeft, dateRight];
  }
  return [dateRight, dateLeft];
}
function getWeekStartsOnSunday(): boolean {
  return navigator.language === "en-US";
}

// Month days matrix generator, creates week arrays with ordered days for the given year, month
export const getMountMatrix = (
  { year, month }: Options,
  convertDate: (d: Date, { sameMonth }: { sameMonth: boolean }) => PossibleDay
): Matrix => {
  // Detect if we are in a locale where Sunday is the first day and Shift accordingly
  const weekStartsOn = getWeekStartsOnSunday() ? 0 : 1;
  const date = new Date(year, month);

  const matrix = eachWeekOfInterval(
    {
      start: startOfMonth(date),
      end: endOfMonth(date),
    },
    { locale: enUSLocale, weekStartsOn }
  );

  return matrix.map((weekDay) =>
    eachDayOfInterval({
      start: startOfWeek(weekDay, { weekStartsOn }),
      end: endOfWeek(weekDay, { weekStartsOn }),
    }).map((day) =>
      convertDate(day, {
        sameMonth: isSameMonth(date, day),
      })
    )
  );
};

// wrapper on isSameDay to handle undefined dates more easily
export function isSameDaySafe(
  dateLeft: Date | undefined,
  dateRight: Date | undefined
): boolean {
  if (!dateLeft || !dateRight) {
    return false;
  }

  return isSameDayDateFns(dateLeft, dateRight);
}

// get days names in english, ordered based on the locale
export function getDayNames() {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  if (getWeekStartsOnSunday()) {
    return dayNames;
  }
  return [...dayNames.slice(1), dayNames[0]];
}
