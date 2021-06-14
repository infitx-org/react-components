import classnames from "classnames";
import Icon from "components/Icon";
import Tooltip from "components/Tooltip";
import "./Layout.scss";

export interface SharedProps {
  children: React.ReactNode;
  className?: string;
}

function Content({ children, className }: SharedProps) {
  return (
    <div className={classnames(["rc-layout__content", className])}>
      {children}
    </div>
  );
}

function Page({ children, className }: SharedProps) {
  return (
    <div className={classnames(["rc-layout__page", className])}>{children}</div>
  );
}

function SideMenu({ children, className }: SharedProps) {
  return (
    <div className={classnames(["rc-layout__side-menu", className])}>
      {children}
    </div>
  );
}

export interface NavbarProps {
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

function Navbar({
  title,
  username = "-",
  className,
  onLogoutClick,
}: NavbarProps) {
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

function Layout({ children, className }: SharedProps) {
  return <div className={classnames(["rc-layout", className])}>{children}</div>;
}

Layout.Navbar = Navbar;
Layout.Page = Page;
Layout.SideMenu = SideMenu;
Layout.Content = Content;

export default Layout;
