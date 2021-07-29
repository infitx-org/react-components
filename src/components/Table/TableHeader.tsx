import React from "react";
import { Column } from "./types";

interface TableHeaderProps {
  columns: Column[];
  flexBasis: string;
  onFilterChange: (value: string, index: number) => void;
}

export default function TableHeader({
  columns,
  flexBasis,
  onFilterChange,
}: TableHeaderProps) {
  const style = { flexBasis };
  const onHeaderFilterChange = (index: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => onFilterChange(e.currentTarget.value, index);

  return (
    <div className="rc-table__header">
      <div className="rc-table__header__row">
        {columns.map((column, index) => (
          <div
            key={column.label || index.toString()}
            style={style}
            className="rc-table__header__cell"
          >
            {column.label}
            <input type="text" onChange={onHeaderFilterChange(index)} />
          </div>
        ))}
      </div>
    </div>
  );
}
