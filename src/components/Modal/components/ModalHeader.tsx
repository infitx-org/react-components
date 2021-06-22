import React from "react";
import classnames from "classnames";
import IconButton from "components/IconButton";
import { Kind } from "../../../types";
import CloseSmall from "../../../resources/icons/close-small.svg";

export interface ModalHeaderProps {
  kind?: `${Kind}` | "default";
  title?: string;
  onClose?: () => void;
  isCloseDisabled?: boolean;
  defaultView?: boolean;
  children?: React.ReactNode;
}

export default function ModalHeader({
  kind = "default",
  title,
  onClose,
  isCloseDisabled,
  defaultView,
  children,
}: ModalHeaderProps) {
  const headerClassName = classnames([
    "rc-modal__header",
    `rc-modal__header--${kind}`,
    defaultView && `rc-modal__header--default-view`,
  ]);

  return (
    <div className={headerClassName}>
      {children}
      {title && <div className="rc-modal__header__title">{title}</div>}
      {onClose && (
        <div className="rc-modal__header__close">
          <IconButton
            onClick={onClose}
            icon={<CloseSmall />}
            size={20}
            disabled={isCloseDisabled}
          />
        </div>
      )}
    </div>
  );
}
