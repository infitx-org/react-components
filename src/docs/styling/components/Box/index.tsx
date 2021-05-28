import React from "react";
import "./Box.scss";

export default function Box({
  style = {},
  size = "large",
  className = "",
  children,
}) {
  const [is, setIs] = React.useState(false);

  return (
    <div
      className={`box box--${
        is ? "overlay" : "normal"
      } box--${size} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
