import Layout, { LayoutProps } from "../Layout";
import { mapAlignToProperty, mapJustifyToProperty } from "../helpers";
import { JustifyWithMap, AlignWithMap } from "../types";

type Combined = `${JustifyWithMap} ${AlignWithMap}`;
export type Align = `${Combined}` | `${JustifyWithMap}`;

export interface RowProps extends LayoutProps {
  align?: Align;
}

export default function Row({ align = "flex-start", ...props }: RowProps) {
  const [justifyContent, alignItems] = align.split(" ") as [
    JustifyWithMap,
    AlignWithMap
  ];
  return (
    <Layout
      flexDirection="row"
      alignItems={mapAlignToProperty(alignItems)}
      justifyContent={mapJustifyToProperty(justifyContent)}
      {...props}
    />
  );
}
