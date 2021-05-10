import React from "react";
import "./TextField.scss";
import FormFieldFactory, {
  FormFieldStatus,
  FormFieldFactoryProps,
  FormFieldStatusProps,
} from "./FormFieldFactory";

interface BaseTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputRef?: React.RefObject<HTMLInputElement>;
}

function BaseTextField({
  inputRef,
  children,
  ...props
}: BaseTextFieldProps): JSX.Element {
  return (
    <>
      <input {...props} type="text" ref={inputRef} />
      {children}
    </>
  );
}

export type TextFieldProps = FormFieldFactoryProps<BaseTextFieldProps>;
export const TextField = FormFieldFactory<
  FormFieldStatusProps<BaseTextFieldProps>
>(FormFieldStatus(BaseTextField));

interface BaseSelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  inputRef?: React.RefObject<HTMLInputElement>;
}

function BaseSelect({
  inputRef,
  children,
  ...props
}: BaseSelectProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <input
        {...props}
        type="text"
        ref={inputRef}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      />
      {children}
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
    </>
  );
}

export type SelectProps = FormFieldFactoryProps<BaseSelectProps>;
export const Select = FormFieldFactory<FormFieldStatusProps<BaseSelectProps>>(
  FormFieldStatus(BaseSelect)
);
