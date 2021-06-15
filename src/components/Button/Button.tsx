import React, { MouseEvent, KeyboardEvent, forwardRef } from "react";
import classnames from "classnames";
import Spinner from "components/Spinner";
import Icon from "components/Icon";
import { getIconSizeByComponentSize } from "utils/size";
import withTooltip from "hocs/withTooltip";
import { WithTooltipProps } from "../../hocs/withTooltip";
import { Size, Kind } from "../../types";
import { BaseButtonAttributes } from "../shared/types";
import "./Button.scss";

export interface BaseButtonProps extends BaseButtonAttributes {
  children?: React.ReactNode;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  label?: string;
  className?: string;
  id?: string;
  kind?: `${Kind}`;
  size?: `${Size}`;
  iconPosition?: "left" | "right";
  noFill?: boolean;
  disabled?: boolean;
  pending?: boolean;
  style?: React.CSSProperties;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLButtonElement>) => void;
}

export type ButtonProps = BaseButtonProps & WithTooltipProps;

export const BaseButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      id,
      className,
      style,
      label,
      noFill,
      disabled,
      pending,
      kind = Kind.Primary,
      size = Size.Large,
      icon,
      iconPosition = "left",
      onClick,
      onKeyDown,
      ...props
    }: ButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>
  ): JSX.Element {
    const classNames = classnames([
      "rc-button",
      `rc-button--${kind}`,
      `rc-button--${size}`,
      disabled && "rc-button--disabled",
      noFill && "rc-button--noFill",
      className,
    ]);

    let iconContent = null;
    if (icon || pending) {
      const numericSize = getIconSizeByComponentSize(size);
      let display;
      if (pending) {
        display = <Spinner color="inherit" size={numericSize} />;
      } else if (icon) {
        display = <Icon icon={icon} size={size} fill="inherit" />;
      }
      iconContent = (
        <div className={`rc-button__icon rc-button__icon--${iconPosition}`}>
          {display}
        </div>
      );
    }

    const button = (
      <button
        type="button"
        id={id}
        style={style}
        className={classNames}
        onClick={onClick}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        <div className="rc-button__content">
          {iconPosition === "left" && iconContent}
          {label || children}
          {iconPosition === "right" && iconContent}
        </div>
      </button>
    );

    return button;
  }
);

export default withTooltip<ButtonProps>(BaseButton);
