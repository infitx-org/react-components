import React from "react";
import classnames from "classnames";
import Field, { Loader, Placeholder, InvalidIcon } from "components/Field";
import { WithValidationProps, WithLabelProps } from "../../hocs";
import { BaseInput } from "../shared/types";
import { Kind, InputSize, KeyCode } from "../../types";
import "./NumberField.scss";

export interface BaseNumberFieldProps extends BaseInput {
  kind?: `${Kind}`;
  size?: `${InputSize}`;
  className?: string;
  placeholder?: string;
  value?: number;
  step?: string;
  required?: boolean;
  invalid?: boolean;
  pending?: boolean;
  onChange?: (value?: number) => void;
}

export type NumberFieldProps = BaseNumberFieldProps &
  Partial<WithValidationProps> &
  WithLabelProps;

export default React.forwardRef(function NumberField(
  {
    kind = Kind.Primary,
    size = InputSize.Large,
    className,
    placeholder,
    value = undefined,
    step,
    required,
    invalid,
    pending,
    onChange,
    // From hocs
    label,
    validation,
    ...props
  }: NumberFieldProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
): JSX.Element {
  function validNumber(num?: number | string): number | "" {
    return Number(num) || "";
  }
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [currentValue, setValue] = React.useState<number | "">(
    validNumber(value)
  );
  const [focused, setFocused] = React.useState(false);

  React.useEffect(() => {
    setValue(validNumber(value));
  }, [value]);

  function enter() {
    setFocused(true);
  }

  function leave() {
    setFocused(false);
  }

  async function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(validNumber(e.target.value));
    onChange?.(Number(e.target.value) || undefined);
  }

  function onFocus(e: React.FocusEvent<HTMLInputElement>) {
    if (!focused) {
      props.onFocus?.(e);
      enter();
    }
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (!focused) {
      props.onBlur?.(e);
    }
  }

  function onFieldClick(): void {
    if (!focused) {
      enter();
    }
    inputRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const { keyCode } = e;

    if (keyCode === KeyCode.Period) {
      e.preventDefault();
      return;
    }
    if (keyCode === KeyCode.Tab) {
      leave();
    }
  }

  const textFieldClassName = classnames([
    "rc-numberfield",
    `rc-numberfield--${size}`,
  ]);

  return (
    <Field
      className={className}
      kind={kind}
      size={size}
      required={required}
      invalid={invalid}
      disabled={props.disabled}
      focused={focused}
      onClick={onFieldClick}
      onClickOutside={leave}
      ref={forwardedRef}
      label={label}
      hasEmptyValue={currentValue === ""}
      validation={validation}
    >
      {placeholder && (
        <Placeholder
          label={placeholder}
          active={currentValue !== "" || focused}
          size={size}
        />
      )}
      <input
        {...props}
        step={step}
        value={currentValue}
        className={textFieldClassName}
        type="number"
        ref={inputRef}
        onChange={onValueChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
      {pending && <Loader size={size} />}
      {invalid && <InvalidIcon size={size} />}
    </Field>
  );
});
