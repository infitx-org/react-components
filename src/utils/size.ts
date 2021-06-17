import { Size } from "../types";

const iconSizes = {
  [Size.XSmall]: 10,
  [Size.Small]: 12,
  [Size.Medium]: 14,
  [Size.Large]: 16,
};

export function getIconSizeByComponentSize(size: `${Size}`): number {
  return iconSizes[size];
}

const smallerIconSizes = {
  [Size.XSmall]: 8,
  [Size.Small]: 10,
  [Size.Medium]: 12,
  [Size.Large]: 14,
};

export function getSmallerIconSizeByComponentSize(size: `${Size}`): number {
  return smallerIconSizes[size];
}
