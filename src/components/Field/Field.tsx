import React from "react";
import classnames from "classnames";
import { Kind, InputSize } from "types";
import useOnClickOutside from "hooks/useOnClickOutside";
import "./Field.scss";

export type FieldProps = {
  kind?: `${Kind}`;
  size?: `${InputSize}`;
  label?: string;
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
  label,
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
    kind && `rc-field--${kind}`,
    "rc-field__borders",
    "rc-field__background",
    "rc-field__shadow",
    size === InputSize.Small && "rc-field--small",
    size === InputSize.Medium && "rc-field--medium",
    size === InputSize.Large && "rc-field--large",
    focused &&
      "rc-field--open rc-field__borders--open rc-field__background--open rc-field__shadow--open",
    disabled &&
      "rc-field--disabled rc-field__borders--disabled rc-field__background--disabled",
    pending &&
      "rc-field--pending rc-field__borders--pending rc-field__background--pending rc-field__shadow--pending",
    invalid &&
      "rc-field--invalid rc-field__borders--invalid rc-field__background--invalid rc-field__shadow--invalid",
    required &&
      "rc-field--required rc-field__borders--required rc-field__background--required rc-field__shadow--required",
    className,
  ]);

  return (
    <div>
      {label && <label>{label}</label>}
      <div
        className={fieldClassname}
        onClick={onClick}
        role="presentation"
        ref={fieldRef}
      >
        {children}
      </div>
    </div>
  );
}

export default React.memo(Field);
