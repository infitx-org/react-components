import React from "react";
import Tooltip from "components/Tooltip";
import { ValidationResult } from "@modusbox/ts-utils/lib/validation";
import ValidationCard from "./ValidationCard";

interface BaseProps {
  showRequired?: boolean;
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
      invalid: props.invalid || !isValid,
    };
    const component = (
      <Component {...(props as Props)} {...newProps} ref={ref} />
    );
    return (
      <Tooltip
        fixed={!!props.focused && !!props.validation}
        content={
          <ValidationCard
            empty={props.showRequired}
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
