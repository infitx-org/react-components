import classnames from "classnames";
import React from "react";
import { Kind } from "types";
import Icon from "../Icon";
import "./IconButton.scss";

export interface IconButtonProps {
  className?: string;
  kind?: `${Kind}`;
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  size?: number;
  fill?: string;
  disabled?: boolean;
  onClick: () => void;
}

function IconButton({
  kind,
  size = 20,
  icon,
  fill,
  className,
  onClick,
  disabled,
}: IconButtonProps) {
  const iconClassName = classnames([
    "rc-icon-button",
    kind && `rc-icon-button--${kind}`,
    disabled && "rc-icon-button--disabled",
    className,
  ]);

  const iconComponent = (
    <div
      className={iconClassName}
      role="presentation"
      onClick={disabled ? undefined : onClick}
    >
      <Icon
        size={size}
        icon={icon}
        fill={fill}
        className="rc-icon-button__icon"
      />
    </div>
  );

  return <div style={{ height: size, width: size }}>{iconComponent}</div>;
}

export default IconButton;
