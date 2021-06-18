import classnames from "classnames";
import Button from "components/Button";
import Checkbox from "components/Checkbox";
import DatePicker from "components/DatePicker";
import FileUploader from "components/FileUploader";
import NumberField from "components/NumberField";
import RadioGroup from "components/RadioGroup";
import Select from "components/Select";
import TextField from "components/TextField";

import Container from "./components/Container";
import * as shared from "./shared";
import { FormFieldProps } from "./shared";
import "./FormField.scss";

function FormField({ outerDirection, ...props }: FormFieldProps) {
  let formComponent;

  if (shared.isCheckbox(props)) {
    formComponent = <Checkbox {...props} />;
  } else if (shared.isButton(props)) {
    formComponent = <Button {...props} />;
  } else if (shared.isRadio(props)) {
    formComponent = <RadioGroup {...props} />;
  } else if (shared.isTextField(props)) {
    formComponent = <TextField {...props} />;
  } else if (shared.isNumberField(props)) {
    formComponent = <NumberField {...props} />;
  } else if (shared.isDatePicker(props)) {
    formComponent = <DatePicker {...props} />;
  } else if (shared.isFileUploader(props)) {
    formComponent = <FileUploader {...props} />;
  } else if (shared.isSelect(props)) {
    formComponent = <Select {...props} />;
  }

  const className = classnames([
    "rc-formfield",
    outerDirection && `rc-formfield--${outerDirection}`,
  ]);
  return <div className={className}>{formComponent}</div>;
}

FormField.Container = Container;

export default FormField;
