import classnames from "classnames";
import Arrow from "../../assets/icons/arrow.svg";
import Icon from "../Icon";
import { InputSize } from "../types";

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
    <div className="mb-input__inner-icon input-select__icon">
      <Icon
        className={className}
        icon={<Arrow />}
        size={indicatorSizes[size]}
        fill="rgba(0,0,0,0.4)"
      />
    </div>
  );
}

export default Indicator;
