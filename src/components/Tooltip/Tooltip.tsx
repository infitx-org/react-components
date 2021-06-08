import React, { useState, useEffect, CSSProperties } from "react";
import classnames from "classnames";
import { Kind } from "types";
import "./Tooltip.scss";

export type Position = "top" | "left" | "right" | "bottom";

interface SizeAndOffset {
  offsetLeft: number;
  offsetTop: number;
  width: number;
  height: number;
}

interface Coordinates {
  x: number;
  y: number;
}

const Label = ({ label, kind }: { label: string; kind: `${Kind}` }) => (
  <div
    className={classnames(["rc-tooltip__label", `rc-tooltip__label--${kind}`])}
  >
    {label}
  </div>
);

function getPositionCoordinates(
  item: ClientRect,
  source: SizeAndOffset,
  position: Position
): Coordinates {
  const distance = 10;
  const { offsetLeft, offsetTop } = source;
  let x = 0;
  let y = 0;

  if (position === "top") {
    x = (source.width - item.width) / 2;
    y = -item.height - distance;
  } else if (position === "left") {
    x = -item.width - distance;
    y = (source.height - item.height) / 2;
  } else if (position === "right") {
    x = source.width + distance;
    y = (source.height - item.height) / 2;
  } else {
    x = (source.width - item.width) / 2;
    y = source.height + distance;
  }
  return { x: x + offsetLeft, y: y + offsetTop };
}

interface TooltipCardProps {
  children?: React.ReactNode;
  sizes: SizeAndOffset;
  position: Position;
}

function TooltipCard({ children, sizes, position }: TooltipCardProps) {
  const ref = React.useRef<HTMLDivElement>(document.createElement("div"));
  const [style, setStyle] = useState({
    transform: "",
    visibility: "hidden",
  } as CSSProperties);

  useEffect(() => {
    const item = ref.current.getBoundingClientRect();
    const { x, y } = getPositionCoordinates(item, sizes, position);
    const transform = `translate(${x}px, ${y}px)`;
    setStyle({ transform, visibility: "visible", opacity: 1 } as CSSProperties);
  }, [sizes, position]);

  return (
    <div ref={ref} className="rc-tooltip" style={style}>
      {children}
    </div>
  );
}

export interface TooltipProps {
  children: React.ReactElement;
  content?: React.ReactNode;
  label?: string;
  position?: Position;
  fixed?: boolean;
  kind?: `${Kind}`;
  delay?: number;
}

function Tooltip({
  children,
  content,
  label,
  position = "top",
  fixed,
  kind = Kind.Dark,
  delay = 200,
}: TooltipProps): JSX.Element {
  const childRef = React.useRef<HTMLDivElement>(document.createElement("div"));
  const timeout = React.useRef<NodeJS.Timeout>(null);
  const [sizes, setSizes] = useState<null | SizeAndOffset>(null);

  function setElementSizes() {
    // TODO: Fix!
    // @ts-ignore
    timeout.current = setTimeout(() => {
      const { offsetLeft, offsetTop } = childRef.current as HTMLElement;
      const { width, height } = childRef.current.getBoundingClientRect();
      setSizes({ offsetTop, offsetLeft, width, height });
    }, delay);
  }

  const onLeave = React.useCallback(() => {
    if (!fixed) {
      setSizes(null);
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    }
  }, [fixed]);

  const onEnter = () => {
    if (childRef.current) {
      setElementSizes();
    }
  };

  useEffect(() => {
    if (typeof fixed !== "boolean") {
      if (childRef.current !== null) {
        childRef.current.addEventListener("mouseenter", onEnter);
        childRef.current.addEventListener("mouseleave", onLeave);
      }
    }
    return () => {
      if (typeof fixed !== "boolean") {
        if (childRef.current !== null) {
          childRef.current.removeEventListener("mouseenter", onEnter);
          childRef.current.removeEventListener("mouseleave", onLeave);
        }
      }
    };
  }, [childRef.current]);

  useEffect(() => {
    if (fixed === true) {
      setElementSizes();
    } else {
      onLeave();
    }
  }, [fixed]);

  if (!label && !content) {
    return <>{children}</>;
  }

  const childrenWithRef = React.cloneElement(children, {
    ...children.props,
    ref: childRef,
  });

  return (
    <>
      {childrenWithRef}
      {sizes && (
        <TooltipCard sizes={sizes} position={position}>
          {content || <Label kind={kind} label={label as string} />}
        </TooltipCard>
      )}
    </>
  );
}

export default Tooltip;
