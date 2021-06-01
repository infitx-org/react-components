import React from "react";
import DayPicker from "react-day-picker";
import classnames from "classnames";
import useOverlayPosition from "hooks/useOverlayPosition";
import "./DayPicker-default.scss";
import "./DayPicker.scss";
import "./Calendar.scss";

interface CalendarProps {
  selectedDate: Date | undefined;
  onDayClick: (day: Date, selected: boolean | undefined) => void;
}

export default function Calendar({ selectedDate, onDayClick }: CalendarProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { top, bottom, height, reverse } = useOverlayPosition<HTMLDivElement>(
    ref.current
  );
  const className = classnames([
    "rc-datepicker__calendar",
    reverse && "rc-datepicker__calendar--reverse",
  ]);
  return (
    <div
      ref={ref}
      onClick={(e) => e.stopPropagation()}
      className={className}
      role="presentation"
      style={{ top, bottom, maxHeight: height }}
    >
      <div className="rc-datepicker__calendar__container">
        <DayPicker
          month={selectedDate}
          selectedDays={selectedDate}
          onDayClick={(day: Date, { selected }) => onDayClick(day, selected)}
        />
      </div>
    </div>
  );
}
