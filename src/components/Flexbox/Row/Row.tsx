import Flexbox, { FlexboxProps } from "../Flexbox";
import { mapAlignToProperty, mapJustifyToProperty } from "../helpers";
import { JustifyWithMap, AlignWithMap } from "../types";

type Combined = `${AlignWithMap} ${JustifyWithMap}`;
export type Align = `${Combined}` | `${JustifyWithMap}`;

export interface RowProps extends FlexboxProps {
  align?: Align;
}

export default function Row({ align = "flex-start", ...props }: RowProps) {
  const [justifyContent, alignItems] = align.split(" ").reverse() as [
    JustifyWithMap,
    AlignWithMap
  ];
  return (
    <Flexbox
      flexDirection="row"
      alignItems={mapAlignToProperty(alignItems)}
      justifyContent={mapJustifyToProperty(justifyContent)}
      {...props}
    />
  );
}
