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

function findVisibleElements(
  menuElements: MenuItemElement | MenuElement[],
  pathname: string | undefined
): MenuItemElement | MenuElement[] | undefined {
  let activeNode: MenuItemElement | MenuElement[] | undefined;

  // strip Menu.Section components in order to
  // flat children when detecting active menu
  stripMenuSections(menuElements)
    .filter(isMenuItem)
    .some((menuItem) => {
      // find the first matching menu item and return the parent or the item itself
      // depending if needs to be treated like a root
      const { partial, path, active } = menuItem.props;
      if (active || isActivePath(pathname, path, partial)) {
        // isRoot prop is meant to be used when menu has child elements
        // and we do not want to render the parent menuItem but the child menuItems
        const isRoot = menuItem.props.children !== undefined;
        activeNode = isRoot ? menuItem.props.children : menuElements;
      } else if (menuItem.props.children !== undefined) {
        activeNode = findVisibleElements(menuItem.props.children, pathname);
      }

      return !!activeNode;
    });

  return activeNode;
}

export interface MenuProps {
  path: string;
  pathname?: string;
  children: MenuItemElement | MenuElement[];
  onChange: (p: string) => void;
}

function Menu({ path, pathname, onChange, children }: MenuProps) {
  // Default to Menu
  let menuElements: MenuItemElement | MenuElement[] | undefined = children;
  if (pathname !== path) {
    menuElements = findVisibleElements(children, pathname) || children;
  }
  const menuComponents = React.Children.toArray(menuElements).filter(
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
