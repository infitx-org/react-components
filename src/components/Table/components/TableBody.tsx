import { PropsWithChildren } from "react";
import classnames from "classnames";
import { Item, Row } from "../types";
import Checkbox from "../../Checkbox";

interface TableBodyProps<RowType extends Row> {
  items: Item<RowType>[];
  checkable: boolean;
  checked: RowType[];
  flexBasis: string;
  onCheckboxChange: (row: RowType) => void;
  onRowClick?: (row: RowType) => void;
}

export default function TableBody<RowType extends Row>({
  items,
  checkable,
  checked,
  flexBasis,
  onCheckboxChange,
  onRowClick,
}: PropsWithChildren<TableBodyProps<RowType>>) {
  const style = { flexBasis };
  const onRowCheckboxChange = (row: RowType) => () => {
    onCheckboxChange(row);
  };
  return (
    <div className="rc-table__body">
      {items.map((item, index) => {
        return (
          <div
            key={index.toString()}
            className="rc-table__body__row"
            onClick={() => onRowClick?.(item.row)}
            role="presentation"
          >
            {checkable && (
              <div className="rc-table__body__cell">
                <Checkbox
                  round
                  label=""
                  onChange={onRowCheckboxChange(item.row)}
                  checked={checked.includes(item.row)}
                />
              </div>
            )}
            {item.items.map((cell, itemIndex) => {
              return (
                <div
                  key={itemIndex.toString()}
                  style={style}
                  className={classnames([
                    "rc-table__body__cell",
                    ...cell.classNames,
                  ])}
                >
                  {cell.resultValue || cell.rawValue}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
