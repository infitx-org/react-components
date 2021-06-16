// import React from "react";
import Checkbox from "components/Checkbox";
import RadioGroup from "components/RadioGroup";
import Select from "components/Select";
import TextField from "components/TextField";
import { CheckboxProps as RawCheckboxProps } from "../Checkbox/Checkbox";
import { RadioGroupProps as RawRadioGroupProps } from "../RadioGroup/RadioGroup";
import { SelectProps as RawSelectProps } from "../Select/Select";
import { TextFieldProps as RawTextFieldProps } from "../TextField/TextField";

type CheckboxProps = Omit<RawCheckboxProps, "label">;
type RadioGroupProps = Omit<RawRadioGroupProps, "label">;
type SelectProps = RawSelectProps;
type TextFieldProps = Omit<RawTextFieldProps, "type">;

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

type FormFieldProps =
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

export default function FormField({ ...props }: FormFieldProps) {
  let component;

  if (isText(props)) {
    component = <TextField {...props} />;
  } else if (isSelect(props)) {
    component = <Select {...props} />;
  } else if (isRadio(props)) {
    component = <RadioGroup {...props} />;
  } else if (isCheckbox(props)) {
    component = <Checkbox {...props} />;
  }

  return (
    <>
      <div>{props.label}</div>
      {component}
    </>
  );
}
<>
  <FormField type="text" label="this is a text" />
  <FormField type="checkbox" label="this is a checkbox" />
</>;
