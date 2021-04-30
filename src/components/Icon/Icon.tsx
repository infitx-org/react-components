import React from "react";
import { Size } from "../types";
import { getIconSizeByComponentSize } from "../shared";

export type IconProps = {
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  fill?: string;
  stroke?: string;
  size?: `${Size}` | number;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
};

function override(
  fallback: string,
  intrinsic?: string,
  defined?: string
): string {
  return defined || intrinsic || fallback;
}

function Icon({
  icon,
  fill,
  stroke,
  size = 20,
  id,
  style,
  className,
}: IconProps) {
  return React.cloneElement(icon, {
    ...icon.props,
    fill: override("#000", icon.props.fill, fill),
    stroke: override("transparent", icon.props.stroke, stroke),
    width: typeof size === "string" ? getIconSizeByComponentSize(size) : size,
    height: typeof size === "string" ? getIconSizeByComponentSize(size) : size,
    id,
    style,
    className,
  });
}

export default React.memo(Icon);
