import React from "react";
import classnames from "classnames";
import Icon from "components/Icon";
import Arrow from "../../../assets/icons/arrow.svg";
import { MenuSectionProps, MenuItemElement } from "../shared";
import MenuItem from './MenuItem';
import "./MenuSection.scss";

export function isMenuItem(child: React.ReactNode): child is MenuItemElement {
  return (child as React.ReactElement).type === MenuItem;
}

export default function MenuSection({
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
      <div className="rc-menu-section__icon">
        <Icon icon={<Arrow />} size={size} fill={fill} />
      </div>
    );
  }

  let menuSectionLabel = null;
  if (label) {
    menuSectionLabel = (
      <div className="rc-menu-section__label">
        {itemIcon}
        {label}
      </div>
    );
  }

  const classNames = classnames([
    "rc-menu-section",
    disabled && "rc-menu-section--disabled",
  ]);

  return (
    <div className={classNames}>
      {menuSectionLabel}
      <div className="rc-menu-section__items">{menuItems}</div>
    </div>
  );
}
