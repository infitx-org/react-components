import React from "react";
import IconButton from "components/IconButton";
import { Kind } from "../../../types";
import CloseSmall from "../../../resources/icons/close-small.svg";

export interface ModalHeaderProps {
  kind?: `${Kind}`;
  title?: string;
  onClose?: () => void;
  isCloseDisabled?: boolean;
  children?: React.ReactNode;
}

export default function ModalHeader({
  kind,
  title,
  onClose,
  isCloseDisabled,
  children,
}: ModalHeaderProps) {
  return (
    <div className="rc-modal__header">
      {children}
      {title && <div className="rc-modal__header-title">{title}</div>}
      {onClose && (
        <div className="rc-modal__header-close">
          <IconButton
            onClick={onClose}
            kind={kind && kind !== "primary" ? "light" : undefined}
            icon={<CloseSmall />}
            size={20}
            disabled={isCloseDisabled}
          />
        </div>
      )}
    </div>
  );
}
