import React from "react";
import getVerticalAvailability from "utils/getVerticalAvailability";
import getHorizontalAvailability from "utils/getHorizontalAvailability";

const toPixel = (position: number): string => `${position}px`;

interface VerticalState {
  offsetTop?: number;
  spaceTop?: number;
  reverse: boolean;
}

interface HorizontalState {
  offsetLeft?: number;
  spaceLeft?: number;
  reverseHorizontal: boolean;
}

interface OverlayPosition {
  top?: string;
  bottom?: string;
  height?: string;
  reverse: boolean;
  left?: string;
  right?: string;
  width?: string;
  reverseHorizontal: boolean;
}

export default function useOverLayPosition<T extends HTMLDivElement>(
  element: T | null,
  withinHeight = false,
  withinWidth = false
): OverlayPosition {
  const [verticalState, setVerticalState] = React.useState<VerticalState>({
    offsetTop: 0,
    spaceTop: undefined,
    reverse: false,
  });
  const [horizontalState, serHorizontalState] = React.useState<HorizontalState>(
    {
      offsetLeft: 0,
      spaceLeft: undefined,
      reverseHorizontal: false,
    }
  );
  React.useLayoutEffect(() => {
    const [offsetTop, spaceTop, reverse] = getVerticalAvailability<T>(
      element,
      withinHeight
    );
    const [
      offsetLeft,
      spaceLeft,
      reverseHorizontal,
    ] = getHorizontalAvailability<T>(element, withinWidth);
    if (
      verticalState.offsetTop !== offsetTop ||
      verticalState.spaceTop !== spaceTop ||
      verticalState.reverse !== reverse
    ) {
      setVerticalState({ offsetTop, spaceTop, reverse });
    }
    if (
      horizontalState.offsetLeft !== offsetLeft ||
      horizontalState.spaceLeft !== spaceLeft ||
      horizontalState.reverseHorizontal !== reverseHorizontal
    ) {
      serHorizontalState({ offsetLeft, spaceLeft, reverseHorizontal });
    }
  });

  const { offsetTop, spaceTop, reverse } = verticalState;
  const { offsetLeft, spaceLeft, reverseHorizontal } = horizontalState;

  const top =
    !reverse && offsetTop !== undefined ? toPixel(offsetTop) : undefined;
  const bottom =
    reverse && offsetTop !== undefined ? toPixel(offsetTop) : undefined;
  const height = spaceTop ? toPixel(spaceTop) : undefined;

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
