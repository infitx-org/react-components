import React from "react";
import classnames from "classnames";
import { Kind, InputSize } from "types";
import useOnClickOutside from "hooks/useOnClickOutside";
import "./Field.scss";

export type FieldProps = {
  kind?: `${Kind}`;
  size?: `${InputSize}`;
  required?: boolean;
  pending?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  focused?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClickOutside?: (e: MouseEvent) => void;
};

function Field({
  kind = Kind.Primary,
  size = InputSize.Large,
  disabled,
  required,
  pending,
  invalid,
  children,
  focused,
  className,
  onClick,
  onClickOutside,
}: FieldProps): JSX.Element {
  const fieldRef = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(fieldRef, onClickOutside);

  const fieldClassname = classnames([
    "rc-field",
    `rc-field--${kind}`,
    `rc-field--${size}`,
    size === InputSize.Medium && "rc-field--medium",
    size === InputSize.Large && "rc-field--large",
    focused && "rc-field--focused",
    disabled && "rc-field--disabled",
    pending && "rc-field--pending",
    invalid && "rc-field--invalid",
    required && "rc-field--required",
    className,
  ]);

  return (
    <div
      className={fieldClassname}
      onClick={onClick}
      role="presentation"
      ref={fieldRef}
    >
      {children}
    </div>
  );
}

export default React.memo(Field);
