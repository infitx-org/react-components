import { PureComponent } from "react";
import Matrix from "./components/Matrix";
import { Month } from "./types";
import "./Calendar.scss";

/* eslint-disable react/no-access-state-in-setstate */

interface CalendarProps {
  initialMonth?: Month;
  initialYear?: number;
  selectedDate?: Date;
  onDayClick?: (day: Date) => void;
}

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
      currentYear: this.props.initialYear || today.getFullYear(),
      currentMonth: this.props.initialMonth || today.getMonth(),
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
      <div className="rc-calendar">
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
      </div>
    );
  }
}
