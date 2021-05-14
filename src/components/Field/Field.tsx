import React from "react";
import classnames from "classnames";
import { Kind, InputSize } from "../types";
import useOnClickOutside from "../hooks/useOnClickOutside";
import "./Field.scss";

export interface FieldProps {
  kind?: `${Kind}`;
  size?: InputSize;
  label?: string;
  required?: boolean;
  pending?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  focused?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClickOutside?: (e: MouseEvent) => void;
}

export default function Field({
  kind = Kind.Primary,
  size = InputSize.Large,
  label,
  disabled,
  required,
  pending,
  invalid,
  children,
  focused,
  onClick,
  onClickOutside,
}: FieldProps): JSX.Element {
  const fieldRef = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(fieldRef, onClickOutside);

  const fieldClassname = classnames([
    "field",
    kind && `field--${kind}`,
    "field__borders",
    "field__background",
    "field__shadow",
    size === InputSize.Small && "field--small",
    size === InputSize.Medium && "field--medium",
    size === InputSize.Large && "field--large",
    focused &&
      "field--open field__borders--open field__background--open field__shadow--open",
    disabled &&
      "field--disabled field__borders--disabled field__background--disabled",
    pending &&
      "field--pending field__borders--pending field__background--pending field__shadow--pending",
    invalid &&
      "field--invalid field__borders--invalid field__background--invalid field__shadow--invalid",
    required &&
      "field--required field__borders--required field__background--required field__shadow--required",
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
