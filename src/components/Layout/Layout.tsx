import Icon from "components/Icon";
import Tooltip from "components/Tooltip";
import "./Layout.scss";

interface SharedProps {
  children: React.ReactNode;
}

function Container({ children }: SharedProps) {
  return <div className="rc-layout__container">{children}</div>;
}

function Content({ children }: SharedProps) {
  return <div className="rc-layout__content">{children}</div>;
}

function Page({ children }: SharedProps) {
  return <div className="rc-layout__page">{children}</div>;
}

function SideMenu({ children }: SharedProps) {
  return <div className="rc-layout__side-menu">{children}</div>;
}

interface NavbarProps {
  title: string;
  username?: string;
  onLogoutClick: () => void;
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

function Navbar({ title, username = "-", onLogoutClick }: NavbarProps) {
  return (
    <div className="rc-layout__navbar">
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
          <Tooltip label="logout">
            <span>{username}</span>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

const Layout = {
  Navbar,
  Page,
  Container,
  SideMenu,
  Content,
};

export default Layout;
