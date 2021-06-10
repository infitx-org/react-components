import React from "react";
import useOverlayPosition from "hooks/useOverlayPosition";
import mergeRefs from "utils/mergeRefs";
import "./DropdownOverlay.scss";

export default React.forwardRef(function DropdownOverlay(
  { children }: { children: React.ReactNode },
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  const ref = React.useRef<HTMLDivElement>(null);
  const {
    top,
    bottom,
    height,
    left,
    right,
  } = useOverlayPosition<HTMLDivElement>(ref.current, false, true);

  const maxHeight = Math.min(220, parseInt(height || "", 10) || 220);

  return (
    <div
      className="rc-dropdown__overlay"
      ref={mergeRefs(ref, forwardedRef)}
      style={{ top, bottom, left, right, maxHeight }}
    >
      <div className="rc-dropdown__overlay-content">{children}</div>
    </div>
  );
});
