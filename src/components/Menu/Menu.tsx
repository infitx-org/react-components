import React from "react";
import MenuItem from "./components/MenuItem";
import MenuSection from './components/MenuSection';
import { getPathMatches, MenuContext, MenuElement, MenuItemElement, isMenuItem, isMenuSection } from './shared';
import "./Menu.scss";

interface MenuItemsGroupProps {
  children: React.ReactNode;
}

function MenuItemsGroup({ children }: MenuItemsGroupProps) {
  return <div className="rc-menu__section-items">{children}</div>;
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
      <div className="mb-element rc-menu">{menuComponents}</div>
    </MenuContext.Provider>
  );
}

Menu.Item = MenuItem;
Menu.Section = MenuSection;

export default Menu;
