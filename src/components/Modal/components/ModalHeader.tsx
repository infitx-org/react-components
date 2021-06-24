import React from "react";
import classnames from "classnames";
import IconButton from "components/IconButton";
import { Kind } from "../../../types";
import CloseSmall from "../../../resources/icons/close-small.svg";

type ModalHeaderBaseProps = {
  className?: string;
  kind?: `${Kind}` | "default";
  defaultView?: boolean;
};

type PropsDriven = {
  title?: string;
  onClose?: () => void;
  isCloseDisabled?: boolean;
};

type ChildrenDriven = {
  children?: React.ReactNode;
};

export type ModalHeaderProps = ModalHeaderBaseProps &
  (PropsDriven | ChildrenDriven);

export function isPropsDriven(
  props: PropsDriven | ChildrenDriven
): props is PropsDriven {
  return (props as ChildrenDriven).children === undefined;
}

export default function ModalHeader({
  className,
  kind = "default",
  defaultView,
  ...props
}: ModalHeaderProps) {
  let content;
  if (isPropsDriven(props)) {
    const { title, onClose, isCloseDisabled } = props;
    content = (
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
