import classnames from "classnames";

export interface ModalBodyProps {
  style?: React.CSSProperties;
  common?: boolean;
  children: React.ReactNode;
}

export default function ModalBody({
  style,
  common = false,
  children,
}: ModalBodyProps) {
  const className = classnames([
    "rc-modal__body",
    common && `rc-modal__body--common`,
  ]);
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
