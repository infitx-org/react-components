import React, { PropsWithChildren } from "react";
import classnames from "classnames";
import { Row, Column, Sort } from "./types";
import * as helpers from "./helpers";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import Paginator from "./components/Paginator";
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
  checked?: RowType[];
  className?: string;
  flexible?: boolean;
  bordered?: boolean;
  pageSize?: number;
  paginatorSize?: number;
  onCheck?: (rows: RowType[]) => void;
  onSelect?: (row: RowType) => void;
}

export default function Table<RowType extends Row>({
  rows,
  columns,
  sortBy,
  sortAsc = true,
  checkable,
  checked: extenallyChecked = [],
  className,
  flexible,
  bordered,
  pageSize = 0,
  paginatorSize = 7,
  onCheck,
  onSelect,
}: PropsWithChildren<TableProps<RowType>>) {
  const [filters, setFilters] = React.useState(new Array(columns.length));
  const [sorting, setSorting] = React.useState<Sort | undefined>(
    helpers.getSorting<RowType>(columns, sortBy, sortAsc)
  );
  const [checked, setChecked] = React.useState<RowType[]>(extenallyChecked);
  const [selectedPage, setSelectedPage] = React.useState(1);

  React.useEffect(() => {
    setChecked(extenallyChecked);
  }, [extenallyChecked]);

  // Get the items and apply necessary transformations
  const items = helpers.getItems<RowType>(rows, columns);
  const filteredItems = helpers.filterItems<RowType>(items, columns, filters);
  const sortedItems = helpers.sortItems<RowType>(
    filteredItems,
    columns,
    sorting
  );
  const [pagedItems, newSelectedPage, pages] = helpers.pageItems(
    selectedPage,
    pageSize,
    sortedItems
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

  function onPageClick(page: number) {
    setSelectedPage(page);
  }

  let paginator = null;
  if (pages) {
    paginator = (
      <Paginator
        key="table-paginator"
        count={paginatorSize}
        pages={pages}
        selectedPage={newSelectedPage}
        onPageClick={onPageClick}
      />
    );
  }

  return (
    <div
      className={classnames([
        "rc-table",
        flexible && "rc-table--flexible",
        bordered && "rc-table--bordered",
        className,
      ])}
    >
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
        items={pagedItems}
        flexBasis={flexBasis}
        checkable={!!checkable}
        checked={checked}
        onCheckboxChange={onBodyCheckboxChange}
        onRowClick={onSelect}
      />
      {paginator}
    </div>
  );
}
