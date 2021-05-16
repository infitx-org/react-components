import React from "react";
import getSpaceAvailability from "utils/getSpaceAvailability";

const toPixel = (position: number): string => `${position}px`;

interface PositionState {
  offset?: number;
  space?: number;
  reverse: boolean;
}

interface OverlayPosition {
  top?: number;
  bottom?: number;
  height?: number;
  reverse: boolean;
}

export default function useOverLayPosition<T>(
  element: T | null
): OverlayPosition {
  const [position, setPosition] = React.useState<PositionState>({
    offset: 0,
    space: undefined,
    reverse: false,
  });
  React.useLayoutEffect(() => {
    const [offset, space, reverse] = getSpaceAvailability<T>(element);
    if (
      position.offset !== offset ||
      position.space !== space ||
      reverse !== position.reverse
    ) {
      setPosition({ offset, space, reverse });
    }
  });
  const { offset, space, reverse } = position;
  const top = reverse && offset ? toPixel(offset) : undefined;
  const bottom = !reverse && offset ? toPixel(offset) : undefined;
  const height = space ? toPixel(space) : undefined;
  return {
    top,
    bottom,
    height,
    reverse,
  };
}
