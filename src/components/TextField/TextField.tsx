import React from "react";
import "./TextField.scss";
import Field from "../Field";
import Spinner from "../Spinner";

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  pending?: boolean;
}

export default React.forwardRef(function TextField(
  { pending, children, ...props }: TextFieldProps,
  ref: React.ForwardedRef<HTMLInputElement>
): JSX.Element {
  const component = <input {...props} type="text" ref={ref} />;
  return (
    <Field required pending component={component}>
      {pending && <Spinner />}
    </Field>
  );
});
