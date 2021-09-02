import classnames from "classnames";
import React, { forwardRef, ForwardedRef } from "react";
import Icon from "components/Icon";
import withTooltip from "hocs/withTooltip";
import { Kind } from "../../types";
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

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      kind,
      size = 20,
      icon,
      fill,
      className,
      onClick,
      disabled,
    }: IconButtonProps,
    forwardedRef: ForwardedRef<HTMLButtonElement>
  ) {
    const buttonClassName = classnames([
      "rc-icon-button",
      kind && `rc-icon-button--${kind}`,
      !kind && `rc-icon-button--default`,
      disabled && "rc-icon-button--disabled",
      className,
    ]);

    return (
      <button
        type="button"
        ref={forwardedRef}
        className={buttonClassName}
        disabled={disabled}
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
  }
);

export default withTooltip<IconButtonProps>(IconButton);
