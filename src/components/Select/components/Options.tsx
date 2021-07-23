import React from "react";
import classnames from "classnames";
import { getIconSizeByComponentSize } from "utils/size";
import Icon from "components/Icon";
import Overlay from "components/Overlay";
import ScrollBox from "components/ScrollBox";
import type { InputSize, OptionValue } from "../../../types";
import InfoSmall from "../../../resources/icons/info-small.svg";
import CloseSmall from "../../../resources/icons/close-small.svg";
import "./Options.scss";

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/tabindex-no-positive */

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
    <Overlay
      className="rc-select__options"
      reverseClassName="rc-select__options--reverse"
      applyLeft={false}
      applyRight={false}
      withinHeight={false}
      withinWidth
      ref={optionsRef}
    >
      <ScrollBox
        style={{ maxHeight: "220px" }}
        handleStyle={{ borderRadius: "3px" }}
        trackStyle={{
          top: "2px",
          bottom: "2px",
          right: "4px",
          width: "5px",
        }}
      >
        {clearOption}
        {optionItems}
      </ScrollBox>
    </Overlay>
  );
}

export default Options;
