import React from "react";

export interface MenuContextValue {
  pathname: string;
  onClick: (path: string) => void;
}

export const MenuContext = React.createContext<MenuContextValue>({
  pathname: "",
  onClick: () => undefined,
});

export function isActivePath(
  pathname: string,
  path: string | undefined,
  partial?: boolean
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
    const isParam = pathChunk !== undefined && pathChunk.startsWith(":");
    return isExact || isParam;
  });
}
