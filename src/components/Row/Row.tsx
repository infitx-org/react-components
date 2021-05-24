import React from "react";

import {
  JustifyWithMap,
  AlignMap,
  JustifyMap,
  AllCombined,
} from "types/flexBox";

export type Align = `${AllCombined}` | `${JustifyWithMap}`;

const mapAlignToProperty = (property: string) => {
  if (property in AlignMap) {
    return AlignMap[property as keyof typeof AlignMap];
  }
  return property;
};

const mapJustifyToProperty = (property: string) => {
  if (property in JustifyMap) {
    return JustifyMap[property as keyof typeof JustifyMap];
  }
  return property;
};

export interface RowProps {
  wrap?: boolean;
  align?: Align;
  grow?: number;
  shrink?: number;
  basis?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function Row({
  align = "flex-start",
  wrap = false,
  grow = undefined,
  shrink = undefined,
  basis = "auto",
  className = undefined,
  style = {},
  children = undefined,
}: RowProps) {
  const [justifyContent, alignItems] = align.split(" ");
  const styles: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    flexWrap: wrap ? "wrap" : undefined,
    flexGrow: grow,
    flexShrink: shrink,
    flexBasis: basis,
    alignItems: mapAlignToProperty(alignItems || "flex-start"),
    justifyContent: mapJustifyToProperty(justifyContent || "flex-start"),
    ...style,
  };
  return (
    <div className={className} style={styles}>
      {children}
    </div>
  );
}
