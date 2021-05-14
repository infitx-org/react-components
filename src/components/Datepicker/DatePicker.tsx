import React from "react";
import classnames from "classnames";
import DayPicker from "react-day-picker";
import { format as dateFormat } from "date-fns";
import "react-day-picker/lib/style.css";
import { KeyCodes } from "../utils/keyCodes";
import mergeRefs from "../utils/mergeRefs";
import Field, { Loader } from "../Field";
import { InputSize } from "../types";
import "./DatePicker.scss";
import "./DayPicker.scss";

type DateValue = Date | undefined;

export interface DatePickerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: `${InputSize}`;
  format?: string;
  value?: string;
  required?: boolean;
  pending?: boolean;
  onSelect?: (date: DateValue) => void;
}

export default React.forwardRef(function DatePicker(
  {
    size = InputSize.Large,
    format = "MMM do yyyy, HH:mm:ss",
    value,
    required,
    pending,
    onSelect,
    ...props
  }: DatePickerProps,
  ref: React.ForwardedRef<HTMLInputElement>
): JSX.Element {
  function getDateFromString(date?: string): DateValue {
    return date ? new Date(date) : undefined;
  }

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selectedDate, setDate] = React.useState<DateValue>(
    getDateFromString(value)
  );
  const [open, setOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(false);

  React.useEffect(() => {
    setDate(getDateFromString(value));
  }, [value]);

  function getStringFromDate(date?: Date): string {
    if (date) {
      return dateFormat(date, format);
    }
    return "";
  }

  function enter() {
    setFocused(true);
    setOpen(true);
    inputRef.current?.focus();
  }

  function leave() {
    setFocused(false);
    setOpen(false);
  }

  function onDayClick(day: Date, { selected }: { selected?: boolean }) {
    const newDate = selected ? undefined : day;
    setDate(newDate);
    inputRef.current?.focus();
    onSelect?.(newDate);
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

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const { keyCode } = e;

    if (keyCode === KeyCodes.Tab) {
      leave();
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

  const inputClassName = classnames(["datepicker__input"]);

  const visibleValue = getStringFromDate(selectedDate);
  return (
    <Field
      required={required && selectedDate === undefined}
      pending={pending}
      disabled={props.disabled}
      focused={focused}
      onClick={onFieldClick}
      onClickOutside={leave}
    >
      <input
        {...props}
        className={inputClassName}
        type="text"
        ref={mergeRefs<HTMLInputElement>(ref, inputRef)}
        onChange={(e) => e.preventDefault()}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        value={visibleValue}
        readOnly
      />
      {pending && <Loader size={size} />}
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="datepicker__calendar"
          role="presentation"
        >
          <DayPicker selectedDays={selectedDate} onDayClick={onDayClick} />
        </div>
      )}
    </Field>
  );
});
