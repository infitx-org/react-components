import classnames from "classnames";
import Icon from "components/Icon";
import { Size } from "types";
import Arrow from "../../../assets/icons/arrow.svg";
import "./Indicator.scss";

const indicatorSizes = {
  [Size.XSmall]: 8,
  [Size.Small]: 9,
  [Size.Medium]: 10,
  [Size.Large]: 11,
};
interface IndicatorProps {
  open: boolean;
  size: `${Size}`;
  className?: string;
}

function Indicator({ open, size, className }: IndicatorProps) {
  const indicatorClassName = classnames([
    "rc-indicator",
    open && "rc-indicator--open",
    className,
  ]);
  return (
    <Icon
      className={indicatorClassName}
      icon={<Arrow />}
      size={indicatorSizes[size]}
    />
  );
}

export default Indicator;
