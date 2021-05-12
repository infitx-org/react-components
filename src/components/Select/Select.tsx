import React from "react";
import "./Select.scss";
import find from "lodash/find";
import findIndex from "lodash/findIndex";
import classnames from "classnames";
import Field from "../Field";
import Indicator from "./Indicator";
import Options, { Option, OptionValue } from "./Options";
import mergeRefs from "../utils/mergeRefs";
import Filter from "./Filter";
import Loader from "../Field/Loader";
import { InputSize } from "../types";
import { KeyCodes } from "../utils/keyCodes";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLInputElement> {
  selected?: OptionValue;
  size?: `${InputSize}`;
  required?: boolean;
  pending?: boolean;
  options: Option[];
  onClear?: () => void;
}

export default React.forwardRef(function Select(
  {
    size = InputSize.Large,
    selected,
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
    selected
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
    inputRef.current?.blur();
  }

  function onSelect(value: OptionValue) {
    setSelected(value);
    setFilter(undefined);
    setOpen(false);
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

  function getOptions() {
    if (filter === undefined || filter === "") {
      return options;
    }
    const lowerCaseFilter = filter.toLowerCase();
    return options.filter((option: Option) =>
      option.label.toString().toLowerCase().includes(lowerCaseFilter)
    );
  }

  function scrollToOption(value: OptionValue) {
    const filteredOptions = getOptions();
    const index = findIndex(filteredOptions, { value });
    const optionDivs = document.querySelectorAll(".input-select__options-item");
    const nextOption = optionDivs[index];

    if (nextOption) {
      (nextOption as HTMLDivElement).focus();
    }
    inputRef.current?.focus();
  }

  function highlightNextOption(next: boolean = true) {
    const filteredOptions = getOptions();
    const referenceValue = highlighted || selectedValue;
    let currentIndex = findIndex(filteredOptions, { value: referenceValue });

    const getNextEnabledOption = () => {
      let nextIndex = (currentIndex + (next ? 1 : -1)) % filteredOptions.length;
      if (nextIndex < 0) {
        nextIndex = filteredOptions.length - 1;
      }
      currentIndex = nextIndex;
      const nextOption = filteredOptions[nextIndex];

      if (nextOption.disabled) {
        return null;
      }
      return nextOption;
    };

    let nextHighlightedOption = null;
    while (nextHighlightedOption === null) {
      nextHighlightedOption = getNextEnabledOption();
    }

    scrollToOption(nextHighlightedOption.value);
    setHighlighted(nextHighlightedOption.value);
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
    "select__input",
    filter !== undefined && "select__input--filtering",
  ]);

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
