import React, { ChangeEvent } from "react";
import classnames from "classnames";

export type RadioProps = {
  id: string;
  name: string;
  checked: boolean;
  label: string;
  value: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Radio({
  id,
  name,
  onChange,
  checked,
  value,
  label,
  disabled = false,
}: RadioProps) {
  const optionClassName = classnames([
    "input-radio__option",
    "input-radio__input",
  ]);
  return (
    <>
      <input
        id={id}
        type="radio"
        name={name}
        className={optionClassName}
        onChange={onChange}
        checked={checked}
        value={value}
        disabled={disabled}
      />
      <label htmlFor={id}>
        <span>{label}</span>
      </label>
    </>
  );
}

export default React.memo(Radio);
