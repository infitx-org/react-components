import classnames from "classnames";

export interface ModalContentProps {
  flex?: boolean;
  children: React.ReactNode;
}

export default function ModalContent({ flex, children }: ModalContentProps) {
  const contentClassName = classnames([
    "rc-modal__body__content",
    flex && "rc-modal__body__content--flexible",
  ]);
  let wrappedChildren = children;
  if (!flex) {
    wrappedChildren = <div>{wrappedChildren}</div>;
  }

  return (
    <div className="rc-modal__body">
      <div className={contentClassName}>{wrappedChildren}</div>
    </div>
  );
}
