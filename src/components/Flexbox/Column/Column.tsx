import Flexbox, { FlexboxProps } from "../Flexbox";
import { mapAlignToProperty, mapJustifyToProperty } from "../helpers";
import { JustifyWithMap, AlignWithMap } from "../types";

type Combined = `${AlignWithMap} ${JustifyWithMap}`;
export type Align = `${Combined}` | `${AlignWithMap}`;

export interface ColumnProps extends FlexboxProps {
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
    <Flexbox
      flexDirection="column"
      alignItems={mapAlignToProperty(alignItems)}
      justifyContent={mapJustifyToProperty(justifyContent)}
      {...props}
    />
  );
}
