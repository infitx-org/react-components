import classnames from "classnames";
import React from "react";
import { Kind } from "types";
import Icon from "components/Icon";
import { withTooltip } from "components/Tooltip";
import "./IconButton.scss";

export interface IconButtonProps {
  className?: string;
  kind?: `${Kind}`;
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  size?: number;
  fill?: string;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const IconButton = React.forwardRef(function IconButton(
  {
    kind,
    size = 20,
    icon,
    fill,
    className,
    onClick,
    disabled,
  }: IconButtonProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  const iconClassName = classnames([
    "rc-icon-button",
    kind && `rc-icon-button--${kind}`,
    disabled && "rc-icon-button--disabled",
    className,
  ]);

  return (
    <div
      ref={forwardedRef}
      className={iconClassName}
      role="presentation"
      onClick={disabled ? undefined : onClick}
      style={{ height: size, width: size }}
    >
      <Icon
        size={size}
        icon={icon}
        fill={fill}
        style={{ fill: fill || "inherit" }}
        className="rc-icon-button__icon"
      />
    </div>
  );
});

export default withTooltip(IconButton);
