import React from "react";
import "./TextField.scss";
import FormFieldFactory, {
  FormFieldStatus,
  FormFieldFactoryProps,
  FormFieldStatusProps,
} from "./FormFieldFactory";

const blackDot = (
  <div style={{ width: "10px", height: "10px", background: "black" }} />
);

interface BaseTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputRef?: React.RefObject<HTMLInputElement>;
}

function BaseTextField({
  inputRef,
  ...props
}: BaseTextFieldProps): JSX.Element {
  return (
    <>
      <input {...props} type="text" ref={inputRef} />
    </>
  );
}

export type TextFieldProps = FormFieldFactoryProps<BaseTextFieldProps>;
export const TextField = FormFieldFactory<BaseTextFieldProps>(BaseTextField);

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
      <div>
        <input
          {...props}
          type="text"
          ref={inputRef}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        />
        {children}
        {blackDot}
      </div>
      {open && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            top: "60px",
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

// interface BaseInputFileProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {
//   value?: string;
// }

// function BaseInputFile(
//   { ...props }: BaseInputFileProps,
//   ref: React.Ref<HTMLInputElement>
// ): JSX.Element {
//   return <input {...props} type="file" ref={ref} />;
// }

// const FileWithForwardedRefs = React.forwardRef(BaseInputFile);

// export type InputFileProps = FormFieldFactoryProps<BaseInputFileProps>;
// export const FileUploader = FormFieldFactory<BaseInputFileProps>(BaseInputFile);
