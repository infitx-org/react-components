import React from "react";
import "./Layout.stories.css";

export function Blocks() {
  return (
    <>
      <div className="block--small" />
      <div className="block--big" />
      <div className="block--small" />
      <div className="block--big" />
    </>
  );
}

interface TitleProps {
  children?: React.ReactNode;
}

export function Title({ children }: TitleProps) {
  return <div className="title">{children}</div>;
}
