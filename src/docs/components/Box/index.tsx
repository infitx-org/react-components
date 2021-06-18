import React from "react";
import "./Box.scss";

interface BoxProps {
  style?: React.CSSProperties;
  size?: "small" | "medium" | "large";
  className?: string;
  children?: React.ReactNode;
}

export default function Box({
  style = {},
  size = "large",
  className = "",
  children,
}: BoxProps) {
  return (
    <div className={`box box--normal box--${size} ${className}`} style={style}>
      {children}
    </div>
  );
}
