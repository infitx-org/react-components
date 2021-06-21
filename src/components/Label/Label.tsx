import classnames from "classnames";
import Icon from "components/Icon";
import { getSmallerIconSizeByComponentSize } from "utils/size";
import InfoSmall from "../../resources/icons/info-small.svg";
import { Size } from "../../types";
import "./Label.scss";

export interface LabelProps {
  size?: `${Size}`;
  label?: string;
  required?: boolean;
  showRequired?: boolean;
}

export default function Label({
  size = "large",
  label,
  required,
  showRequired,
}: LabelProps) {
  if (!label) {
    return null;
  }

  const className = classnames(["rc-label", `rc-label--${size}`]);
  return (
    <label className={className}>
      {required && (
        <Icon
          className="rc-label__icon"
          size={getSmallerIconSizeByComponentSize(size)}
          icon={<InfoSmall />}
          fill={showRequired ? "#f93" : "#39f"}
        />
      )}
      <span className={`rc-label__text--${size}`}>{label}</span>
    </label>
  );
}
