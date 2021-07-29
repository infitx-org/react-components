import React, { PropsWithChildren } from "react";
import { Row, Column, Sort } from "./types";
import * as helpers from "./helpers";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import "./Table.scss";

function getWidth(items: unknown[]) {
  return `${100 / items.length}%`;
}

export interface TableProps<RowType extends Row> {
  rows: RowType[];
  columns: Column<RowType>[];
  sortBy?: string;
  sortAsc?: boolean;
  checkable?: boolean;
  onCheck?: (rows: RowType[]) => void;
  onSelect?: (row: RowType) => void;
}

export default function Table<RowType extends Row>({
  rows,
  columns,
  sortBy,
  sortAsc = true,
  checkable,
  onCheck,
  onSelect,
}: PropsWithChildren<TableProps<RowType>>) {
  const [filters, setFilters] = React.useState(new Array(columns.length));
  const [sorting, setSorting] = React.useState<Sort | undefined>(
    helpers.getSorting<RowType>(columns, sortBy, sortAsc)
  );
  const [checked, setChecked] = React.useState<RowType[]>([]);
  const items = helpers.getItems<RowType>(rows, columns);
  const filteredItems = helpers.filterItems<RowType>(items, columns, filters);
  const sortedItems = helpers.sortItems<RowType>(
    filteredItems,
    columns,
    sorting
  );

  const flexBasis = getWidth(columns);

  function setCheckedAndExport(checkedRows: RowType[]) {
    setChecked(checkedRows);
    onCheck?.(checkedRows);
  }

  function setFilter(value: string, index: number): void {
    setFilters([
      ...filters.slice(0, index),
      { value: value === "" ? undefined : value, filtering: true },
      ...filters.slice(index + 1),
    ]);
  }

  function onSearchIconClick(index: number): void {
    setFilters([
      ...filters.slice(0, index),
      { value: undefined, filtering: true },
      ...filters.slice(index + 1),
    ]);
  }

  function onFilterRemoveIconClick(index: number): void {
    setFilters([
      ...filters.slice(0, index),
      { value: undefined, filtering: false },
      ...filters.slice(index + 1),
    ]);
  }

  function onSortIconClick(index: number): void {
    const asc = sorting?.index === index ? !sorting.asc : true;
    setSorting({ index, asc });
  }

  function onBodyCheckboxChange(row: RowType): void {
    const index = checked.indexOf(row);
    if (index === -1) {
      setCheckedAndExport([...checked, row]);
    } else {
      setCheckedAndExport([
        ...checked.slice(0, index),
        ...checked.slice(index + 1),
      ]);
    }
  }

  function onHeaderCheckboxChange(): void {
    if (checked.length === rows.length) {
      setCheckedAndExport([]);
    } else {
      setCheckedAndExport(rows);
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
        onFilterRemove={onFilterRemoveIconClick}
        onSortIconClick={onSortIconClick}
        onCheckboxChange={onHeaderCheckboxChange}
      />
      <TableBody
        items={sortedItems}
        flexBasis={flexBasis}
        checkable={!!checkable}
        checked={checked}
        onCheckboxChange={onBodyCheckboxChange}
        onRowClick={onSelect}
      />
    </div>
  );
}
