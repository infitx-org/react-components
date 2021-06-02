import React from "react";
import getSpaceAvailability from "utils/getSpaceAvailability";
import getWidthAvailability from "utils/getWidthAvailability";

const toPixel = (position: number): string => `${position}px`;

interface PositionState {
  offset?: number;
  space?: number;
  reverse: boolean;
}

interface PositionStateL {
  offsetLeft?: number;
  spaceLeft?: number;
  reverseHorizontal: boolean;
}

interface OverlayPosition {
  top?: string;
  bottom?: string;
  height?: string;
  reverse: boolean;
}

interface OverlayPositionL {
  left?: string;
  right?: string;
  width?: string;
  reverseHorizontal: boolean;
}

export default function useOverLayPosition<T extends HTMLDivElement>(
  element: T | null,
  withinHeight = false,
  withinWidth = false
): OverlayPosition & OverlayPositionL {
  const [position, setPosition] = React.useState<PositionState>({
    offset: 0,
    space: undefined,
    reverse: false,
  });
  const [positionL, setPositionL] = React.useState<PositionStateL>({
    offsetLeft: 0,
    spaceLeft: undefined,
    reverseHorizontal: false,
  });
  React.useLayoutEffect(() => {
    const [offset, space, reverse] = getSpaceAvailability<T>(
      element,
      withinHeight
    );
    const [offsetLeft, spaceLeft, reverseHorizontal] = getWidthAvailability<T>(
      element,
      withinWidth
    );
    if (
      position.offset !== offset ||
      position.space !== space ||
      position.reverse !== reverse
    ) {
      setPosition({ offset, space, reverse });
    }
    if (
      positionL.offsetLeft !== offsetLeft ||
      positionL.spaceLeft !== spaceLeft ||
      positionL.reverseHorizontal !== reverseHorizontal
    ) {
      setPositionL({ offsetLeft, spaceLeft, reverseHorizontal });
    }
  });

  const { offset, space, reverse } = position;
  const top = !reverse && offset !== undefined ? toPixel(offset) : undefined;
  const bottom = reverse && offset !== undefined ? toPixel(offset) : undefined;
  const height = space ? toPixel(space) : undefined;

  const { offsetLeft, spaceLeft, reverseHorizontal } = positionL;
  const left =
    !reverseHorizontal && offsetLeft !== undefined
      ? toPixel(offsetLeft)
      : undefined;
  const right =
    reverseHorizontal && offsetLeft !== undefined
      ? toPixel(offsetLeft)
      : undefined;
  const width = spaceLeft ? toPixel(spaceLeft) : undefined;

  return {
    top,
    bottom,
    height,
    reverse,
    left,
    right,
    width,
    reverseHorizontal,
  };
}
