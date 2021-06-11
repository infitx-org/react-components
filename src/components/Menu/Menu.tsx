import React from "react";
import MenuItem from "./components/MenuItem";
import MenuSection from "./components/MenuSection";
import { isActivePath, MenuContext } from "./shared";
import { MenuElement, MenuItemElement, MenuSectionElement } from "./types";
import "./Menu.scss";

export function isMenuItem(child: React.ReactNode): child is MenuItemElement {
  return (child as React.ReactElement).type === MenuItem;
}

export function isMenuSection(
  child: React.ReactNode
): child is MenuSectionElement {
  return (child as React.ReactElement).type === MenuSection;
}

function stripMenuSections(
  items: MenuItemElement | MenuElement[]
): MenuElement[] {
  const inArray = React.Children.toArray(items) as MenuElement[];
  // It flattens nested MenuSection, MenuItem components into a one-level array
  return inArray.reduce(
    (prevItems, currentItem) => [
      ...prevItems,
      ...(isMenuSection(currentItem)
        ? stripMenuSections(currentItem.props.children)
        : [currentItem]),
    ],
    [] as MenuElement[]
  );
}

export interface MenuProps {
  path: string;
  pathname: string;
  children: MenuItemElement | MenuElement[];
  onChange: (p: string) => void;
}

function Menu({ path, pathname, onChange, children }: MenuProps) {
  function getRootMenuItem(
    parentNode?: MenuItemElement
  ): MenuItemElement | undefined {
    let activeNode: MenuItemElement | undefined;

    const nodePath = parentNode?.props.path || path;
    const nodePartial = parentNode?.props.partial || false;
    const nodeChildren = parentNode?.props.children || children;

    // render Menu when pathname matches path
    if (isActivePath(pathname, nodePath, nodePartial)) {
      return undefined;
    }
    // Default to Menu when going manual - no route matching
    if (!parentNode && pathname === undefined) {
      activeNode = undefined;
    }

    // Flatten MenuSections in order not to have nested children when detecting active menu
    const menuItems = stripMenuSections(nodeChildren).filter(isMenuItem);
    menuItems.some((menuItem) => {
      // find the first matching menu item and return the parent or the item itself
      // depending if needs to be treated like a root
      const { partial, active } = menuItem.props;
      const pathMatches = isActivePath(pathname, menuItem.props.path, partial);
      if (active || pathMatches) {
        // isRoot prop is meant to be used when menu has child elements
        // and we do not want to render the parent menuItem but the child menuItems
        const isRoot = menuItem.props.children !== undefined;
        activeNode = isRoot ? menuItem : parentNode;
      } else if (menuItem.props.children !== undefined) {
        activeNode = getRootMenuItem(menuItem);
      }

      return !!activeNode;
    });

    return activeNode;
  }

  const rootMenuItem = getRootMenuItem();
  const menuComponents = React.Children.toArray(
    rootMenuItem?.props.children || children
  ).filter(
    (element) => isMenuItem(element) || isMenuSection(element)
  ) as MenuElement[];

  return (
    <MenuContext.Provider value={{ pathname, onClick: onChange }}>
      <div className="rc-menu">{menuComponents}</div>
    </MenuContext.Provider>
  );
}

Menu.Item = MenuItem;
Menu.Section = MenuSection;

export default Menu;
