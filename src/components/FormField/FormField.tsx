import React from "react";
import Checkbox from "components/Checkbox";
import DatePicker from "components/DatePicker";
import FileUploader from "components/FileUploader";
import NumberField from "components/NumberField";
import RadioGroup from "components/RadioGroup";
import Select from "components/Select";
import TextField from "components/TextField";

import Label from "./components/Label";

import { CheckboxProps as RawCheckboxProps } from "../Checkbox/Checkbox";
import { DatePickerProps as RawDatePickerProps } from "../DatePicker/DatePicker";
import { FileUploaderProps as RawFileUploaderProps } from "../FileUploader/FileUploader";
import { NumberFieldProps as RawNumberFieldProps } from "../NumberField/NumberField";
import { RadioGroupProps as RawRadioGroupProps } from "../RadioGroup/RadioGroup";
import { SelectProps as RawSelectProps } from "../Select/Select";
import { TextFieldProps as RawTextFieldProps } from "../TextField/TextField";
import "./FormField.scss";

interface CheckboxFormProps extends RawCheckboxProps {
  type: "checkbox";
  label: string;
}
interface DatePickerFormProps extends RawDatePickerProps {
  type: "date";
  label: string;
}
interface FileUploaderFormProps extends RawFileUploaderProps {
  type: "file";
  label: string;
}
interface NumberFieldFormProps extends RawNumberFieldProps {
  type: "number";
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

type BaseFieldProps =
  | CheckboxFormProps
  | DatePickerFormProps
  | FileUploaderFormProps
  | NumberFieldFormProps
  | RadioGroupFormProps
  | SelectFormProps
  | TextFieldFormProps;

function isTextField(props: BaseFieldProps): props is TextFieldFormProps {
  return props.type === "text" || props.type === "password";
}

function isDatePicker(props: BaseFieldProps): props is DatePickerFormProps {
  return props.type === "date";
}

function isFileUploader(props: BaseFieldProps): props is FileUploaderFormProps {
  return props.type === "file";
}

function isNumberField(props: BaseFieldProps): props is NumberFieldFormProps {
  return props.type === "number";
}

function isSelect(props: BaseFieldProps): props is SelectFormProps {
  return props.type === "select";
}

function isRadio(props: BaseFieldProps): props is RadioGroupFormProps {
  return props.type === "radio";
}

function isCheckbox(props: BaseFieldProps): props is CheckboxFormProps {
  return props.type === "checkbox";
}

export type FormFieldProps = BaseFieldProps & {
  direction?: "row" | "column";
};

export default function FormField({
  direction = "column",
  ...props
}: FormFieldProps) {
  let formComponent;
  let labelComponent = null;

  if (isTextField(props)) {
    const { label, ...ownProps } = props;
    labelComponent = label && <Label label={label} size={props.size} />;
    formComponent = <TextField {...ownProps} />;
  } else if (isNumberField(props)) {
    const { label, ...ownProps } = props;
    labelComponent = label && <Label label={label} size={props.size} />;
    formComponent = <NumberField {...ownProps} />;
  } else if (isDatePicker(props)) {
    const { label, ...ownProps } = props;
    labelComponent = label && <Label label={label} size={props.size} />;
    formComponent = <DatePicker {...ownProps} />;
  } else if (isFileUploader(props)) {
    const { label, ...ownProps } = props;
    labelComponent = label && <Label label={label} size={props.size} />;
    formComponent = <FileUploader {...ownProps} />;
  } else if (isSelect(props)) {
    const { label, ...ownProps } = props;
    labelComponent = label && <Label label={label} size={props.size} />;
    formComponent = <Select {...ownProps} />;
  } else if (isRadio(props)) {
    const { label, ...ownProps } = props;
    labelComponent = label && <Label label={label} />;
    formComponent = <RadioGroup {...ownProps} />;
  } else if (isCheckbox(props)) {
    formComponent = <Checkbox {...props} />;
  }

  return (
    <div className={`rc-formfield rc-formfield--${direction}`}>
      {labelComponent}
      {formComponent}
    </div>
  );
}

interface FormFieldsProps {
  direction?: "row" | "column";
  children: React.ReactElement<FormFieldProps>[];
}

export function FormFields({
  direction = "column",
  children,
}: FormFieldsProps) {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormFieldProps>[];
  const className = `rc-formfields--${direction}`;

  return (
    <div className={className}>
      {childrenArray.map((child) =>
        React.cloneElement(child, { ...child.props, direction })
      )}
    </div>
  );
}
