import Overlay from "components/Overlay";
import CalendarComponent from "components/Calendar";
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
        <CalendarComponent
          initialMonth={selectedDate ? selectedDate.getMonth() : undefined}
          selectedDate={selectedDate}
          onDayClick={(day: Date, { selected }) => onDayClick(day, selected)}
        />
      </div>
    </Overlay>
  );
}
