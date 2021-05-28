import React from "react";
import classnames from "classnames";
import "./Label.scss";

export default function Label({
  size = "medium",
  style = {},
  variable,
  children,
}) {
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
