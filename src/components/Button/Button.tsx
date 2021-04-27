import React, { MouseEvent } from "react";
import "./Button.scss";

interface ButtonProps {
  children?: React.ReactNode;
  label?: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ children, label, onClick }: ButtonProps) {
  return (
    <button className="test" onClick={onClick} type="button">
      {children || label}
    </button>
  );
}
