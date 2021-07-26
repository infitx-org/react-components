import { PureComponent } from "react";

import Matrix from "./components/Matrix";
import "./Calendar.scss";

/* eslint-disable react/no-access-state-in-setstate */

type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

interface CalendarProps {}

interface CalendarState {
  currentYear: number;
  currentMonth: number;
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
      currentYear: today.getFullYear(),
      currentMonth: today.getMonth(),
      selectedDay: undefined,
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
      currentMonth: prevYear.getMonth(),
    });
  }

  onNextYearClick() {
    const nextMonth = new Date(this.state.currentYear, this.state.currentMonth);
    nextMonth.setFullYear(nextMonth.getFullYear() + 1);

    this.setState({
      currentYear: nextMonth.getFullYear(),
      currentMonth: nextMonth.getMonth(),
    });
  }

  onPrevMonthClick() {
    const prevMonth = new Date(this.state.currentYear, this.state.currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);

    this.setState({
      currentYear: prevMonth.getFullYear(),
      currentMonth: prevMonth.getMonth(),
    });
  }

  onNextMonthClick() {
    const nextMonth = new Date(this.state.currentYear, this.state.currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    this.setState({
      currentYear: nextMonth.getFullYear(),
      currentMonth: nextMonth.getMonth(),
    });
  }

  onDayClick(day: Date) {
    this.setState({
      selectedDay: day,
    });
  }

  render() {
    return (
      <Matrix
        today={this.state.today}
        month={this.state.currentMonth as Month}
        year={this.state.currentYear}
        selectedDay={this.state.selectedDay}
        onPrevYearClick={this.onPrevYearClick}
        onNextYearClick={this.onNextYearClick}
        onPrevMonthClick={this.onPrevMonthClick}
        onNextMonthClick={this.onNextMonthClick}
        onDayClick={this.onDayClick}
      />
    );
  }
}
