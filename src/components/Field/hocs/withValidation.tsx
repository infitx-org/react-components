import React from "react";
import Tooltip from "components/Tooltip";

export interface ValidationProps {
  focused: boolean;
  message: string;
}

export default function withValidationCard<P>(
  Component: React.ComponentType<P>
) {
  return React.forwardRef(function FieldWithValidation(
    props: P & ValidationProps,
    ref
  ) {
    return (
      <Tooltip
        fixed={props.focused as boolean}
        label={props.message}
        kind="success"
        position="right"
      >
        <Component {...(props as P)} ref={ref} />
      </Tooltip>
    );
  });
}
