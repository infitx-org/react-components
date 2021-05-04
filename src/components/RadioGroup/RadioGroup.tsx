import React, { ChangeEvent } from "react";
import classnames from "classnames";
import Radio, { RadioProps } from "./Radio";
import "./RadioGroup.scss";

type Option = Pick<RadioProps, "label" | "value" | "disabled">;

export interface RadioGroupProps {
  id?: string;
  name: string;
  label: string;
  selected?: string;
  disabled?: boolean;
  options: Option[];
  vertical?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function RadioGroup({
  id,
  name,
  label,
  disabled,
  selected,
  options,
  vertical,
  onChange,
}: RadioGroupProps) {
  const [selectedOption, setSelected] = React.useState(selected);
  React.useEffect(() => {
    setSelected(selected);
  }, [selected]);
  const compositeOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
    onChange?.(e);
  };
  const classNames = classnames([
    "mb-input",
    "input-radiogroup",
    vertical && "input-radiogroup--vertical",
  ]);
  return (
    <div className={classNames} id={id}>
      {label && <span className="input-radiogroup__label">{label}</span>}
      <div className="input-radiogroup__inputs">
        {options.map((option: Option, index: number) => (
          <Radio
            key={index.toString()}
            id={`${id}-${index}`}
            onChange={compositeOnChange}
            name={name}
            checked={selectedOption === option.value}
            label={option.label}
            value={option.value}
            disabled={option.disabled || disabled}
            vertical={vertical}
          />
        ))}
      </div>
    </div>
  );
}

export default React.memo(RadioGroup);
