import React, { MouseEvent, KeyboardEvent } from "react";
import classnames from "classnames";
import "./Button.scss";

// import Icon, { iconSizes } from '../Icon';
// import Spinner from '../Spinner';
// import Tooltotip from '../Tooltip';

type Kind =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "danger"
  | "warning"
  | "dark"
  | "light";
type Size = "xs" | "s" | "m" | "l";

type ButtonProps = {
  children?: React.ReactNode;
  label?: string;
  className?: string;
  id?: string;
  kind?: Kind;
  size?: Size;
  icon?: string;
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
  kind = "primary",
  size = "l",
  // icon,
  // iconPosition = 'left',
  // tooltip,
  onClick,
  onKeyDown,
}: ButtonProps): JSX.Element {
  const isDisabledOrPending = disabled === true || pending === true;
  // const iconSize = iconSizes[size];
  const classNames = classnames([
    className,
    "mb-input",
    "input-button",
    size === "xs" && "input-button--extra-small",
    size === "s" && "input-button--small",
    size === "m" && "input-button--medium",
    size === "l" && "input-button--large",
    kind === "primary" && "input-button--primary",
    kind === "secondary" && "input-button--secondary",
    kind === "tertiary" && "input-button--tertiary",
    kind === "success" && "input-button--success",
    kind === "danger" && "input-button--danger",
    kind === "warning" && "input-button--warning",
    kind === "dark" && "input-button--dark",
    kind === "light" && "input-button--light",
    isDisabledOrPending && "mb-input--disabled input-button--disabled",
    pending && "mb-input--pending input-button--pending",
    noFill && "input-button--noFill",
  ]);

  // let iconComponent = null;
  // if (pending || icon) {
  //   iconComponent = (
  //     <div
  //       className={`input-button__icon input-button__icon${
  //         iconPosition === 'left' ? '--left' : '--right'
  //       }`}
  //     >
  //       {pending ? (
  //         <Spinner color="inherit" size={iconSize} />
  //       ) : (
  //         <Icon name={icon} stroke="none" size={iconSize} />
  //       )}
  //     </div>
  //   );
  // }

  // const leftIcon = iconPosition === 'left' ? iconComponent : null;
  // const rightIcon = iconPosition === 'right' ? iconComponent : null;

  const button = (
    <button
      type="button"
      id={id}
      style={style}
      className={classNames}
      onKeyDown={onKeyDown}
      onClick={onClick}
      disabled={isDisabledOrPending}
    >
      {/* {leftIcon} */}
      {label || children}
      {/* rightIcon */}
    </button>
  );

  // if (tooltip) {
  //   return (
  //     <Tooltip label={tooltip} position="top">
  //       {button}
  //     </Tooltip>
  //   );
  // }
  return button;
}

export default Button;
