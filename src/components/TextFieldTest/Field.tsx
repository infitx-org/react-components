import React from "react";
import classnames from "classnames";
import { Kind, Size } from "../types";

export interface FieldPublicProps {
  kind: `${Kind}`;
  size?: Size;
  label?: string;
  required?: boolean;
  pending?: boolean;
}

interface FieldPrivateProps {
  focused: boolean;
  disabled: boolean;
  children: React.ReactNode;
}

type FieldProps = FieldPublicProps & FieldPrivateProps;

export default function Field({
  kind,
  size = Size.Large,
  label,
  focused,
  disabled,
  required,
  pending,
  children,
}: FieldProps): JSX.Element {
  const fieldClassname = classnames([
    "field",
    kind && `field--${kind}`,
    "mb-input",
    "mb-input__borders",
    "mb-input__background",
    "mb-input__shadow",
    size === Size.Small && "mb-input--small",
    size === Size.Medium && "mb-input--medium",
    size === Size.Large && "mb-input--large",
    focused &&
      "mb-input--open mb-input__borders--open mb-input__background--open mb-input__shadow--open",
    disabled &&
      "mb-input--disabled mb-input__borders--disabled mb-input__background--disabled",
    pending &&
      "mb-input--pending mb-input__borders--pending mb-input__background--pending mb-input__shadow--pending",
    // invalid &&
    //   "mb-input--invalid mb-input__borders--invalid mb-input__background--invalid mb-input__shadow--invalid",
    required &&
      // !hasValue &&
      "mb-input--required mb-input__borders--required mb-input__background--required mb-input__shadow--required",
  ]);

  return (
    <>
      {label && <label>{label}</label>}
      <div className={fieldClassname}>{children}</div>
    </>
  );
}
