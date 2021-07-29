import { Item, Row } from "../types";
import Checkbox from "../../Checkbox";

interface TableBodyProps {
  items: Item[];
  checkable: boolean;
  checked: Row[];
  flexBasis: string;
  onCheckboxChange: (row: Row) => void;
  onRowClick?: (row: Row) => void;
}

export default function TableBody({
  items,
  checkable,
  checked,
  flexBasis,
  onCheckboxChange,
  onRowClick,
}: TableBodyProps) {
  const style = { flexBasis };
  const onRowCheckboxChange = (item: Row) => () => {
    onCheckboxChange(item);
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
                  className="rc-table__body__cell"
                >
                  {cell.transformedCellValue || cell.originalCellValue}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
