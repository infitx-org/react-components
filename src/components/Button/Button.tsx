import React, { MouseEvent, KeyboardEvent } from "react";
import classnames from "classnames";
import "./Button.scss";

import { Size, Kind } from "../types";
import Spinner from "../Spinner";
import Icon from "../Icon";
import { getIconSizeByComponentSize } from "../shared";

export type ButtonProps = {
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
  tooltip?: string;
  style?: React.CSSProperties;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLButtonElement>) => void;
};

function Button({
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
}: ButtonProps): JSX.Element {
  const classNames = classnames([
    className,
    "mb-input",
    "input-button",
    `input-button--${kind}`,
    `input-button--${size}`,
    disabled && "mb-input--disabled input-button--disabled",
    pending && "mb-input--pending input-button--pending",
    noFill && "input-button--noFill",
  ]);

  let iconContent = null;
  if (icon || pending) {
    const numericSize = getIconSizeByComponentSize(size);
    let display;
    if (pending) {
      display = <Spinner color="inherit" size={numericSize} />;
    } else if (icon) {
      display = <Icon icon={icon} size={size} inheritFill />;
    }
    iconContent = (
      <div className={`input-button__icon input-button__icon--${iconPosition}`}>
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
      onKeyDown={onKeyDown}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="input-button__content">
        {iconPosition === "left" && iconContent}
        {label || children}
        {iconPosition === "right" && iconContent}
      </div>
    </button>
  );

  return button;
}

export default React.memo(Button);
