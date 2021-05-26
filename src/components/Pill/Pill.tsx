import classnames from "classnames";
import { Kind } from "types";
import Icon from "components/Icon";
import "./Pill.scss";

interface PillProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  kind?: `${Kind}` | "default";
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  fill?: string;
  label?: string;
  active?: boolean;
  inverted?: boolean;
}

function Pill({
  id,
  className,
  style,
  kind = "default",
  icon,
  fill = "inherit",
  label,
  active,
  inverted,
}: PillProps) {
  const pillClassName = classnames([
    "rc-pill",
    `rc-pill--${kind}`,
    active && `rc-pill--active`,
    inverted && `rc-pill--inverted`,
    className,
  ]);

  return (
    <div className={pillClassName} id={id} style={style}>
      {icon && (
        <div className="rc-pill__icon-box">
          <Icon icon={icon} size={16} className="rc-pill__icon" fill={fill} />
        </div>
      )}
      {label && <span className="rc-pill__label">{label}</span>}
    </div>
  );
}

export default Pill;
