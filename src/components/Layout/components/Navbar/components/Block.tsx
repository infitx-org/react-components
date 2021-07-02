import React from "react";
import Icon from "components/Icon";
import Overlay from "./Overlay";

interface BlockItemProps {
  label?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

function BlockItem({ label, children, onClick }: BlockItemProps) {
  return (
    <div
      className="rc-layout__navbar__block__item"
      onClick={onClick}
      role="presentation"
    >
      {label || children}
    </div>
  );
}

export interface BlockProps {
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  label?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

function Block({ icon, label, onClick, children }: BlockProps) {
  const [overlayVisible, setOverlayVisible] = React.useState(false);
  const onOverlayToggleClick = () => setOverlayVisible(!overlayVisible);
  const items = React.Children.toArray(
    children
  ) as React.ReactElement<BlockItemProps>[];

  return (
    <div className="rc-layout__navbar__block">
      {icon && (
        <div className="rc-layout__navbar__block__icon">
          <Icon icon={icon} size={30} />
        </div>
      )}
      <div
        className="rc-layout__navbar__block__label"
        onClick={onClick || onOverlayToggleClick}
        role="presentation"
      >
        <span>{label}</span>
      </div>
      {children && overlayVisible && (
        <Overlay>
          {items.map((c) =>
            React.cloneElement(c, {
              ...c.props,
              onClick: () => {
                setOverlayVisible(false);
                c.props.onClick?.();
              },
            })
          )}
        </Overlay>
      )}
    </div>
  );
}

Block.Item = BlockItem;

export default Block;
