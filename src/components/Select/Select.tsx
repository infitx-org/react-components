import React from "react";
import "./Select.scss";
import Field from "../Field";
import Spinner from "../Spinner";
import Indicator from "./Indicator";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLInputElement> {
  pending?: boolean;
}

export default React.forwardRef(function Select(
  { pending, ...props }: SelectProps,
  ref: React.ForwardedRef<HTMLInputElement>
): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const component = (
    <input
      {...props}
      type="text"
      ref={ref}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    />
  );
  return (
    <Field required pending component={component}>
      {pending && <Spinner />}
      <Indicator open={open} size="large" />
      {open && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            top: "60px",
            left: "0px",
            height: "30px",
            backgroundColor: "#eee",
          }}
        />
      )}
    </Field>
  );
});
