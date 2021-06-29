import React from "react";
import Tooltip from "components/Tooltip";
import { ValidationResult } from "@modusbox/ts-utils/lib/validation";
import ValidationCard from "./ValidationCard";

interface BaseProps {
  hasEmptyValue?: boolean;
  required?: boolean;
  invalid?: boolean;
}
export interface WithValidationProps {
  focused?: boolean;
  validation?: ValidationResult;
}

export default function withValidation<Props extends BaseProps>(
  Component: React.ComponentType<Props>
) {
  return React.forwardRef(function WithValidation(
    props: Props & WithValidationProps,
    ref
  ) {
    const isRequired = props.validation?.isRequired;
    const isValid = props.validation?.isValid;
    const newProps = {
      required: props.required || isRequired,
      // invalid explicitely set or only when has value + validation
      invalid:
        props.invalid || (isValid === false && props.hasEmptyValue === false),
    };
    const component = (
      <Component {...(props as Props)} {...newProps} ref={ref} />
    );
    return (
      <Tooltip
        fixed={!!props.focused && !!props.validation}
        content={
          <ValidationCard
            empty={props.hasEmptyValue}
            messages={props.validation?.messages}
          />
        }
        position="right"
      >
        {component}
      </Tooltip>
    );
  });
}
