import Overlay from "components/Overlay";
import CalendarComponent from "components/Calendar";
import Clock from "components/Clock";
import "./Calendar.scss";

interface CalendarProps {
  selectedDate: Date | undefined;
  withTime?: boolean;
  onDayClick: (day: Date, selected: boolean | undefined) => void;
  onTimeChange: (hour: number, second: number, minute: number) => void;
}

export default function Calendar({
  selectedDate,
  withTime,
  onDayClick,
  onTimeChange,
}: CalendarProps) {
  return (
    <Overlay
      className="rc-datepicker__calendar"
      reverseClassName="rc-datepicker__calendar--reverse"
      applyLeft={false}
      applyRight={false}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="rc-datepicker__calendar__container">
        {withTime && (
          <div className="rc-datepicker__calendar__container__time">
            <Clock
              hour={selectedDate?.getHours()}
              minute={selectedDate?.getMinutes()}
              second={selectedDate?.getSeconds()}
              onChange={onTimeChange}
            />
          </div>
        )}
        <CalendarComponent
          initialYear={selectedDate ? selectedDate.getFullYear() : undefined}
          initialMonth={selectedDate ? selectedDate.getMonth() : undefined}
          selectedDate={selectedDate}
          onDayClick={(day: Date, { selected }) => onDayClick(day, selected)}
        />
      </div>
    </Overlay>
  );
}
