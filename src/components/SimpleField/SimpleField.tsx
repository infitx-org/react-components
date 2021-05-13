import React from "react";
// import "./SimpleField.scss";
import classnames from "classnames";
import Field from "../Field";
import { InputSize } from "../types";

export interface SimpleFieldProps {
  pending?: boolean;
  size: `${InputSize}`;
  children: React.ReactNode;
}

export default React.forwardRef(function SimpleField(
  { pending, size = InputSize.Large, children }: SimpleFieldProps,
  ref: React.ForwardedRef<HTMLInputElement>
): JSX.Element {
  return <Field pending={pending}>{children}</Field>;
});
