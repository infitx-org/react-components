import classnames from "classnames";

export interface ContentProps {
  children: React.ReactNode;
  className?: string;
}

export default function Content({ children, className }: ContentProps) {
  return (
    <div className={classnames(["rc-layout__content", className])}>
      {children}
    </div>
  );
}
