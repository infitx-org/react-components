import React from "react";
import { CellContent } from "./types";
import "./Table.scss";

interface TableBodyProps {
  items: CellContent[][];
  flexBasis: string;
}

export default function TableBody({ items, flexBasis }: TableBodyProps) {
  const style = { flexBasis };
  return (
    <div className="rc-table__body">
      {items.map((item, index) => {
        return (
          <div key={index.toString()} className="rc-table__body__row">
            {item.map((cell, itemIndex) => {
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
