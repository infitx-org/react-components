import React, { ChangeEvent } from "react";
import classnames from "classnames";

export type RadioProps = {
  id: string;
  name: string;
  checked: boolean;
  label: string;
  value: string;
  disabled?: boolean;
  vertical?: boolean;
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
  vertical = false,
}: RadioProps) {
  const optionClassName = classnames(["input-radio__input"]);
  const wrapperClassName = classnames([
    "input-radio__wrapper",
    vertical && "input-radio__wrapper--vertical",
  ]);
  return (
    <div className={wrapperClassName}>
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
    </div>
  );
}

export default React.memo(Radio);
