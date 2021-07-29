import React from "react";
import { Row, Column, Sort, Item } from "./types";
import * as helpers from "./helpers";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import "./Table.scss";

function getWidth(items: unknown[]) {
  return `${100 / items.length}%`;
}

export interface TableProps {
  rows: Row[];
  columns: Column[];
  sortBy?: string;
  sortAsc?: boolean;
  checkable?: boolean;
}

export default function Table({
  rows,
  columns,
  sortBy,
  sortAsc = true,
  checkable,
}: TableProps) {
  const [filters, setFilters] = React.useState(new Array(columns.length));
  const [sorting, setSorting] = React.useState<Sort | undefined>(
    helpers.getSorting(columns, sortBy, sortAsc)
  );
  const [checked, setChecked] = React.useState<Row[]>([]);
  const items = helpers.getItems(rows, columns);
  const filteredItems = helpers.filterItems(items, columns, filters);
  const sortedItems = helpers.sortItems(filteredItems, columns, sorting);

  const flexBasis = getWidth(columns);

  const setFilter = (value: string, index: number) => {
    setFilters([
      ...filters.slice(0, index),
      { value: value === "" ? undefined : value, filtering: true },
      ...filters.slice(index + 1),
    ]);
  };

  function onSearchIconClick(index: number) {
    setFilters([
      ...filters.slice(0, index),
      { value: undefined, filtering: true },
      ...filters.slice(index + 1),
    ]);
  }

  function onFilterRemoveIconClick(index: number) {
    setFilters([
      ...filters.slice(0, index),
      { value: undefined, filtering: false },
      ...filters.slice(index + 1),
    ]);
  }

  function onSortIconClick(index: number) {
    const asc = sorting?.index === index ? !sorting.asc : true;
    setSorting({ index, asc });
  }

  function onBodyCheckboxChange(row: Row) {
    const index = checked.indexOf(row);
    if (index === -1) {
      setChecked([...checked, row]);
    } else {
      setChecked([...checked.slice(0, index), ...checked.slice(index + 1)]);
    }
  }

  function onHeaderCheckboxChange() {
    if (checked.length === rows.length) {
      setChecked([]);
    } else {
      setChecked(rows);
    }
  }

  return (
    <div className="rc-table">
      <TableHeader
        columns={columns}
        filters={filters}
        sorting={sorting}
        checkable={!!checkable}
        checkedAll={checked.length === rows.length}
        checkedSemi={checked.length > 0 && checked.length !== rows.length}
        flexBasis={flexBasis}
        onFilterChange={setFilter}
        onSearchIconClick={onSearchIconClick}
        onFilterRemoveIconClick={onFilterRemoveIconClick}
        onSortIconClick={onSortIconClick}
        onCheckboxChange={onHeaderCheckboxChange}
      />
      <TableBody
        items={sortedItems}
        flexBasis={flexBasis}
        checkable={!!checkable}
        checked={checked}
        onCheckboxChange={onBodyCheckboxChange}
      />
    </div>
  );
}
