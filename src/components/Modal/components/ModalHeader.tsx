import React from "react";
import classnames from "classnames";
import IconButton from "components/IconButton";
import { Kind } from "../../../types";
import CloseSmall from "../../../resources/icons/close-small.svg";

type BaseHeaderProps = {
  className?: string;
  kind?: `${Kind}` | "default";
};

export type FixedHeaderProps = {
  title?: string;
  onClose?: () => void;
  isCloseDisabled?: boolean;
};

type CustomHeaderProps = {
  children?: React.ReactNode;
};

export type ModalHeaderProps = BaseHeaderProps &
  (FixedHeaderProps | CustomHeaderProps);

export function hasHeaderProps(
  props: FixedHeaderProps | CustomHeaderProps
): props is FixedHeaderProps {
  return (
    (props as FixedHeaderProps).title !== undefined ||
    (props as FixedHeaderProps).onClose !== undefined
  );
}

function BaseModalHeader({
  title,
  onClose,
  isCloseDisabled,
}: FixedHeaderProps) {
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
  let common = false;
  if (hasHeaderProps(props)) {
    content = <BaseModalHeader {...props} />;
    common = true;
  } else {
    content = props.children;
  }
  const headerClassName = classnames([
    "rc-modal__header",
    `rc-modal__header--${kind}`,
    common && `rc-modal__header--common`,
    className,
  ]);

  return <div className={headerClassName}>{content}</div>;
}
