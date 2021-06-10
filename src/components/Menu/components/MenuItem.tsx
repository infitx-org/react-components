import classnames from "classnames";
import Icon from "components/Icon";
import Arrow from "../../../assets/icons/arrow.svg";
import { getPathMatches, MenuContext, MenuItemProps } from '../shared';
import "./MenuItem.scss";

export default function MenuItem({
  label,
  icon,
  fill,
  size = 14,
  to,
  path,
  disabled,
  hidden,
  active,
  back,
  partial,
}: MenuItemProps) {
  if (hidden) {
    return null;
  }
  let backIcon = null;
  if (back) {
    backIcon = (
      <Icon
        className="rc-menu__item__back-icon"
        icon={<Arrow />}
        size={10}
        fill="#999"
      />
    );
  }
  let itemIcon = null;

  if (icon) {
    itemIcon = (
      <div className="rc-menu__item__item-icon">
        <Icon
          className="rc-menu__item__icon"
          icon={<Arrow />}
          size={size}
          fill={fill}
        />
      </div>
    );
  }

  return (
    <MenuContext.Consumer>
      {({ pathname, onClick }) => {
        function doOnClick() {
          if (!disabled) {
            onClick(to || path);
          }
        }
        const isActive =
          active || (getPathMatches(pathname, path, partial) && !back);
        const className = classnames([
          "rc-menu__item",
          isActive && "rc-menu__item--active",
          disabled && "rc-menu__item--disabled",
          back && "rc-menu__item--back",
          icon && "rc-menu__item--with-icon",
        ]);
        return (
          <div className={className} onClick={doOnClick} role="presentation">
            {backIcon}
            {itemIcon}
            {label}
          </div>
        );
      }}
    </MenuContext.Consumer>
  );
}
