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
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
  forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
  const buttonClassName = classnames([
    "rc-icon-button",
    kind && `rc-icon-button--${kind}`,
    disabled && "rc-icon-button--disabled",
    className,
  ]);

  return (
    <button
      type="button"
      ref={forwardedRef}
      className={buttonClassName}
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
    </button>
  );
});

export default withTooltip(IconButton);
