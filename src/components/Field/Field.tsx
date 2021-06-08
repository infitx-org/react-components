import React from "react";
import classnames from "classnames";
import { Kind, InputSize } from "types";
import mergeRefs from "utils/mergeRefs";
import useOnClickOutside from "hooks/useOnClickOutside";
import "./Field.scss";
import withValidation, { ValidationProps } from "./hocs/withValidation";

export interface FieldProps extends ValidationProps {
  kind?: `${Kind}`;
  size?: `${InputSize}`;
  required?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  focused?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClickOutside?: (e: MouseEvent) => void;
}

const Field = React.forwardRef(function Field(
  {
    kind = Kind.Primary,
    size = InputSize.Large,
    disabled,
    required,
    invalid,
    children,
    focused,
    className,
    onClick,
    onClickOutside,
  }: FieldProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
): JSX.Element {
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
    invalid && "rc-field--invalid",
    required && "rc-field--required",
    className,
  ]);

  return (
    <div
      className={fieldClassname}
      onClick={onClick}
      role="presentation"
      ref={mergeRefs(fieldRef, forwardedRef)}
    >
      {children}
    </div>
  );
});

export default withValidation(Field);
