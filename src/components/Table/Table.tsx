import React from "react";
import { Row, Column, Sort } from "./types";
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
}

export default function Table({
  rows,
  columns,
  sortBy,
  sortAsc = true,
}: TableProps) {
  const [filters, setFilters] = React.useState(new Array(columns.length));
  const [sorting, setSorting] = React.useState<Sort | undefined>(
    helpers.getSorting(columns, sortBy, sortAsc)
  );
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

  return (
    <div className="rc-table">
      <TableHeader
        columns={columns}
        filters={filters}
        sorting={sorting}
        flexBasis={flexBasis}
        onFilterChange={setFilter}
        onSearchIconClick={onSearchIconClick}
        onFilterRemoveIconClick={onFilterRemoveIconClick}
        onSortIconClick={onSortIconClick}
      />
      <TableBody items={sortedItems} flexBasis={flexBasis} />
    </div>
  );
}
