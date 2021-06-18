import Flexbox, { FlexboxProps } from "../Flexbox";
import { mapAlignToProperty, mapJustifyToProperty } from "../helpers";
import { JustifyWithMap, AlignWithMap, TopBottom, LeftRight } from "../types";

type RowAlign = AlignWithMap<TopBottom>;
type RowJustify = JustifyWithMap<LeftRight>;
type Align = RowJustify | `${RowAlign} ${RowJustify}`;

export interface RowProps extends FlexboxProps {
  align?: Align;
}

export default function Row({ align = "flex-start", ...props }: RowProps) {
  const [justifyContent, alignItems] = align.split(" ").reverse() as [
    RowJustify,
    RowAlign
  ];
  return (
    <Flexbox
      flexDirection="row"
      alignItems={mapAlignToProperty<TopBottom>(alignItems)}
      justifyContent={mapJustifyToProperty<LeftRight>(justifyContent)}
      {...props}
    />
  );
}
