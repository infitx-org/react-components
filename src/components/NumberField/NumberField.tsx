import React from "react";
import classnames from "classnames";
import { Kind, InputSize, KeyCode } from "types";
import mergeRefs from "utils/mergeRefs";
import Field, { Loader, Placeholder, InvalidIcon } from "components/Field";
import "./NumberField.scss";

type BaseInput = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "type"
>;

export interface NumberFieldProps extends BaseInput {
  kind?: `${Kind}`;
  size?: `${InputSize}`;
  className?: string;
  placeholder?: string;
  value?: number;
  required?: boolean;
  invalid?: boolean;
  pending?: boolean;
  onChange?: (value?: number) => void;
}

export default React.forwardRef(function NumberField(
  {
    kind = Kind.Primary,
    size = InputSize.Large,
    className,
    placeholder,
    value = undefined,
    required,
    invalid,
    pending,
    onChange,
    ...props
  }: NumberFieldProps,
  ref: React.ForwardedRef<HTMLInputElement>
): JSX.Element {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [currentValue, setValue] = React.useState<number | "">(value || "");
  const [open, setOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(false);

  React.useEffect(() => {
    setValue(value || "");
  }, [value]);

  function enter() {
    setFocused(true);
    setOpen(true);
    inputRef.current?.focus();
  }

  function leave() {
    setFocused(false);
    setOpen(false);
  }

  async function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(Number(e.target.value) || "");
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

  function onFieldClick(e: React.MouseEvent<HTMLDivElement>): void {
    if (!open) {
      enter();
    }
    inputRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const { keyCode } = e;

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
      required={required && currentValue === ""}
      invalid={invalid}
      disabled={props.disabled}
      focused={focused}
      onClick={onFieldClick}
      onClickOutside={leave}
    >
      {placeholder && (
        <Placeholder
          label={placeholder}
          active={currentValue !== undefined || focused}
          size={size}
        />
      )}
      <input
        {...props}
        value={currentValue}
        className={textFieldClassName}
        type="number"
        ref={mergeRefs<HTMLInputElement>(ref, inputRef)}
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
