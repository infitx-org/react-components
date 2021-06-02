import React from "react";
import classnames from "classnames";
import { Kind, Size } from "types";
import useOnClickOutside from "hooks/useOnClickOutside";
import useOverlayPosition from "hooks/useOverlayPosition";
import Indicator from "components/Select/components/Indicator";
import Button, { ButtonProps } from "components/Button";
import "./Dropdown.scss";

interface DropdownItemProps {
  size?: `${Size}`;
  kind?: `${Kind}`;
  label?: string;
  children?: React.ReactNode;
}
export function DropdownItem({
  size,
  kind,
  label,
  children,
}: DropdownItemProps) {
  const dropdownItemClassName = classnames([
    "rc-dropdown__item",
    `rc-dropdown__item--${kind}`,
    `rc-dropdown__item--${size}`,
  ]);
  return (
    <div className={dropdownItemClassName} role="presentation">
      {children || label}
    </div>
  );
}

function DropdownOverlay({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const {
    top,
    bottom,
    height,
    left,
    right,
  } = useOverlayPosition<HTMLDivElement>(ref.current, false, true);

  const maxHeight = Math.min(220, parseInt(height || "", 10) || 220);

  return (
    <div
      className="rc-dropdown__overlay"
      ref={ref}
      style={{ top, bottom, left, right, maxHeight }}
    >
      <div className="rc-dropdown__overlay-content">{children}</div>
    </div>
  );
}

function isDropdownItem(child: React.ReactNode): boolean {
  return (child as React.ReactElement).type === DropdownItem;
}

interface DropdownProps extends Omit<ButtonProps, "children" | "iconPosition"> {
  children: number;
}

export default function Dropdown({
  kind = "primary",
  className,
  children,
  style,
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
    <div className="rc-dropdown" style={style}>
      <Button
        {...props}
        size={size}
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
            .map((child) => child as React.ReactElement<DropdownItemProps>)
            .map((child) =>
              React.cloneElement(child, { ...child.props, kind, size })
            )}
        </DropdownOverlay>
      )}
    </div>
  );
}