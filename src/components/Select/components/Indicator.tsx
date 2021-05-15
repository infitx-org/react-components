import classnames from "classnames";
import Icon from "components/Icon";
import { InputSize } from "types";
import Arrow from "../../../assets/icons/arrow.svg";
import "./Indicator.scss";

const indicatorSizes = {
  [InputSize.Small]: 9,
  [InputSize.Medium]: 10,
  [InputSize.Large]: 11,
};
interface IndicatorProps {
  open: boolean;
  size: `${InputSize}`;
}

function Indicator({ open, size }: IndicatorProps) {
  const className = classnames([
    "rc-select__indicator",
    open && "rc-select__indicator--open",
  ]);
  return (
    <Icon
      className={className}
      icon={<Arrow />}
      size={indicatorSizes[size]}
      fill="rgba(0,0,0,0.4)"
    />
  );
}

export default Indicator;
