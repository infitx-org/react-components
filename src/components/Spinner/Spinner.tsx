import React from "react";
import classnames from "classnames";
import { Kind, InputSize } from "../../types";
import "./Spinner.scss";

function getNumericSize(size: `${InputSize}`) {
  return { small: 20, medium: 40, large: 60 }[size];
}

interface Point {
  x: number;
  y: number;
}

const polarToCartesian = (
  cx: number,
  cy: number,
  r: number,
  angleInDegrees: number
): Point => {
  const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180.0);
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
};

const describeArc = (
  x: number,
  y: number,
  r: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(x, y, r, endAngle);
  const end = polarToCartesian(x, y, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M",
    start.x,
    start.y,
    "A",
    r,
    r,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
};

export type SpinnerProps = {
  size?: number | `${InputSize}`;
  center?: boolean;
  color?: string;
  kind?: `${Kind}`;
};

function Spinner({
  size = "small",
  center,
  kind = "primary",
  color,
}: SpinnerProps): JSX.Element {
  const realSize = typeof size === "string" ? getNumericSize(size) : size;
  const strokeWidth = realSize / 10;
  const width = `${realSize}px`;
  const height = `${realSize}px`;
  const position = realSize / 2;
  const radius = position - strokeWidth;
  const spinnerStyle = {
    width: center ? undefined : width,
    height: center ? undefined : height,
  };

  const spinnerClassName = classnames([
    "rc-spinner",
    `rc-spinner--${kind}`,
    center && "rc-spinner--center",
  ]);

  return (
    <div className={spinnerClassName} style={spinnerStyle}>
      <svg
        className="rc-spinner__component"
        width={width}
        height={height}
        viewBox={`0 0 ${realSize} ${realSize}`}
      >
        <path
          className="rc-spinner__svg-path"
          strokeWidth={strokeWidth}
          d={describeArc(position, position, radius, 90, 200)}
          style={{ stroke: color }}
        />
      </svg>
    </div>
  );
}

export default React.memo(Spinner);
