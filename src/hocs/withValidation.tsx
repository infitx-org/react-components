import React from "react";
import Tooltip from "components/Tooltip";
import { ValidationMessage } from "@modusbox/ts-utils/lib/validation";

function ValidationCard({
  validation = [],
}: {
  validation: ValidationMessage[];
}) {
  return (
    <div>
      <ul>
        {validation.map((val) => (
          <li>
            {val.active} {val.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export interface WithValidationProps {
  focused?: boolean;
  validation?: ValidationMessage[];
}

export default function withValidationCard<Props>(
  Component: React.ComponentType<Props>
) {
  return React.forwardRef(function FieldWithValidation(
    props: Props & WithValidationProps,
    ref
  ) {
    if (!props.focused || !props.validation) {
      return <Component {...(props as Props)} ref={ref} />;
    }
    return (
      <Tooltip
        fixed
        content={
          <ValidationCard
            validation={props.validation as ValidationMessage[]}
          />
        }
        kind="danger"
        position="right"
      >
        <Component {...(props as Props)} ref={ref} />
      </Tooltip>
    );
  });
}
