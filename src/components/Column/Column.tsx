import Layout, { LayoutProps } from "components/shared/Layout";
import {
  mapAlignToProperty,
  mapJustifyToProperty,
} from "components/shared/Layout/helpers";
import { JustifyWithMap, AlignWithMap } from "components/shared/Layout/types";

type Combined = `${JustifyWithMap} ${AlignWithMap}`;
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
      alignItems={mapAlignToProperty(alignItems)}
      justifyContent={mapJustifyToProperty(justifyContent)}
      {...props}
    />
  );
}
