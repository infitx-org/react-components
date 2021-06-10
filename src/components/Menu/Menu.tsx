// import '../../icons/mule/back-small.svg';
import React from "react";
import classnames from "classnames";
import Icon from "components/Icon";
import Arrow from "../../assets/icons/arrow.svg";
import "./Menu.scss";

interface MenuContextValue {
  pathname: string;
  onClick: (path: string) => void;
}
const MenuContext = React.createContext<MenuContextValue>({
  pathname: "",
  onClick: () => undefined,
});

function getPathMatches(
  pathname: string,
  path: string | undefined,
  partial: boolean | undefined
): boolean {
  if (!path) {
    return false;
  }
  if (partial && pathname.startsWith(path)) {
    return true;
  }
  if (path === pathname) {
    return true;
  }

  const pathChunks = path.split("/");
  const pathNameChunks = pathname.split("/");

  if (pathChunks.length !== pathNameChunks.length) {
    return false;
  }

  return pathNameChunks.every((chunk, index) => {
    const pathChunk = pathChunks[index];
    const isExact = pathChunk === chunk;
    const isWild = pathChunk !== undefined && pathChunk.startsWith(":");
    return isExact || isWild;
  });
}

interface MenuItemProps {
  label: string;
  active: boolean;
  path?: string;
  to?: string;
  disabled?: boolean;
  hidden?: boolean;
  back?: boolean;
  icon?: string;
  fill?: string;
  size?: number;
  // prop asRoot is not used directly by the MenuItem but it is used by the Menu component
  // eslint-disable-next-line react/no-unused-prop-types
  asRoot?: boolean;
  // prop partial is not used directly by the MenuItem but it is used by the Menu component
  // eslint-disable-next-line react/no-unused-prop-types
  partial?: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  children?: MenuElement[];
}

function MenuItem({
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

interface MenuSectionProps {
  label: string;
  hidden?: boolean;
  icon?: string;
  fill?: string;
  size?: number;
  disabled?: boolean;
  children: MenuItemElement[];
}

const MenuSection = ({
  label,
  hidden,
  disabled = false,
  icon,
  size = 14,
  fill = "#7C7C7C",
  children,
}: MenuSectionProps) => {
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

interface MenuItemsGroupProps {
  children: React.ReactNode;
}

function MenuItemsGroup({ children }: MenuItemsGroupProps) {
  return <div className="rc-menu__section-items">{children}</div>;
}

type MenuItemElement = React.ReactElement<MenuItemProps>;
type MenuSectionElement = React.ReactElement<MenuSectionProps>;
type MenuElement = MenuItemElement | MenuSectionElement;

function isMenuItem(child: React.ReactNode): child is MenuItemElement {
  return (child as React.ReactElement).type === MenuItem;
}

function isMenuSection(child: React.ReactNode): child is MenuSectionElement {
  return (child as React.ReactElement).type === MenuSection;
}

function wrapItemsInSections(items: MenuElement[]) {
  const groupedMenuItems: unknown[] = [];
  let currentGroup: unknown[] = [];
  const addCurrenntGroupToGroupedItems = () => {
    if (currentGroup.length) {
      groupedMenuItems.push(<MenuItemsGroup>{currentGroup}</MenuItemsGroup>);
      currentGroup = [];
    }
  };

  items.forEach((node) => {
    if (isMenuSection(node) || node.props.back) {
      addCurrenntGroupToGroupedItems();
      groupedMenuItems.push(node);
    } else {
      currentGroup.push(node);
    }
  });

  addCurrenntGroupToGroupedItems();
  return groupedMenuItems.map((i, c) =>
    React.cloneElement(i, { ...i.props, key: c.toString() })
  );
}

function flattenMenuSections(items: MenuElement[]): MenuElement[] {
  // It flattens nested MenuSection, MenuItem components into a one-level array
  return React.Children.toArray(items).reduce(
    (prevItems, currentItem) => [
      ...prevItems,
      ...(isMenuSection(currentItem)
        ? flattenMenuSections(currentItem.props.children)
        : [currentItem]),
    ],
    [] as MenuElement[]
  );
}

interface MenuProps {
  path: string;
  pathname: string;
  children: MenuElement[];
  onChange: (p: string) => void;
}

function Menu({ path, pathname, onChange, children }: MenuProps) {
  function getActiveNode(
    parentNode?: MenuItemElement
  ): MenuItemElement | undefined {
    let activeNode: MenuElement | undefined;

    const nodePath = parentNode?.props.path || path;
    const nodePartial = parentNode?.props.partial || false;
    const nodeChildren = parentNode?.props.children || children;

    // render Menu when pathname matches path
    if (getPathMatches(pathname, nodePath, nodePartial)) {
      return undefined;
    }
    // Default to Menu when going manual - no route matching
    if (!parentNode && pathname === undefined) {
      activeNode = undefined;
    }

    // Flatten MenuSections in order not to have nested children when detecting active menu
    const nodes = flattenMenuSections(nodeChildren);

    nodes.some((node) => {
      // find the first matching menu item and return the parent or the item itself
      // depending if needs to be treated like a root
      if (isMenuItem(node)) {
        const { asRoot, partial, active } = node.props;
        const pathMatches = getPathMatches(pathname, node.props.path, partial);
        // console.log('is menu', node.props.label, pathMatches, active, parentNode)
        if (pathMatches || active) {
          // asRoot prop is meant to be used when menu has child elements
          // and we do not want to render the parent node but the child nodes
          activeNode = asRoot ? node : parentNode;
        } else if (node.props.children !== undefined) {
          activeNode = getActiveNode(node);
        }
      }
      return !!activeNode;
    });

    return activeNode;
  }

  let menuComponents = null;
  const activeNode = getActiveNode();
  const subChildren = activeNode?.props?.children || children;

  if (subChildren !== null) {
    menuComponents = wrapItemsInSections(
      React.Children.toArray(subChildren).filter(
        (element) => isMenuItem(element) || isMenuSection(element)
      )
    );
  }
  return (
    <MenuContext.Provider value={{ pathname, onClick: onChange }}>
      <div className="mb-element rc-menu">{menuComponents}</div>;
    </MenuContext.Provider>
  );
}

Menu.Item = MenuItem;
Menu.Section = MenuSection;

export default Menu;
