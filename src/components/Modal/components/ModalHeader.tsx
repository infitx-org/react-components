import React from "react";
import classnames from "classnames";
import IconButton from "components/IconButton";
import { Kind } from "../../../types";
import CloseSmall from "../../../resources/icons/close-small.svg";

type BaseProps = {
  className?: string;
  kind?: `${Kind}` | "default";
};

type PropsDriven = {
  title?: string;
  onClose?: () => void;
  isCloseDisabled?: boolean;
};

type ChildrenDriven = {
  children?: React.ReactNode;
};

export type ModalHeaderProps = BaseProps & (PropsDriven | ChildrenDriven);

export function hasHeaderProps(
  props: PropsDriven | ChildrenDriven
): props is PropsDriven {
  return (
    (props as PropsDriven).title !== undefined ||
    (props as PropsDriven).onClose !== undefined
  );
}

function BaseModalHeader({ title, onClose, isCloseDisabled }: PropsDriven) {
  return (
    <>
      {title && <div className="rc-modal__header__title">{title}</div>}
      {onClose && (
        <div className="rc-modal__header__close-container">
          <IconButton
            className="rc-modal__header__close"
            onClick={onClose}
            icon={<CloseSmall />}
            size={20}
            disabled={isCloseDisabled}
          />
        </div>
      )}
    </>
  );
}

export default function ModalHeader({
  className,
  kind = "default",
  ...props
}: ModalHeaderProps) {
  let content;
  let defaultView = false;
  if (hasHeaderProps(props)) {
    content = <BaseModalHeader {...props} />;
    defaultView = true;
  } else {
    content = props.children;
  }
  const headerClassName = classnames([
    "rc-modal__header",
    `rc-modal__header--${kind}`,
    defaultView && `rc-modal__header--default-view`,
    className,
  ]);

  return <div className={headerClassName}>{content}</div>;
}
