import classnames from "classnames";
import { InputSize } from "../../../types";
import "./Placeholder.scss";

export interface PlaceholderProps {
  label: string;
  size: `${InputSize}`;
  active: boolean;
}

export default function Placeholder({ label, size, active }: PlaceholderProps) {
  const placeholderClassName = classnames([
    "placeholder",
    active && "placeholder--active",
    size === InputSize.Small && "placeholder--small",
    size === InputSize.Medium && "placeholder--medium",
    size === InputSize.Large && "placeholder--large",
  ]);

  return <label className={placeholderClassName}>{label}</label>;
}
