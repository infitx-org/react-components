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
    const { ...ownProps } = props;
    formComponent = <RadioGroup {...ownProps} />;
  } else if (shared.isTextField(props)) {
    const { ...ownProps } = props;
    formComponent = <TextField {...ownProps} />;
  } else if (shared.isNumberField(props)) {
    const { ...ownProps } = props;
    formComponent = <NumberField {...ownProps} />;
  } else if (shared.isDatePicker(props)) {
    const { ...ownProps } = props;
    formComponent = <DatePicker {...ownProps} />;
  } else if (shared.isFileUploader(props)) {
    const { ...ownProps } = props;
    formComponent = <FileUploader {...ownProps} />;
  } else if (shared.isSelect(props)) {
    const { ...ownProps } = props;
    formComponent = <Select {...ownProps} />;
  }

  const className = classnames([
    "rc-formfield",
    outerDirection && `rc-formfield--${outerDirection}`,
  ]);
  return <div className={className}>{formComponent}</div>;
}

FormField.Container = Container;

export default FormField;
