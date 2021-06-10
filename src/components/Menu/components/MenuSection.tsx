import React from "react";
import classnames from "classnames";
import Icon from "components/Icon";
import Arrow from "../../../assets/icons/arrow.svg";
import { MenuSectionProps, isMenuItem } from '../shared';
import "./MenuSection.scss";

export default function MenuSection ({
  label,
  hidden,
  disabled = false,
  icon,
  size = 14,
  fill = "#7C7C7C",
  children,
}: MenuSectionProps) {
  if (hidden) {
    return null;
  }
  const menuItems = React.Children.toArray(children).filter(isMenuItem);

  let itemIcon = null;
  if (icon) {
    itemIcon = (
      <div className="rc-menu__section-icon">
        <Icon icon={<Arrow />} size={size} fill={fill} />
      </div>
    );
  }

  let menuSectionLabel = null;
  if (label) {
    menuSectionLabel = (
      <div className="rc-menu__section-label">
        {itemIcon}
        {label}
      </div>
    );
  }

  const classNames = classnames([
    "rc-menu__section",
    disabled && "rc-menu__section--disabled",
  ]);

  return (
    <div className={classNames}>
      {menuSectionLabel}
      <div className="rc-menu__section-items">{menuItems}</div>
    </div>
  );
};
