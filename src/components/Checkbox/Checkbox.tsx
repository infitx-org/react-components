import classnames from "classnames";
import React, { ChangeEvent } from "react";
import { Kind } from "types";
import "./Checkbox.scss";

export interface CheckboxProps {
  kind: `${Kind}`;
  style: React.CSSProperties;
  className: string;
  label: string;
  name?: string;
  id?: string;
  checked?: boolean;
  semi?: boolean;
  round?: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Checkbox({
  kind = "primary",
  style,
  className,
  label,
  name,
  id,
  checked = false,
  semi = false,
  round = false,
  disabled = false,
  onChange,
}: CheckboxProps) {
  const [isChecked, setChecked] = React.useState(checked);
  React.useEffect(() => {
    setChecked(checked);
  }, [checked]);

  const wrapperClassName = classnames([
    "mb-input",
    "rc-checkbox__wrapper",
    className,
  ]);
  const checkboxClassName = classnames([
    "rc-checkbox",
    `rc-checkbox--${kind}`,
    semi && "rc-checkbox--semi-checked",
    round && "rc-checkbox--round",
    !label && "rc-checkbox--no-margin",
  ]);
  const labelClassName = classnames([
    "rc-checkbox__label",
    disabled && "rc-checkbox__label--disabled",
  ]);
  return (
    <label className={wrapperClassName} style={style}>
      <input
        type="checkbox"
        id={id}
        name={name}
        className={checkboxClassName}
        onChange={(e) => {
          setChecked(!isChecked);
          onChange(e);
        }}
        checked={isChecked && semi !== true}
        disabled={disabled}
      />
      {label && <span className={labelClassName}>{label}</span>}
    </label>
  );
}

export default React.memo(Checkbox);
