export interface MenuSectionProps {
  label: string;
  hidden?: boolean;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
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
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  fill?: string;
  size?: number;
  // prop partial is not used directly by the MenuItem but it is used by the Menu component
  partial?: boolean;
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
