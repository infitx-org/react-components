import Icon from "components/Icon";
import { InputSize } from "types";
import { getIconSizeByComponentSize } from "utils/size";
import Calendar from "../../../resources/icons/calendar-small.svg";
import "./CalendarIcon.scss";

interface CalendarIconProps {
  size: `${InputSize}`;
}

function CalendarIcon({ size }: CalendarIconProps) {
  return (
    <Icon
      size={getIconSizeByComponentSize(size)}
      icon={<Calendar />}
      className="rc-datepicker__calendar-icon"
    />
  );
}

export default CalendarIcon;
