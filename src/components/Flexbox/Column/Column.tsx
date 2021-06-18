import Flexbox, { FlexboxProps } from "../Flexbox";
import { mapAlignToProperty, mapJustifyToProperty } from "../helpers";
import { JustifyWithMap, AlignWithMap, TopBottom, LeftRight } from "../types";

type ColumnAlign = AlignWithMap<LeftRight>;
type ColumnJustify = JustifyWithMap<TopBottom>;
type Align = ColumnJustify | `${ColumnJustify} ${ColumnAlign}`;

export interface ColumnProps extends FlexboxProps {
  align?: Align;
}

export default function Column({
  align = "flex-start",
  ...props
}: ColumnProps) {
  const [justifyContent, alignItems] = align.split(" ") as [
    ColumnJustify,
    ColumnAlign
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
