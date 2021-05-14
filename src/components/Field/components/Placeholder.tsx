import classnames from "classnames";
import { InputSize } from "../../types";
import "./Placeholder.scss";

interface PlaceholderProps {
  label: string;
  size: `${InputSize}`;
  active: boolean;
}

export default function Placeholder({ label, size, active }: PlaceholderProps) {
  // The Placeholder that renders inside an input

  const placeholderClassName = classnames([
    "placeholder",
    size === InputSize.Small && "placeholder--small",
    size === InputSize.Medium && "placeholder--medium",
    size === InputSize.Large && "placeholder--large",
    size === InputSize.Small && active && "placeholder--active-small",
    size === InputSize.Medium && active && "placeholder--active-medium",
    size === InputSize.Large && active && "placeholder--active-large",
  ]);

  return <label className={placeholderClassName}>{label}</label>;
}
