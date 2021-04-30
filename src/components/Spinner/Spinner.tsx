import "./Spinner.scss";

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
  size?: number | "s" | "m" | "l";
  center?: boolean;
  color?: string;
};

export default function Spinner({
  size = "s",
  center,
  color,
}: SpinnerProps): JSX.Element {
  const realSize =
    typeof size === "string" ? { s: 20, m: 40, l: 60 }[size] : size;
  const strokeWidth = realSize / 10;
  const width = `${realSize}px`;
  const height = `${realSize}px`;
  const position = realSize / 2;
  const radius = position - strokeWidth;
  const spinnerStyle = {
    width: center ? undefined : width,
    height: center ? undefined : height,
  };

  return (
    <div
      className={`el-spinner ${center ? "center" : ""}`}
      style={spinnerStyle}
    >
      <svg
        className="el-spinner__component"
        width={width}
        height={height}
        viewBox={`0 0 ${realSize} ${realSize}`}
      >
        <path
          className="el-spinner__svg-path"
          strokeWidth={strokeWidth}
          d={describeArc(position, position, radius, 90, 200)}
          style={{ stroke: color }}
        />
      </svg>
    </div>
  );
}
