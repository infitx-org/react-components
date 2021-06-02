import React from "react";
import classnames from "classnames";
import "./Text.scss";

export interface TextProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  className?: string;
  style?: React.CSSProperties;
  underline?: boolean;
  bold?: boolean;
  highlight?: boolean;
  light?: boolean;
  color?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Text({
  children,
  size = "medium",
  className,
  style = {},
  underline = false,
  bold = false,
  highlight = false,
  light = false,
  color = "default",
  disabled = false,
  onClick,
}: TextProps) {
  const textClassName = classnames([
    className,
    "rc-text",
    `rc-text--${size}`,
    highlight && "rc-text--highlight",
    bold && "rc-text--bold",
    light && "rc-text--light",
    underline && "rc-text--underline",
    disabled && "rc-text--disabled",
    !disabled && onClick && "rc-text--clickable",
  ]);
  return (
    <span
      className={textClassName}
      style={{ color, ...style }}
      onClick={!disabled ? onClick : undefined}
      role="presentation"
    >
      {children}
    </span>
  );
}
