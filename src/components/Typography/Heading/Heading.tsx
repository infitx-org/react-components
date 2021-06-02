import React from "react";
import "./Heading.scss";

function headerTag(size: number): string {
  if (size >= 1 && size <= 6) {
    return `h${size}`;
  }
  return "h3";
}

export interface HeadingProps {
  size: "1" | "2" | "3" | "4" | "5" | "6";
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default function Heading({
  size = "3",
  children,
  style,
  className,
}: HeadingProps) {
  const Header = headerTag(parseInt(size, 10)) as React.ElementType;
  return (
    <Header style={style} className={className}>
      {children}
    </Header>
  );
}
