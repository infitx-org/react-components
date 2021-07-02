import classnames from "classnames";
import Block from "./components/Block";
import "./Navbar.scss";

export interface NavbarProps {
  title: string;
  className?: string;
  children?: React.ReactNode;

  userIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  username?: string;
  onUsernameClick?: () => void;
}

function Navbar({
  title,
  username,
  className,
  onUsernameClick,
  userIcon,
  children,
}: NavbarProps) {
  return (
    <div className={classnames(["rc-layout__navbar", className])}>
      <div className="rc-layout__navbar__controls">
        <a className="rc-layout__navbar__link" href="/">
          {title}
        </a>
      </div>
      {(username || userIcon) && (
        <Block label={username} onClick={onUsernameClick} icon={userIcon} />
      )}
      {children}
    </div>
  );
}

Navbar.Block = Block;

export default Navbar;
