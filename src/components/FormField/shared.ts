import { ButtonProps as RawButtonProps } from "../Button";
import { CheckboxProps as RawCheckboxProps } from "../Checkbox/Checkbox";
import { DatePickerProps as RawDatePickerProps } from "../DatePicker/DatePicker";
import { FileUploaderProps as RawFileUploaderProps } from "../FileUploader/FileUploader";
import { NumberFieldProps as RawNumberFieldProps } from "../NumberField/NumberField";
import { RadioGroupProps as RawRadioGroupProps } from "../RadioGroup/RadioGroup";
import { SelectProps as RawSelectProps } from "../Select/Select";
import { TextFieldProps as RawTextFieldProps } from "../TextField/TextField";
import "./FormField.scss";

interface ButtonFormProps extends RawButtonProps {
  type: "button";
  label: string;
}
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

export type BaseFieldProps =
  | ButtonFormProps
  | CheckboxFormProps
  | DatePickerFormProps
  | FileUploaderFormProps
  | NumberFieldFormProps
  | RadioGroupFormProps
  | SelectFormProps
  | TextFieldFormProps;

export function isButton(props: BaseFieldProps): props is ButtonFormProps {
  return props.type === "button";
}

export function isTextField(
  props: BaseFieldProps
): props is TextFieldFormProps {
  return props.type === "text" || props.type === "password";
}

export function isDatePicker(
  props: BaseFieldProps
): props is DatePickerFormProps {
  return props.type === "date";
}

export function isFileUploader(
  props: BaseFieldProps
): props is FileUploaderFormProps {
  return props.type === "file";
}

export function isNumberField(
  props: BaseFieldProps
): props is NumberFieldFormProps {
  return props.type === "number";
}

export function isSelect(props: BaseFieldProps): props is SelectFormProps {
  return props.type === "select";
}

export function isRadio(props: BaseFieldProps): props is RadioGroupFormProps {
  return props.type === "radio";
}

export function isCheckbox(props: BaseFieldProps): props is CheckboxFormProps {
  return props.type === "checkbox";
}

export type FormFieldProps = BaseFieldProps & {
  outerDirection?: "row" | "column";
};
