import React from "react";
import Checkbox from "components/Checkbox";
import RadioGroup from "components/RadioGroup";
import Select from "components/Select";
import TextField from "components/TextField";
import { CheckboxProps as RawCheckboxProps } from "../Checkbox/Checkbox";
import { RadioGroupProps as RawRadioGroupProps } from "../RadioGroup/RadioGroup";
import { SelectProps as RawSelectProps } from "../Select/Select";
import { TextFieldProps as RawTextFieldProps } from "../TextField/TextField";
import "./FormField.scss";

// type CheckboxProps = Omit<RawCheckboxProps, "label">;
// type RadioGroupProps = Omit<RawRadioGroupProps, "label">;
// type SelectProps = RawSelectProps;
// type TextFieldProps = Omit<RawTextFieldProps, "type">;

interface CheckboxFormProps extends RawCheckboxProps {
  type: "checkbox";
  label: string;
}
interface RadioGroupFormProps extends RawRadioGroupProps {
  type: "radio";
  label: string;
}
interface SelectFormProps extends RawSelectProps {
  type: "select";
  label?: string;
}
interface TextFieldFormProps extends RawTextFieldProps {
  type: "text" | "password";
  label?: string;
}

export type FormFieldProps =
  | CheckboxFormProps
  | RadioGroupFormProps
  | SelectFormProps
  | TextFieldFormProps;

function isText(props: FormFieldProps): props is TextFieldFormProps {
  return props.type === "text" || props.type === "password";
}

function isSelect(props: FormFieldProps): props is SelectFormProps {
  return props.type === "select";
}

function isRadio(props: FormFieldProps): props is RadioGroupFormProps {
  return props.type === "radio";
}

function isCheckbox(props: FormFieldProps): props is CheckboxFormProps {
  return props.type === "checkbox";
}

function Label({ label }: { label: string }) {
  return <label className="rc-formfield__label">{label}</label>;
}

export default function FormField({ ...props }: FormFieldProps) {
  let formComponent;
  let labelComponent = null;

  if (isText(props)) {
    const { label, ...ownProps } = props;
    labelComponent = label && <Label label={label} />;
    formComponent = <TextField {...ownProps} />;
  } else if (isSelect(props)) {
    const { label, ...ownProps } = props;
    labelComponent = label && <Label label={label} />;
    formComponent = <Select {...ownProps} />;
  } else if (isRadio(props)) {
    const { label, ...ownProps } = props;
    labelComponent = label && <Label label={label} />;
    formComponent = <RadioGroup {...ownProps} />;
  } else if (isCheckbox(props)) {
    formComponent = <Checkbox {...props} />;
  }

  return (
    <div className="rc-formfield">
      {labelComponent}
      {formComponent}
    </div>
  );
}



export const FormGroup = {
  // @ts-ignore
  Row: ({ children }) => (
    <div className="rc-formgroup-row">
      {/* @ts-ignore */}
      {React.Children.toArray(children).map(child => React.cloneElement(child, { ...child.props, className: `rc-formgroup-row--${child.props.type}` }))}
    </div>
  ),
  // @ts-ignore
  Col: ({ children }) => (
    <div className="rc-formgroup-col">
      {/* @ts-ignore */}
      {React.Children.toArray(children).map(child => React.cloneElement(child, { ...child.props, className: `rc-formgroup-col--${child.props.type}` }))}
    </div>
  )
}