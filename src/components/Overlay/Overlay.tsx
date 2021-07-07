import React, { MouseEvent } from "react";
import classnames from "classnames";
import useOverlayPosition from "hooks/useOverlayPosition";
import mergeRefs from "utils/mergeRefs";
import "./Overlay.scss";

export interface OverlayProps {
  applyTop?: boolean;
  applyBottom?: boolean;
  applyLeft?: boolean;
  applyRight?: boolean;
  withinHeight?: boolean;
  withinWidth?: boolean;
  className?: string;
  reverseClassName?: string;
  onClick?: (e: MouseEvent) => void;
  children: React.ReactNode;
}
export default React.forwardRef(function Overlay(
  {
    className,
    reverseClassName,
    applyTop = true,
    applyBottom = true,
    applyLeft = true,
    applyRight = true,
    withinHeight = false,
    withinWidth = false,
    onClick,
    children,
  }: OverlayProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  const ref = React.useRef<HTMLDivElement>(null);
  const {
    top,
    bottom,
    height,
    left,
    right,
    reverse,
  } = useOverlayPosition<HTMLDivElement>(
    ref.current,
    withinHeight,
    withinWidth
  );

  const style = {
    top: applyTop ? top : undefined,
    bottom: applyBottom ? bottom : undefined,
    left: applyLeft ? left : undefined,
    right: applyRight ? right : undefined,
    mexHeight: Math.min(220, height ? parseInt(height, 10) : Infinity),
  };

  return (
    <div
      role="presentation"
      className={classnames([
        "rc-overlay",
        className,
        reverse && reverseClassName,
      ])}
      ref={mergeRefs(ref, forwardedRef)}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
});
