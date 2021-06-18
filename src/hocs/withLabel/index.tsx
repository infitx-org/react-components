import { ComponentType } from "react";
import Label from "components/Label";
import { Size } from "../../types";

export interface WithLabelProps {
  label?: string;
}

interface LookingForProps {
  required?: boolean;
  size?: `${Size}`;
}

export default function withLabel<Props extends LookingForProps>(
  Component: ComponentType<Props>
) {
  return function WithLabel({ label, ...props }: Props & WithLabelProps) {
    return (
      <>
        <Label size={props.size} required={props.required} label={label} />
        <Component {...(props as Props)} />
      </>
    );
  };
}
