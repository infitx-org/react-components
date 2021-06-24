import React, { ComponentType } from "react";
import Label from "components/Label";
import { Size } from "../../types";

export interface WithLabelProps {
  showRequired?: boolean;
  required?: boolean;
  label?: string;
}

interface LookingForProps {
  showRequired?: boolean;
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
          showRequired={props.showRequired}
        />
        <Component {...(props as Props)} ref={ref} />
      </>
    );
  });
}
