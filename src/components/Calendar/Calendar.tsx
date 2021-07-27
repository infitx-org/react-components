import { PureComponent } from "react";
import isSameDay from "date-fns/isSameDay";
import Matrix from "./components/Matrix";
import { DisabledDays, Month } from "./types";
import "./Calendar.scss";

/* eslint-disable react/no-access-state-in-setstate */

interface CalendarProps {
  initialMonth?: Month;
  initialYear?: number;
  selectedDate?: Date;
  disabledDays?: DisabledDays;
  onDayClick?: (day: Date | undefined) => void;
}

interface CalendarState {
  currentYear: number;
  currentMonth: Month;
  today: Date;
  selectedDay: Date | undefined;
}

export default class Calendar extends PureComponent<
  CalendarProps,
  CalendarState
> {
  constructor(props: CalendarProps) {
    super(props);

    const today = new Date();

    this.state = {
      today,
      currentYear: this.props.initialYear || today.getFullYear(),
      currentMonth: this.props.initialMonth || (today.getMonth() as Month),
      selectedDay: this.props.selectedDate || undefined,
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
    const { selectedDay } = this.state;
    this.setState(
      {
        selectedDay:
          selectedDay && isSameDay(day, selectedDay) ? undefined : day,
      },
      () => this.props.onDayClick?.(this.state.selectedDay)
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
