import React from "react";
import classnames from "classnames";
import { Kind, InputSize, KeyCode } from "types";
import mergeRefs from "utils/mergeRefs";
import Field, { Loader, Placeholder, InvalidIcon } from "components/Field";
import "./TextField.scss";

export interface TextFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "onChange"
  > {
  kind?: `${Kind}`;
  size?: `${InputSize}`;
  className?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  invalid?: boolean;
  pending?: boolean;
  onChange?: (value: string) => void;
}

export default React.forwardRef(function TextField(
  {
    kind = Kind.Primary,
    size = InputSize.Large,
    className,
    placeholder,
    value = "",
    required,
    invalid,
    pending,
    onChange,
    ...props
  }: TextFieldProps,
  ref: React.ForwardedRef<HTMLInputElement>
): JSX.Element {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [currentValue, setValue] = React.useState<string | undefined>(value);
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
    setValue(e.target.value);
    onChange?.(e.target.value);
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
    if (e.target !== inputRef.current) {
      e.preventDefault();
      e.stopPropagation();
      if (open) {
        leave();
      } else {
        enter();
      }
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const { keyCode } = e;

    if (keyCode === KeyCode.Tab) {
      leave();
    }
  }

  const textFieldClassName = classnames([
    "rc-textfield",
    `rc-textfield--${size}`,
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
          active={currentValue !== "" || focused}
          size={size}
        />
      )}
      <input
        {...props}
        value={currentValue}
        className={textFieldClassName}
        type="text"
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
