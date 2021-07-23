import React, { ChangeEvent } from "react";
import classnames from "classnames";
import { Kind, OptionValue } from "../../types";

export type RadioProps = {
  kind?: `${Kind}`;
  id?: string;
  name?: string;
  checked: boolean;
  label?: string;
  value: OptionValue;
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
    "rc-radio__input",
    `rc-radio__input--${kind}`,
  ]);
  const wrapperClassName = classnames([
    "rc-radio__wrapper",
    vertical && "rc-radio__wrapper--vertical",
  ]);
  const labelClassName = classnames([
    "rc-radio__label",
    disabled && "rc-radio__label--disabled",
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
        value={value.toString()}
        disabled={disabled}
      />
      <span className={labelClassName}>{label}</span>
    </label>
  );
}

export default React.memo(Radio);
