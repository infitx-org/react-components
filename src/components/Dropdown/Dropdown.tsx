import React from "react";
import classnames from "classnames";
import useOnClickOutside from "hooks/useOnClickOutside";
import Indicator from "components/shared/Indicator";
import Button, { ButtonProps } from "components/Button";
import { KeyCode } from "../../types";
import DropdownItem, { DropdownItemProps } from "./components/DropdownItem";
import DropdownOverlay from "./components/DropdownOverlay";
import "./Dropdown.scss";

function isDropdownItem(child: React.ReactNode): boolean {
  return (child as React.ReactElement).type === DropdownItem;
}

export interface DropdownProps
  extends Omit<ButtonProps, "children" | "iconPosition"> {
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
    if (overlayRef.current?.contains(e.target as Element)) {
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
