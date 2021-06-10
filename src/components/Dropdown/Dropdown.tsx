import React from "react";
import classnames from "classnames";
import { Kind, Size, KeyCode } from "types";
import useOverlayPosition from "hooks/useOverlayPosition";
import useOnClickOutside from "hooks/useOnClickOutside";
import mergeRefs from "utils/mergeRefs";
import Indicator from "components/Select/components/Indicator";
import Button, { ButtonProps } from "components/Button";
import "./Dropdown.scss";

interface DropdownItemProps {
  size?: `${Size}`;
  kind?: `${Kind}`;
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
}
function DropdownItem({
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

const DropdownOverlay = React.forwardRef(function DropdownOverlay(
  { children }: { children: React.ReactNode },
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
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
      ref={mergeRefs(ref, forwardedRef)}
      style={{ top, bottom, left, right, maxHeight }}
    >
      <div className="rc-dropdown__overlay-content">{children}</div>
    </div>
  );
});

function isDropdownItem(child: React.ReactNode): boolean {
  return (child as React.ReactElement).type === DropdownItem;
}

interface DropdownProps extends Omit<ButtonProps, "children" | "iconPosition"> {
  children: React.ReactNode;
}

const Dropdown = ({
  kind = "primary",
  className,
  children,
  style,
  size = "large",
  ...props
}: DropdownProps) => {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(buttonRef, (e: MouseEvent) => {
    if (overlayRef.current?.contains(e.target)) {
      return;
    }
    setOpen(false);
    buttonRef.current?.blur();
  });

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.keyCode === KeyCode.Tab) {
      setOpen(false);
    }
  }

  const buttonClassname = classnames([className]);

  return (
    <div className="rc-dropdown" style={style}>
      <Button
        {...props}
        size={size}
        kind={kind}
        onKeyDown={onKeyDown}
        onClick={() => setOpen(!open)}
        className={buttonClassname}
        icon={<Indicator open={open} size={size} />}
        iconPosition="right"
        ref={buttonRef}
      />
      {open && (
        <DropdownOverlay ref={overlayRef}>
          {React.Children.toArray(children)
            .filter(isDropdownItem)
            .map((child) => child as React.ReactElement<DropdownItemProps>)
            .map((child) =>
              React.cloneElement(child, {
                ...child.props,
                onClick: (e: React.MouseEvent<HTMLDivElement>) => {
                  child.props.onClick?.(e);
                  setOpen(false);
                },
                kind,
                size,
              })
            )}
        </DropdownOverlay>
      )}
    </div>
  );
};

Dropdown.Item = DropdownItem;
export default Dropdown;
