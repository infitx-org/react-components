import { ButtonProps } from "../Button";
import { CheckboxProps } from "../Checkbox/Checkbox";
import { DatePickerProps } from "../DatePicker/DatePicker";
import { FileUploaderProps } from "../FileUploader/FileUploader";
import { NumberFieldProps } from "../NumberField/NumberField";
import { RadioGroupProps } from "../RadioGroup/RadioGroup";
import { SelectProps } from "../Select/Select";
import { TextFieldProps } from "../TextField/TextField";
import "./FormField.scss";

interface ButtonFormProps extends ButtonProps {
  type: "button";
}
interface CheckboxFormProps extends CheckboxProps {
  type: "checkbox";
}
interface DatePickerFormProps extends DatePickerProps {
  type: "date";
}
interface FileUploaderFormProps extends FileUploaderProps {
  type: "file";
}
interface NumberFieldFormProps extends NumberFieldProps {
  type: "number";
}
interface RadioGroupFormProps extends RadioGroupProps {
  type: "radio";
}
interface SelectFormProps extends SelectProps {
  type: "select";
}
interface TextFieldFormProps extends TextFieldProps {
  type: "text" | "password";
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
