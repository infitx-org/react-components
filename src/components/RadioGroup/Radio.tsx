import React, { ChangeEvent } from "react";
import classnames from "classnames";
import { Kind } from "../types";

export type RadioProps = {
  kind?: `${Kind}`;
  id?: string;
  name?: string;
  checked: boolean;
  label?: string;
  value: string;
  disabled?: boolean;
  vertical?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Radio({
  kind = Kind.Primary,
  id,
  name,
  onChange,
  checked,
  value,
  label,
  disabled = false,
  vertical = false,
}: RadioProps) {
  const inputClassName = classnames([
    "input-radio__input",
    `input-radio__input--${kind}`,
  ]);
  const wrapperClassName = classnames([
    "input-radio__wrapper",
    vertical && "input-radio__wrapper--vertical",
  ]);
  const labelClassName = classnames([
    "input-radio__label",
    disabled && "input-radio__label--disabled",
  ]);
  return (
    <label className={wrapperClassName}>
      <input
        id={id}
        type="radio"
        name={name}
        className={inputClassName}
        onChange={onChange}
        checked={checked}
        value={value}
        disabled={disabled}
      />
      <span className={labelClassName}>{label}</span>
    </label>
  );
}

export default React.memo(Radio);
