import React from "react";
import find from "lodash/find";
import findIndex from "lodash/findIndex";
import classnames from "classnames";
import { InputSize } from "types";
import { KeyCodes } from "utils/keyCodes";
import mergeRefs from "utils/mergeRefs";
import Field, { Loader, Placeholder } from "../Field";
import Indicator from "./components/Indicator";
import Options, { Option, OptionValue } from "./components/Options";
import Filter from "./components/Filter";
import "./Select.scss";

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLInputElement>, "size" | "value"> {
  size?: `${InputSize}`;
  value?: OptionValue;
  className?: string;
  placeholder?: string;
  required?: boolean;
  pending?: boolean;
  options: Option[];
  onClear?: () => void;
}

export default React.forwardRef(function Select(
  {
    size = InputSize.Large,
    value,
    className,
    placeholder,
    required,
    pending,
    options = [],
    onClear,
    ...props
  }: SelectProps,
  ref: React.ForwardedRef<HTMLInputElement>
): JSX.Element {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const optionsRef = React.useRef<HTMLDivElement>(null);
  const [selectedValue, setSelected] = React.useState<OptionValue | undefined>(
    value
  );
  const [highlighted, setHighlighted] = React.useState<
    OptionValue | undefined
  >();
  const [open, setOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [filter, setFilter] = React.useState<string | undefined>(undefined);

  function enter() {
    setFocused(true);
    setOpen(true);
    setFilter(undefined);
    inputRef.current?.focus();
  }

  function leave() {
    setFocused(false);
    setOpen(false);
    setFilter(undefined);
  }

  function onSelect(newValue: OptionValue) {
    setSelected(newValue);
    setFilter(undefined);
    setOpen(false);
    inputRef.current?.focus();
  }

  function onFocus(e: React.FocusEvent<HTMLInputElement>) {
    if (!focused) {
      enter();
      props.onFocus?.(e);
    }
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (!focused) {
      props.onBlur?.(e);
    }
  }

  function onClearClick() {
    setSelected(undefined);
    onClear?.();
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

  function hasFilter(filterValue: string | undefined): boolean {
    return filterValue !== undefined && filterValue !== "";
  }

  function getOptions() {
    if (filter === undefined || filter === "") {
      return options;
    }
    const lowerCaseFilter = filter.toLowerCase();
    return options.filter((option: Option) =>
      option.label.toString().toLowerCase().includes(lowerCaseFilter)
    );
  }

  function scrollToOption(optionValue: OptionValue) {
    const filteredOptions = getOptions();
    const index = findIndex(filteredOptions, { value: optionValue });
    const optionDivs = document.querySelectorAll(".rc-select__options-item");
    const nextOption = optionDivs[index];

    if (nextOption) {
      (nextOption as HTMLDivElement).focus();
    }
    inputRef.current?.focus();
  }

  function highlightNextOption(next: boolean = true) {
    const filteredOptions = getOptions();
    const filteredOptionsLength = filteredOptions.length;
    const referenceValue = highlighted || selectedValue;
    let currentIndex = findIndex(filteredOptions, { value: referenceValue });

    function getNextEnabledOption(): OptionValue | undefined {
      let nextIndex = (currentIndex + (next ? 1 : -1)) % filteredOptionsLength;
      if (nextIndex < 0) {
        nextIndex = filteredOptions.length - 1;
      }
      currentIndex = nextIndex;
      const nextOption = filteredOptions[nextIndex];

      if (nextOption?.disabled) {
        return;
      }
      // eslint-disable-next-line
      return nextOption?.value;
    }

    let highlightedValue;
    let tries = filteredOptionsLength;
    while (!highlightedValue && tries >= 0) {
      highlightedValue = getNextEnabledOption();
      tries -= 1;
    }

    if (highlightedValue) {
      scrollToOption(highlightedValue);
    }
    setHighlighted(highlightedValue);
  }

  function handleArrows(e: React.KeyboardEvent<HTMLInputElement>) {
    const { keyCode } = e;

    if (keyCode === KeyCodes.Tab) {
      leave();
      return;
    }
    if (keyCode === KeyCodes.Up || keyCode === KeyCodes.Down) {
      e.preventDefault();
      highlightNextOption(keyCode === KeyCodes.Down);
      return;
    }
    if (keyCode === KeyCodes.Return) {
      e.preventDefault();
      if (open) {
        if (highlighted) {
          onSelect(highlighted);
        }
      } else {
        setOpen(true);
      }
    }
  }

  const filteredOptions = getOptions();
  const selectedItem = find(filteredOptions, { value: selectedValue });
  const selectedLabel = selectedItem?.label;

  const selectClassName = classnames([
    "rc-select",
    hasFilter(filter) && "rc-select--filtering",
  ]);

  return (
    <Field
      className={className}
      required={required && selectedValue === undefined}
      pending={pending}
      disabled={props.disabled}
      focused={focused}
      onClick={onFieldClick}
      onClickOutside={leave}
    >
      {placeholder && (
        <Placeholder
          label={placeholder}
          active={!!selectedLabel || focused}
          size={size}
        />
      )}
      <input
        {...props}
        className={selectClassName}
        type="text"
        ref={mergeRefs(ref, inputRef)}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(e) => setFilter(e.target.value)}
        onKeyDown={handleArrows}
        value={filter !== undefined ? filter : selectedLabel || ""}
      />
      {filter !== undefined && <Filter size={size} />}
      {pending && <Loader size={size} />}
      <Indicator open={open} size={size} />
      {open && (
        <Options
          size={size}
          options={filteredOptions}
          selected={selectedValue}
          highlighted={highlighted}
          clearable={onClear !== undefined}
          onClear={onClearClick}
          onSelect={(option: Option) => onSelect(option.value)}
          optionsRef={optionsRef}
        />
      )}
    </Field>
  );
});
