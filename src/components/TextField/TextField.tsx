import React from "react";
import "./TextField.scss";
import Wrapper, { WrapperProps } from "./Wrapper";

interface BaseTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

function BaseTextField({
  inputRef,
  ...props
}: BaseTextFieldProps): JSX.Element {
  return <input {...props} type="text" ref={inputRef} />;
}

export type TextFieldProps = WrapperProps<BaseTextFieldProps>;
export default Wrapper<BaseTextFieldProps>(BaseTextField);

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

// export type InputFileProps = WrapperProps<BaseInputFileProps>;
// export const FileUploader = Wrapper<BaseInputFileProps>(BaseInputFile);
