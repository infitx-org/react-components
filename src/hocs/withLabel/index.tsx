import React, { ComponentType } from "react";
import Label from "components/Label";
import { Size } from "../../types";

export interface WithLabelProps {
  label?: string;
}

interface LookingForProps {
  hasEmptyValue?: boolean;
  required?: boolean;
  size?: `${Size}`;
}

export default function withLabel<Props extends LookingForProps>(
  Component: ComponentType<Props>
) {
  return React.forwardRef(function WithLabel(
    { label, ...props }: Props & WithLabelProps,
    ref
  ) {
    return (
      <>
        <Label
          size={props.size}
          required={props.required}
          label={label}
          hasEmptyValue={props.hasEmptyValue}
        />
        <Component {...(props as Props)} ref={ref} />
      </>
    );
  });
}
