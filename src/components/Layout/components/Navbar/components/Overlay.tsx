import React from "react";
import useOverlayPosition from "hooks/useOverlayPosition";

export default function Overlay({ children }: { children: React.ReactNode }) {
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
      className="rc-layout__navbar__overlay"
      ref={ref}
      style={{ top, bottom, left, right, maxHeight }}
    >
      <div className="rc-layout__navbar__overlay-content">{children}</div>
    </div>
  );
}
