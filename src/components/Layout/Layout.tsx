import classnames from "classnames";
import Icon from "components/Icon";
import Tooltip from "components/Tooltip";
import "./Layout.scss";

export interface SharedProps {
  children: React.ReactNode;
  className?: string;
}

export type LayoutContentProps = SharedProps;

function LayoutContent({ children, className }: LayoutContentProps) {
  return (
    <div className={classnames(["rc-layout__content", className])}>
      {children}
    </div>
  );
}

export type LayoutPageProps = SharedProps;

function LayoutPage({ children, className }: LayoutPageProps) {
  return (
    <div className={classnames(["rc-layout__page", className])}>{children}</div>
  );
}

export type LayoutSideMenuProps = SharedProps;

function LayoutSideMenu({ children, className }: LayoutSideMenuProps) {
  return (
    <div className={classnames(["rc-layout__side-menu", className])}>
      {children}
    </div>
  );
}

export interface LayoutNavbarProps {
  title: string;
  username?: string;
  className?: string;
  onLogoutClick?: () => void;
}

const icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
  >
    <circle cx="20" cy="20" r="20" />
  </svg>
);

function LayoutNavbar({
  title,
  username = "-",
  className,
  onLogoutClick,
}: LayoutNavbarProps) {
  return (
    <div className={classnames(["rc-layout__navbar", className])}>
      <div className="rc-layout__navbar__controls">
        <a className="rc-layout__navbar__link" href="/">
          {title}
        </a>
      </div>
      <div className="rc-layout__navbar__user">
        <div className="rc-layout__navbar__user__icon">
          <Icon icon={icon} fill="#fff" />
        </div>
        <div
          className="rc-layout__navbar__user__name"
          onClick={onLogoutClick}
          role="presentation"
        >
          <Tooltip label="Logout">
            <span>{username}</span>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export type LayoutProps = SharedProps;

function Layout({ children, className }: LayoutProps) {
  return <div className={classnames(["rc-layout", className])}>{children}</div>;
}

Layout.Navbar = LayoutNavbar;
Layout.Page = LayoutPage;
Layout.SideMenu = LayoutSideMenu;
Layout.Content = LayoutContent;

export default Layout;
