import classnames from "classnames";

export type PageProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Page({ children, className }: PageProps) {
  return (
    <div className={classnames(["rc-layout__page", className])}>{children}</div>
  );
}
