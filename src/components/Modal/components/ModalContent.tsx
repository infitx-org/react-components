import classnames from "classnames";

export interface ModalContentProps {
  style?: React.CSSProperties;
  defaultView?: boolean;
  children: React.ReactNode;
}

export default function ModalContent({
  style,
  defaultView,
  children,
}: ModalContentProps) {
  const className = classnames([
    "rc-modal__content",
    defaultView && `rc-modal__content--default-view`,
  ]);
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
