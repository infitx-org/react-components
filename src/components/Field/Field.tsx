import React from "react";
import classnames from "classnames";
import mergeRefs from "utils/mergeRefs";
import useOnClickOutside from "hooks/useOnClickOutside";
import withValidation, { WithValidationProps } from "../../hocs/withValidation";
import withLabel, { WithLabelProps } from "../../hocs/withLabel";
import { Kind, InputSize } from "../../types";
import "./Field.scss";

type BaseFieldProps = {
  kind?: `${Kind}`;
  size?: `${InputSize}`;
  required?: boolean;
  hasEmptyValue?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  focused?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClickOutside?: (e: MouseEvent) => void;
};

export type FieldProps = BaseFieldProps & WithValidationProps & WithLabelProps;

const Field = React.forwardRef(function Field(
  {
    kind = Kind.Primary,
    size = InputSize.Large,
    disabled,
    required,
    hasEmptyValue,
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

  const isRequired = required && !invalid && hasEmptyValue;

  const fieldClassname = classnames([
    "rc-field",
    `rc-field--${kind}`,
    `rc-field--${size}`,
    focused && "rc-field--focused",
    disabled && "rc-field--disabled",
    isRequired && "rc-field--required",
    invalid && "rc-field--invalid",
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

export default withValidation(withLabel(Field));
