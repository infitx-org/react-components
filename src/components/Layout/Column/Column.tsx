import Layout, { LayoutProps } from "../Layout";
import { mapAlignToProperty, mapJustifyToProperty } from "../helpers";
import { JustifyWithMap, AlignWithMap } from "../types";

type Combined = `${AlignWithMap} ${JustifyWithMap}`;
export type Align = `${Combined}` | `${AlignWithMap}`;

export interface ColumnProps extends LayoutProps {
  align?: Align;
}

export default function Column({
  align = "flex-start",
  ...props
}: ColumnProps) {
  const [alignItems, justifyContent] = align.split(" ") as [
    AlignWithMap,
    JustifyWithMap
  ];
  return (
    <Layout
      flexDirection="column"
      alignItems={mapAlignToProperty(alignItems)}
      justifyContent={mapJustifyToProperty(justifyContent)}
      {...props}
    />
  );
}
