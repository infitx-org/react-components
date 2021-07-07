import DayPicker from "react-day-picker";
import Overlay from "components/Overlay";
import "./DayPicker-default.scss";
import "./DayPicker.scss";
import "./Calendar.scss";

interface CalendarProps {
  selectedDate: Date | undefined;
  onDayClick: (day: Date, selected: boolean | undefined) => void;
}

export default function Calendar({ selectedDate, onDayClick }: CalendarProps) {
  return (
    <Overlay
      className="rc-datepicker__calendar"
      reverseClassName="rc-datepicker__calendar--reverse"
      applyLeft={false}
      applyRight={false}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="rc-datepicker__calendar__container">
        <DayPicker
          month={selectedDate}
          selectedDays={selectedDate}
          onDayClick={(day: Date, { selected }) => onDayClick(day, selected)}
        />
      </div>
    </Overlay>
  );
}
