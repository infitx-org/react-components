import React, { ChangeEvent } from "react";
import classnames from "classnames";
import Radio, { RadioProps } from "./Radio";
import "./RadioGroup.scss";

type Option = Pick<RadioProps, "label" | "value" | "disabled">;

interface RadioGroupProps {
  id?: string;
  name: string;
  label: string;
  selected?: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  options: Option[];
}

function RadioGroup({
  id,
  name,
  label,
  disabled,
  selected,
  options,
  onChange,
}: RadioGroupProps) {
  const classNames = classnames([
    "mb-input",
    "input-radio",
    disabled && "disabled",
  ]);
  return (
    <div className={classNames} id={id}>
      {label && <span>{label}</span>}
      {options.map((option: Option, index: number) => (
        <Radio
          key={index.toString()}
          id={`${name}-${index}`}
          onChange={onChange}
          name={name}
          checked={selected === option.value}
          label={option.label}
          value={option.value}
          disabled={option.disabled || disabled}
        />
      ))}
    </div>
  );
}

export default React.memo(RadioGroup);
