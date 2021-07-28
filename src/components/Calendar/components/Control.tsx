import Arrow from "../../../resources/icons/arrow.svg";
import IconButton from "../../IconButton";
import Icon from "../../Icon";

const arrowIcon = <Icon size={12} icon={<Arrow />} fill="inherit" />;

interface ControlProps {
  type: "month" | "year";
  direction: "prev" | "next";
  onClick: () => void;
}
export default function Control({ type, direction, onClick }: ControlProps) {
  return (
    <th className={`rc-calendar__${type}-control`}>
      <IconButton
        className={`rc-calendar__${type}-${direction}`}
        size={24}
        icon={arrowIcon}
        onClick={onClick}
      />
    </th>
  );
}
