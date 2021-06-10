import React from "react";
import classnames from "classnames";
import { Kind, Size } from "types";
import "./DropdownItem.scss";

export interface DropdownItemProps {
  size?: `${Size}`;
  kind?: `${Kind}`;
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
}

export default function DropdownItem({
  size,
  kind,
  label,
  onClick,
  children,
}: DropdownItemProps) {
  const dropdownItemClassName = classnames([
    "rc-dropdown__item",
    `rc-dropdown__item--${kind}`,
    `rc-dropdown__item--${size}`,
  ]);
  return (
    <div
      className={dropdownItemClassName}
      role="presentation"
      onClick={onClick}
    >
      {children || label}
    </div>
  );
}
