import React, { PureComponent } from "react";
import classnames from "classnames";
import "./Options.scss";
import Icon from "../Icon";
import { InputSize } from "../types";
import { getIconSizeByComponentSize } from "../shared";
import InfoSmall from "../../assets/icons/info-small.svg";
import CloseSmall from "../../assets/icons/close-small.svg";
// import ScrollBox from '../ScrollBox';
// import Tooltip from '../Tooltip';

export type OptionValue = string | number | boolean;
type OptionLabel = string | number;

export type Option = {
  value: OptionValue;
  label: OptionLabel;
  icon?: string;
  disabled?: boolean;
};

interface OptionProps {
  size: `${InputSize}`;
  highlighted?: boolean;
  selected?: boolean;
  disabled?: boolean;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  label: OptionLabel;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function OptionItem({
  size,
  label,
  icon,
  selected = false,
  disabled = false,
  highlighted = false,
  onClick,
}: OptionProps) {
  const optionsClassNames = classnames([
    "input-select__options-item",
    size === InputSize.Small && "input-select__options-item--small",
    size === InputSize.Medium && "input-select__options-item--medium",
    size === InputSize.Large && "input-select__options-item--large",
    selected && "input-select__options-item--selected",
    disabled && "input-select__options-item--disabled",
    highlighted && "input-select__options-item--highlighted",
  ]);
  return (
    <div className={optionsClassNames} onClick={onClick} role="presentation">
      {icon && (
        <Icon
          className="input-select__options-item__icon"
          icon={icon}
          size={getIconSizeByComponentSize(size)}
        />
      )}
      <div className="input-select__options-item__label">{label}</div>
    </div>
  );
}

interface OptionsProps {
  options: Option[];
  highlighted?: OptionValue;
  selected?: OptionValue;
  size: `${InputSize}`;
  clearable?: boolean;
  maxHeight?: number;
  reverse?: boolean;
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
  maxHeight,
  reverse,
  onSelect,
  onClear,
  optionsRef,
}: OptionsProps) {
  const className = classnames([
    "input-select__options-wrapper",
    reverse && "input-select__options-wrapper--reverse",
    !reverse && "input-select__options-wrapper--regular",
    size === InputSize.Small &&
      reverse &&
      "input-select__options-wrapper--reverse-small",
    size === InputSize.Small &&
      !reverse &&
      "input-select__options-wrapper--regular-small",
    size === InputSize.Medium &&
      reverse &&
      "input-select__options-wrapper--reverse-medium",
    size === InputSize.Medium &&
      !reverse &&
      "input-select__options-wrapper--regular-medium",
    size === InputSize.Large &&
      reverse &&
      "input-select__options-wrapper--reverse-large",
    size === InputSize.Large &&
      !reverse &&
      "input-select__options-wrapper--regular-large",
  ]);

  let clearOption = null;
  if (clearable && selected !== undefined) {
    clearOption = (
      <OptionItem
        onClick={onClear}
        size={size}
        label="Clear"
        icon={<CloseSmall />}
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
      <div className="input-select__options-item--no-options__box">
        <Icon
          icon={<InfoSmall fill="#999" />}
          size={getIconSizeByComponentSize(size)}
        />
        <div className="input-select__options-item--no-options__message">
          No options available
        </div>
      </div>
    );
  }
  return (
    <div className="input-select__options" ref={optionsRef}>
      <div
        className={className}
        style={{ maxHeight: "100px", overflow: "auto" }}
      >
        {/* <ScrollBox
          style={{ maxHeight }}
          handleStyle={{ borderRadius: "3px" }}
          trackStyle={{
            top: "2px",
            bottom: "2px",
            right: "4px",
            width: "5px",
          }}
          showTrack={false}
        > */}
        {clearOption}
        {optionItems}
        {/* </ScrollBox> */}
      </div>
    </div>
  );
}

// const ClearOption = ({ onClick, size }) => {
//   const clearOptionClassName = classnames([
//     "input-select__options-item",
//     size === "s" && "input-select__options-item--small",
//     size === "m" && "input-select__options-item--medium",
//     size === "l" && "input-select__options-item--large",
//     "input-select__options-item--clear",
//   ]);
//   const clearOptionIconClassName = classnames([
//     "input-select__options-item__icon",
//     "input-select__options-item__icon--clear",
//   ]);
//   const clearOptionLabelClassName = classnames([
//     "input-select__options-item__label",
//     "input-select__options-item__label--clear",
//   ]);
//   return (
//     <div
//       className={clearOptionClassName}
//       onClick={onClick}
//       tabIndex="1"
//       role="presentation"
//       label="Clear"
//     >
//       <Icon
//         className={clearOptionIconClassName}
//         name="close-small"
//         size={iconSizes[size]}
//       />
//       <div className={clearOptionLabelClassName}>
//         <Tooltip>Clear</Tooltip>
//       </div>
//     </div>
//   );
// };

export default Options;
