import classnames from "classnames";

export type SideMenuProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SideMenu({ children, className }: SideMenuProps) {
  return (
    <div className={classnames(["rc-layout__side-menu", className])}>
      {children}
    </div>
  );
}
