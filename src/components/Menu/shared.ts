import React from "react";

export interface MenuSectionProps {
  label: string;
  hidden?: boolean;
  icon?: string;
  fill?: string;
  size?: number;
  disabled?: boolean;
  children: MenuItemElement | MenuItemElement[];
}

interface BaseMenuItemProps {
  label: string;
  active?: boolean;
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
  children?: MenuItemElement | MenuElement[];
}

interface BaseMenuItemPropsWithTo extends BaseMenuItemProps {
  to: string;
  path?: string;
}
interface BaseMenuItemPropsWithPath extends BaseMenuItemProps {
  to?: string;
  path: string;
}

export type MenuItemProps = BaseMenuItemPropsWithTo | BaseMenuItemPropsWithPath;

export type MenuItemElement = React.ReactElement<MenuItemProps>;
export type MenuSectionElement = React.ReactElement<MenuSectionProps>;
export type MenuElement = MenuItemElement | MenuSectionElement;

export interface MenuContextValue {
  pathname: string;
  onClick: (path: string) => void;
}

export const MenuContext = React.createContext<MenuContextValue>({
  pathname: "",
  onClick: () => undefined,
});

export function pathMatchesPathname(
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