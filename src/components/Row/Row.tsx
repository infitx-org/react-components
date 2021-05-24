import Layout, { LayoutProps } from "components/shared/Layout";
import {
  mapAlignToProperty,
  mapJustifyToProperty,
} from "components/shared/Layout/helpers";
import { JustifyWithMap, AlignWithMap } from "components/shared/Layout/types";

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
      alignItems={mapAlignToProperty(alignItems)}
      justifyContent={mapJustifyToProperty(justifyContent)}
      {...props}
    />
  );
}
