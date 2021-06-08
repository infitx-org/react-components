import React from "react";
import Tooltip from "components/Tooltip";

export interface ValidationProps {
  focused?: boolean;
  validation?: string;
}

export default function withValidationCard<P>(
  Component: React.ComponentType<P>
) {
  return React.forwardRef(function FieldWithValidation(
    props: P & ValidationProps,
    ref
  ) {
    if (!props.focused || !props.validation) {
      return <Component {...(props as P)} ref={ref} />;
    }
    return (
      <Tooltip
        fixed
        label={props.validation as string}
        kind="danger"
        position="right"
      >
        <Component {...(props as P)} ref={ref} />
      </Tooltip>
    );
  });
}
