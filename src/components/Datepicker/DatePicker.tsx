import React from "react";
import classnames from "classnames";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { KeyCodes } from "../utils/keyCodes";
import mergeRefs from "../utils/mergeRefs";
import Field from "../Field";
import Loader from "../Field/Loader";
import { InputSize } from "../types";
import "./DatePicker.scss";
import "./DayPicker.scss";

type DateValue = string;

export interface DatePickerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: DateValue;
  size?: `${InputSize}`;
  required?: boolean;
  pending?: boolean;
}

export default React.forwardRef(function DatePicker(
  {
    size = InputSize.Large,
    value,
    required,
    pending,
    ...props
  }: DatePickerProps,
  ref: React.ForwardedRef<HTMLInputElement>
): JSX.Element {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selectedValue, setSelected] = React.useState<DateValue | undefined>(
    value
  );
  const [open, setOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(false);

  function enter() {
    setFocused(true);
    setOpen(true);
    inputRef.current?.focus();
  }

  function leave() {
    setFocused(false);
    setOpen(false);
    inputRef.current?.blur();
  }

  function onDayClick(
    day: string,
    { selected }: { selected: string | undefined }
  ) {
    setSelected(day === selected ? undefined : day);
    inputRef.current?.focus();
  }

  function onFocus(e: React.FocusEvent<HTMLInputElement>) {
    if (!open) {
      props.onFocus?.(e);
      enter();
    }
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (!open) {
      props.onBlur?.(e);
    }
  }

  function onFieldClick(e: React.MouseEvent<HTMLDivElement>): void {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === inputRef.current) {
      return;
    }
    if (open) {
      leave();
    } else {
      enter();
    }
  }

  function handleArrows(e: React.KeyboardEvent<HTMLInputElement>) {
    const { keyCode } = e;

    if (keyCode === KeyCodes.Tab) {
      leave();
      return;
    }
    if (keyCode === KeyCodes.Up || keyCode === KeyCodes.Down) {
      e.preventDefault();
      // highlightNextOption(keyCode === KeyCodes.Down);
      return;
    }
    if (keyCode === KeyCodes.Return) {
      e.preventDefault();
      if (open) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    }
  }

  const selectClassName = classnames(["datepicker__input"]);

  return (
    <Field
      required={required && selectedValue === undefined}
      pending={pending}
      disabled={props.disabled}
      focused={focused}
      onClick={onFieldClick}
      onClickOutside={leave}
    >
      <input
        {...props}
        className={selectClassName}
        type="text"
        ref={mergeRefs(ref, inputRef)}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleArrows}
        value={selectedValue}
      />
      {pending && <Loader size={size} />}
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="datepicker__calendar"
          role="presentation"
        >
          <DayPicker selectedDays={selectedValue} onDayClick={onDayClick} />
        </div>
      )}
    </Field>
  );
});
