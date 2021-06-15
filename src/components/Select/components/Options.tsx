import React from "react";
import classnames from "classnames";
import useOverlayPosition from "hooks/useOverlayPosition";
import { getIconSizeByComponentSize } from "utils/size";
import mergeRefs from "utils/mergeRefs";
import Icon from "components/Icon";
import { InputSize } from "../../../types";
import InfoSmall from "../../../resources/icons/info-small.svg";
import CloseSmall from "../../../resources/icons/close-small.svg";
import "./Options.scss";

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/tabindex-no-positive */

export type OptionValue = string | number | boolean;
type OptionLabel = string | number;

export type Option = {
  value: OptionValue;
  label: OptionLabel;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
};

interface OptionProps {
  className?: string;
  size: `${InputSize}`;
  highlighted?: boolean;
  selected?: boolean;
  disabled?: boolean;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  label: OptionLabel;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function OptionItem({
  className,
  size,
  label,
  icon,
  selected = false,
  disabled = false,
  highlighted = false,
  onClick,
}: OptionProps) {
  const optionsClassNames = classnames([
    "rc-select__option",
    size === InputSize.Small && "rc-select__option--small",
    size === InputSize.Medium && "rc-select__option--medium",
    size === InputSize.Large && "rc-select__option--large",
    selected && "rc-select__option--selected",
    disabled && "rc-select__option--disabled",
    highlighted && "rc-select__option--highlighted",
    className,
  ]);
  return (
    <div
      className={optionsClassNames}
      onClick={onClick}
      role="presentation"
      tabIndex={1}
    >
      {icon && (
        <Icon
          className="rc-select__option__icon"
          icon={icon}
          size={getIconSizeByComponentSize(size)}
        />
      )}
      <div className="rc-select__option__label">{label}</div>
    </div>
  );
}

interface OptionsProps {
  options: Option[];
  highlighted?: OptionValue;
  selected?: OptionValue;
  size: `${InputSize}`;
  clearable?: boolean;
  onSelect: (option: Option) => void;
  onClear: () => void;
  optionsRef?: React.RefObject<HTMLDivElement>;
}

function Options({
  options,
  highlighted,
  selected,
  size,
  clearable,
  onSelect,
  onClear,
  optionsRef,
}: OptionsProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { top, bottom, height, reverse } = useOverlayPosition<HTMLDivElement>(
    ref.current
  );

  const className = classnames([
    "rc-select__options",
    reverse && "rc-select__options--reverse",
  ]);

  const maxHeight = Math.min(220, parseInt(height || "", 10) || 220);

  let clearOption = null;
  if (clearable && selected !== undefined) {
    clearOption = (
      <OptionItem
        onClick={onClear}
        size={size}
        label="Clear"
        icon={<CloseSmall fill="#c33" />}
        className="rc-select__option--clear"
      />
    );
  }

  let optionItems = null;
  if (options.length > 0) {
    optionItems = options.map((item, index) => (
      <OptionItem
        size={size}
        highlighted={item.value === highlighted}
        label={item.label}
        icon={item.icon}
        disabled={item.disabled === true}
        key={index.toString()}
        selected={selected === item.value}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onSelect(item);
        }}
      />
    ));
  } else {
    optionItems = (
      <div className="rc-select__option--no-options__box">
        <Icon
          icon={<InfoSmall fill="#999" />}
          size={getIconSizeByComponentSize(size)}
        />
        <div className="rc-select__option--no-options__message">
          No options available
        </div>
      </div>
    );
  }
  return (
    <div
      className={className}
      ref={mergeRefs(ref, optionsRef)}
      style={{ top, bottom, maxHeight }}
    >
      {clearOption}
      {optionItems}
    </div>
  );
}

export default Options;
