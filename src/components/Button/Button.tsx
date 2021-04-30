import React, { MouseEvent, KeyboardEvent } from "react";
import classnames from "classnames";
import "./Button.scss";

import { Size, Kind } from "../types";
import Spinner from "../Spinner";
import { getIconSizeByComponentSize } from "../shared";

export type ButtonProps = {
  children?: React.ReactNode;
  icon?: JSX.Element;
  label?: string;
  className?: string;
  id?: string;
  kind?: Kind;
  size?: Size;
  iconPosition?: "left" | "right";
  noFill?: boolean;
  disabled?: boolean;
  pending?: boolean;
  tooltip?: string;
  style?: React.CSSProperties;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLButtonElement>) => void;
};

export default function Button({
  children,
  id,
  className,
  style,
  label,
  noFill,
  disabled,
  pending,
  kind = "primary",
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
    size === "xs" && "input-button--extra-small",
    size === "s" && "input-button--small",
    size === "m" && "input-button--medium",
    size === "l" && "input-button--large",
    disabled && "mb-input--disabled input-button--disabled",
    pending && "mb-input--pending input-button--pending",
    noFill && "input-button--noFill",
  ]);

  const content = [label || children];
  if (icon || pending) {
    const numericSize = getIconSizeByComponentSize(size);
    let display;
    if (pending) {
      display = <Spinner color="inherit" size={numericSize} />;
    } else if (icon) {
      display = React.cloneElement(icon, {
        fill: "inherit",
        ...icon.props,
        height: numericSize,
        width: numericSize,
      });
    }
    const iconContent = (
      <div className={`input-button__icon input-button__icon--${iconPosition}`}>
        {display}
      </div>
    );
    if (iconPosition === "left") {
      content.unshift(iconContent);
    } else {
      content.push(iconContent);
    }
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
      <div className="input-button__content">{content}</div>
    </button>
  );

  return button;
}
