import { PureComponent } from "react";
import isSameDay from "date-fns/isSameDay";
import Matrix from "./components/Matrix";
import { DateRange, DisabledDays, Month, PossibleDate } from "./types";
import "./Calendar.scss";

/* eslint-disable react/no-access-state-in-setstate */

interface CalendarProps {
  initialMonth?: Month;
  initialYear?: number;
  selectedDate?: Date;
  selectedRange?: DateRange;
  disabledDays?: DisabledDays;
  onDayClick?: (day: PossibleDate) => void;
  onDateRangeClick?: (range: DateRange) => void;
}

interface CalendarState {
  currentYear: number;
  currentMonth: Month;
  today: Date;
  selectedDay: PossibleDate;
  selectedRange: DateRange;
}

export default class Calendar extends PureComponent<
  CalendarProps,
  CalendarState
> {
  static getSelectedRange(range: DateRange, day: PossibleDate): DateRange {
    const [from, to] = range;
    if (from && !to) {
      return [from, day];
    }
    return [day, undefined];
  }

  constructor(props: CalendarProps) {
    super(props);

    const today = new Date();

    this.state = {
      today,
      currentYear: this.props.initialYear || today.getFullYear(),
      currentMonth: this.props.initialMonth || (today.getMonth() as Month),
      selectedDay: this.props.selectedDate || undefined,
      selectedRange: this.props.selectedRange || [undefined, undefined],
    };

    this.onPrevYearClick = this.onPrevYearClick.bind(this);
    this.onNextYearClick = this.onNextYearClick.bind(this);
    this.onPrevMonthClick = this.onPrevMonthClick.bind(this);
    this.onNextMonthClick = this.onNextMonthClick.bind(this);
    this.onDayClick = this.onDayClick.bind(this);
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
    const wasSelected = selectedDay && isSameDay(day, selectedDay);
    const newSelectedDay = wasSelected ? undefined : day;

    this.setState(
      {
        selectedDay: newSelectedDay,
        selectedRange: Calendar.getSelectedRange(selectedRange, day),
      },
      () => {
        // call the single day selected function
        this.props.onDayClick?.(this.state.selectedDay);
        // call also the range selection function if set
        this.props.onDateRangeClick?.(this.state.selectedRange);
      }
    );
  }

  render() {
    return (
      <div className="rc-calendar">
        <Matrix
          today={this.state.today}
          month={this.state.currentMonth}
          year={this.state.currentYear}
          disabledDays={this.props.disabledDays}
          selectedDay={this.state.selectedDay}
          selectedRange={this.state.selectedRange}
          onPrevYearClick={this.onPrevYearClick}
          onNextYearClick={this.onNextYearClick}
          onPrevMonthClick={this.onPrevMonthClick}
          onNextMonthClick={this.onNextMonthClick}
          onDayClick={this.onDayClick}
        />
      </div>
    );
  }
}
