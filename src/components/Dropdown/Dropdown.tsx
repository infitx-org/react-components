import React from "react";
import classnames from "classnames";
import Indicator from "components/Select/components/Indicator";
import Button, { ButtonProps } from "components/Button";
import "./Dropdown.scss";

function DropdownOverlay({ children }: { children: React.ReactNode }) {
  return <div className="rc-dropdown__overlay">{children}</div>;
}

export default function Dropdown({
  label,
  className,
  children,
  size = "large",
  ...props
}: ButtonProps) {
  const [open, setOpen] = React.useState(false);
  const buttonClassname = classnames([className, "rc-dropdown"]);
  return (
    <Button
      {...props}
      label={undefined}
      onClick={() => setOpen(!open)}
      className={buttonClassname}
      icon={<Indicator open={open} size={size} />}
      iconPosition="right"
    >
      {label}
      {open && <DropdownOverlay>{children}</DropdownOverlay>}
    </Button>
  );
}
