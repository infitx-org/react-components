import React from "react";
import { Size } from "../types";
import { getIconSizeByComponentSize } from "../shared";

export type IconProps = {
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  inheritFill?: boolean;
  fill?: string;
  stroke?: string;
  size?: `${Size}` | number;
};

function Icon({
  icon,
  inheritFill = false,
  fill,
  stroke = "transparent",
  size = 20,
}: IconProps) {
  let iconFill = "#000";

  if (inheritFill) {
    iconFill = "inherit";
  } else if (icon.props.fill && fill === undefined) {
    iconFill = icon.props.fill;
  } else if (fill) {
    iconFill = fill;
  }

  return React.cloneElement(icon, {
    ...icon.props,
    fill: iconFill,
    stroke,
    width: typeof size === "string" ? getIconSizeByComponentSize(size) : size,
    height: typeof size === "string" ? getIconSizeByComponentSize(size) : size,
  });
}

export default React.memo(Icon);
