import React from "react";
import classnames from "classnames";
import "./Label.scss";

interface LabelProps {
  size?: "small" | "medium" | "large";
  style?: React.CSSProperties;
  variable?: boolean;
  children: React.ReactNode;
}

export default function Label({
  size = "medium",
  style = {},
  variable,
  children,
}: LabelProps) {
  const className = classnames([
    "label",
    `label--${size}`,
    variable && "label--variable",
  ]);
  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
}
