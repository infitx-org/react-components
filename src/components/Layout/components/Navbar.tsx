import classnames from "classnames";
import Icon from "components/Icon";
import Tooltip from "components/Tooltip";

const userIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
  >
    <g>
      <circle cx="20" cy="20" r="20" />
    </g>
  </svg>
);

export interface NavbarProps {
  title: string;
  username?: string;
  className?: string;
  onLogoutClick?: () => void;
}

export default function Navbar({
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
          <Icon icon={userIcon} fill="#fff" />
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
