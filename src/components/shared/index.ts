import { Size } from "types";

const iconSizes = {
  [Size.XSmall]: 10,
  [Size.Small]: 12,
  [Size.Medium]: 14,
  [Size.Large]: 16,
};

export function getIconSizeByComponentSize(size: `${Size}`): number {
  return iconSizes[size];
}
