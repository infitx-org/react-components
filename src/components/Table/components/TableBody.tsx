import { PropsWithChildren, memo } from "react";
import classnames from "classnames";
import { Item, Row } from "../types";
import Checkbox from "../../Checkbox";
import ScrollBox from "../../ScrollBox";

interface TableBodyCellProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function TableBodyCell({ children, className, style }: TableBodyCellProps) {
  return (
    <div
      style={style}
      className={classnames(["rc-table__body__cell", className])}
    >
      {children}
    </div>
  );
}

const MemoizedTableBodyCell = memo(TableBodyCell);
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
    <ScrollBox className="rc-table__body">
      {items.map((item, index) => {
        return (
          <div
            key={index.toString()}
            className="rc-table__body__row"
            onClick={() => onRowClick?.(item.row)}
            role="presentation"
          >
            {checkable && (
              <MemoizedTableBodyCell>
                <Checkbox
                  round
                  label=""
                  onChange={onRowCheckboxChange(item.row)}
                  checked={checked.includes(item.row)}
                />
              </MemoizedTableBodyCell>
            )}
            {item.items.map((cell, itemIndex) => {
              return (
                <MemoizedTableBodyCell
                  key={itemIndex.toString()}
                  style={style}
                  className={classnames(cell.classNames)}
                >
                  {cell.resultValue || cell.rawValue}
                </MemoizedTableBodyCell>
              );
            })}
          </div>
        );
      })}
    </ScrollBox>
  );
}
