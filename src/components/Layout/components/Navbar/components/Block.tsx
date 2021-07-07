import React from "react";
import Icon from "components/Icon";
import Overlay from "components/Overlay";
import useOnClickOutside from "hooks/useOnClickOutside";

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

function isBlockItem(child: React.ReactNode): boolean {
  return (child as React.ReactElement).type === BlockItem;
}

function getBlockItems(
  children: React.ReactNode,
  { onClick }: Partial<BlockItemProps>
) {
  const childrenArray = React.Children.toArray(children).filter(
    isBlockItem
  ) as React.ReactElement<BlockItemProps>[];

  return childrenArray.map((blockItem) =>
    React.cloneElement(blockItem, {
      ...blockItem.props,
      // merge the own click function with the outside one to close the overlay
      onClick: () => {
        onClick?.();
        blockItem.props.onClick?.();
      },
    })
  );
}

export interface BlockProps {
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  initial?: string;
  label?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

function Block({ icon, initial, label, onClick, children }: BlockProps) {
  const blockRef = React.useRef<HTMLDivElement>(null);
  const [overlayVisible, setOverlayVisible] = React.useState(false);
  const onOverlayToggleClick = () => setOverlayVisible(!overlayVisible);
  useOnClickOutside(blockRef, () => setOverlayVisible(false));

  let iconContent = null;
  if (icon) {
    iconContent = (
      <div className="rc-layout__navbar__block__icon">
        <Icon icon={icon} size={30} />
      </div>
    );
  } else if (initial) {
    iconContent = (
      <div className="rc-layout__navbar__block__initial">
        {initial.charAt(0)}
      </div>
    );
  }

  return (
    <div
      className="rc-layout__navbar__block"
      ref={blockRef}
      onClick={onClick || onOverlayToggleClick}
      role="presentation"
    >
      {iconContent}
      <div className="rc-layout__navbar__block__label">
        <span>{label}</span>
      </div>
      {children && overlayVisible && (
        <Overlay
          className="rc-layout__navbar__overlay"
          applyTop
          applyBottom
          applyLeft
          applyRight
          withinWidth
        >
          <div className="rc-layout__navbar__overlay-content">
            {getBlockItems(children, {
              onClick: () => setOverlayVisible(false),
            })}
          </div>
        </Overlay>
      )}
    </div>
  );
}

Block.Item = BlockItem;

export default Block;
