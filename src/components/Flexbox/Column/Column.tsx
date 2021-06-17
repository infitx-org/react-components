import Flexbox, { FlexboxProps } from "../Flexbox";
import { mapAlignToProperty, mapJustifyToProperty } from "../helpers";
import { JustifyWithMap, AlignWithMap, TopBottom, LeftRight } from "../types";

// type Combined = `${AlignWithMap} ${JustifyWithMap}`;
// export type Align = `${Combined}` | `${AlignWithMap}`;

type ColumnAlign = AlignWithMap<LeftRight>;
type ColumnJustify = JustifyWithMap<TopBottom>;
type Align = ColumnAlign | `${ColumnAlign} ${ColumnJustify}`;

export interface ColumnProps extends FlexboxProps {
  align?: Align;
}

export default function Column({
  align = "flex-start",
  ...props
}: ColumnProps) {
  const [alignItems, justifyContent] = align.split(" ") as [
    ColumnAlign,
    ColumnJustify
  ];

  return (
    <Flexbox
      flexDirection="column"
      alignItems={mapAlignToProperty<LeftRight>(alignItems)}
      justifyContent={mapJustifyToProperty<TopBottom>(justifyContent)}
      {...props}
    />
  );
}
