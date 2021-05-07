import React from "react";
import "./TextField.scss";

export interface BaseTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
}

function BaseTextField(
  { ...props }: BaseTextFieldProps,
  ref: React.Ref<HTMLInputElement>
): JSX.Element {
  return <input {...props} type="text" ref={ref} />;
}

export default React.forwardRef(React.memo(BaseTextField));
