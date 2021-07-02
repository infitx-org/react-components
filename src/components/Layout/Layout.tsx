import classnames from "classnames";
import "./Layout.scss";

import Navbar from "./components/Navbar";
import Page from "./components/Page";
import SideMenu from "./components/SideMenu";
import Content from "./components/Content";

export type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

function Layout({ children, className }: LayoutProps) {
  return <div className={classnames(["rc-layout", className])}>{children}</div>;
}

Layout.Navbar = Navbar;
Layout.Page = Page;
Layout.SideMenu = SideMenu;
Layout.Content = Content;

export default Layout;
