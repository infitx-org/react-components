import React, { useState, useEffect, CSSProperties } from "react";
import classnames from "classnames";
import { Kind } from "types";
import "./Tooltip.scss";

type Position = "top" | "left" | "right" | "bottom";

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
    className={classnames([
      "rc-tooltip-card__label",
      `rc-tooltip-card__label--${kind}`,
    ])}
  >
    {label}
  </div>
);

interface TooltipCardProps {
  children?: React.ReactNode;
  sizes: SizeAndOffset;
  position: Position;
}

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
  content?: React.ReactNode;
  children?: React.ReactNode;
  fixed?: boolean;
  label?: string;
  position?: Position;
  kind?: `${Kind}`;
}

function Tooltip({
  label,
  content,
  position = "top",
  fixed,
  kind = Kind.Dark,
  children,
}: TooltipProps) {
  const ref = React.useRef<HTMLDivElement>(document.createElement("div"));
  const [sizes, setSizes] = useState<null | SizeAndOffset>(null);

  function setElementSizes(element: HTMLElement) {
    const { offsetLeft, offsetTop } = element;
    const { width, height } = element.getBoundingClientRect();
    setSizes({ offsetTop, offsetLeft, width, height });
  }

  const onLeave = () => {
    if (!fixed) {
      setSizes(null);
    }
  };
  const onEnter = (e: Event) => {
    if (e.target !== null) {
      setElementSizes(e.target as HTMLElement);
    }
  };

  useEffect(() => {
    const contentRef = ref.current;
    if (contentRef !== null) {
      contentRef.addEventListener("mouseenter", onEnter);
      contentRef.addEventListener("mouseleave", onLeave);
    }
    return () => {
      if (contentRef !== null) {
        contentRef.removeEventListener("mouseenter", onEnter);
        contentRef.removeEventListener("mouseleave", onLeave);
      }
    };
  }, [ref.current]);

  useEffect(() => {
    if (fixed) {
      setElementSizes(ref.current);
    }
  }, [fixed]);

  if (!label && !content) {
    return children;
  }

  const childrenWithRef = React.Children.map(children, (child) =>
    // @ts-ignore
    React.cloneElement(child, { ...child.props, ref })
  );

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
