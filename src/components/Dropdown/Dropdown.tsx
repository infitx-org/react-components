import React from "react";
import classnames from "classnames";
import { Kind } from "types";
import useOnClickOutside from "hooks/useOnClickOutside";
import Indicator from "components/Select/components/Indicator";
import Button, { ButtonProps } from "components/Button";
import "./Dropdown.scss";

interface DropdownItemProps {
  kind?: Kind;
  label?: string;
  children?: React.ReactNode;
}
export function DropdownItem({ kind, label, children }: DropdownItemProps) {
  const dropdownItemClassName = classnames([
    "rc-dropdown__item",
    `rc-dropdown__item--${kind}`,
  ]);
  return (
    <div className={dropdownItemClassName} role="presentation">
      {children || label}
    </div>
  );
}

function DropdownOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="rc-dropdown__overlay">
      <div className="rc-dropdown__overlay-content">{children}</div>
    </div>
  );
}

function isDropdownItem(child: React.ReactNode): boolean {
  return (child as React.ReactElement).type === DropdownItem;
}

interface DropdownProps extends Omit<ButtonProps, "children"> {
  children: number;
}

export default function Dropdown({
  kind = "primary",
  className,
  children,
  size = "large",
  ...props
}: DropdownProps) {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  function onClickOutside() {
    setOpen(false);
    buttonRef.current?.blur();
  }
  useOnClickOutside(buttonRef, onClickOutside);
  const buttonClassname = classnames([className]);

  return (
    <div className="rc-dropdown">
      <Button
        {...props}
        kind={kind}
        onClick={() => setOpen(!open)}
        className={buttonClassname}
        icon={<Indicator open={open} size={size} />}
        iconPosition="right"
        ref={buttonRef}
      />
      {open && (
        <DropdownOverlay>
          {React.Children.toArray(children)
            .filter(isDropdownItem)
            .map((child) =>
              React.cloneElement(child, { ...child.props, kind })
            )}
        </DropdownOverlay>
      )}
    </div>
  );
}
