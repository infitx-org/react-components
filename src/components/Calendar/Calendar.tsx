import { PureComponent } from "react";
import isSameDay from "date-fns/isSameDay";
import Matrix from "./components/Matrix";
import { DateRange, DisabledDays, Month, PossibleDate } from "./types";
import "./Calendar.scss";

/* eslint-disable react/no-access-state-in-setstate */

export interface CalendarProps {
  initialMonth?: Month;
  initialYear?: number;
  selectedDate?: Date;
  selectedRange?: DateRange;
  disabledDays?: DisabledDays;
  onDayClick?: (day: Date, { selected }: { selected: boolean }) => void;
  onDateRangeClick?: (range: DateRange) => void;
}

interface CalendarState {
  currentYear: number;
  currentMonth: Month;
  today: Date;
  selectedDay: PossibleDate;
  selectedRange: DateRange;
  tempRangeEnd: Date | undefined;
}

export default class Calendar extends PureComponent<
  CalendarProps,
  CalendarState
> {
  static getSelectedRange(range: DateRange, day: Date): DateRange {
    const [from, to] = range;
    if (from && !to) {
      return [from, day].sort((a, b) => a.getTime() - b.getTime()) as DateRange;
    }
    return [day, undefined];
  }

  constructor(props: CalendarProps) {
    super(props);

    const today = new Date();

    const {
      initialMonth,
      initialYear,
      selectedDate,
      selectedRange,
    } = this.props;

    this.state = {
      today,
      currentYear: initialYear || today.getFullYear(),
      currentMonth:
        initialMonth !== undefined ? initialMonth : (today.getMonth() as Month),
      selectedDay: selectedDate || undefined,
      selectedRange: selectedRange || [undefined, undefined],
      tempRangeEnd: undefined,
    };

    this.onPrevYearClick = this.onPrevYearClick.bind(this);
    this.onNextYearClick = this.onNextYearClick.bind(this);
    this.onPrevMonthClick = this.onPrevMonthClick.bind(this);
    this.onNextMonthClick = this.onNextMonthClick.bind(this);
    this.onDayClick = this.onDayClick.bind(this);
    this.onDayHover = this.onDayHover.bind(this);
    this.onCalendarMouseLeave = this.onCalendarMouseLeave.bind(this);
  }

  onPrevYearClick() {
    const prevYear = new Date(this.state.currentYear, this.state.currentMonth);
    prevYear.setFullYear(prevYear.getFullYear() - 1);

    this.setState({
      currentYear: prevYear.getFullYear(),
      currentMonth: prevYear.getMonth() as Month,
    });
  }

  onNextYearClick() {
    const nextMonth = new Date(this.state.currentYear, this.state.currentMonth);
    nextMonth.setFullYear(nextMonth.getFullYear() + 1);

    this.setState({
      currentYear: nextMonth.getFullYear(),
      currentMonth: nextMonth.getMonth() as Month,
    });
  }

  onPrevMonthClick() {
    const prevMonth = new Date(this.state.currentYear, this.state.currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);

    this.setState({
      currentYear: prevMonth.getFullYear(),
      currentMonth: prevMonth.getMonth() as Month,
    });
  }

  onNextMonthClick() {
    const nextMonth = new Date(this.state.currentYear, this.state.currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    this.setState({
      currentYear: nextMonth.getFullYear(),
      currentMonth: nextMonth.getMonth() as Month,
    });
  }

  onDayClick(day: Date) {
    const { selectedDay, selectedRange } = this.state;
    const isRange = this.props.onDateRangeClick !== undefined;
    const wasSelected = selectedDay && isSameDay(day, selectedDay);

    this.setState(
      {
        selectedDay: isRange || wasSelected ? undefined : day,
        selectedRange: isRange
          ? Calendar.getSelectedRange(selectedRange, day)
          : selectedRange,
        tempRangeEnd: undefined,
      },
      () => {
        // call the single day selected function
        this.props.onDayClick?.(day, { selected: !!wasSelected });
        // call also the range selection function if set
        this.props.onDateRangeClick?.(this.state.selectedRange);
      }
    );
  }

  onDayHover(day: Date) {
    const [from, to] = this.state.selectedRange;
    if (from && !to) {
      this.setState({
        tempRangeEnd: day,
      });
    }
  }

  onCalendarMouseLeave() {
    this.setState({
      tempRangeEnd: undefined,
    });
  }

  render() {
    return (
      <div className="rc-calendar" onMouseLeave={this.onCalendarMouseLeave}>
        <Matrix
          today={this.state.today}
          month={this.state.currentMonth}
          year={this.state.currentYear}
          disabledDays={this.props.disabledDays}
          selectedDay={this.state.selectedDay}
          selectedRange={this.state.selectedRange}
          tempRangeEnd={this.state.tempRangeEnd}
          onPrevYearClick={this.onPrevYearClick}
          onNextYearClick={this.onNextYearClick}
          onPrevMonthClick={this.onPrevMonthClick}
          onNextMonthClick={this.onNextMonthClick}
          onDayClick={this.onDayClick}
          onDayHover={this.onDayHover}
        />
      </div>
    );
  }
}
