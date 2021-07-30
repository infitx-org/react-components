import {
  Row,
  CellContent,
  Item,
  CellValue,
  Column,
  Filter,
  Sort,
} from "./types";

export function getSorting<RowType extends Row>(
  columns: Column<RowType>[],
  sortBy?: string,
  sortAsc?: boolean
): Sort | undefined {
  const index = columns.findIndex(
    (col) => col.sortable && col.label === sortBy
  );
  if (index >= 0) {
    return { index, asc: sortAsc !== undefined ? sortAsc : true };
  }
  return undefined;
}

export function getItems<RowType extends Row>(
  rows: RowType[],
  columns: Column<RowType>[]
): Item<RowType>[] {
  return rows.map((row) => ({
    row,
    items: columns.map(
      (col): CellContent => {
        const rawValue = row[col.key];
        return {
          classNames: [col.className, col.bodyClassName],
          rawValue,
          resultValue: col.fn ? col.fn(rawValue, row) : undefined,
        };
      }
    ),
  }));
}

function isString(value: CellValue): value is string {
  return typeof value === "string";
}

function defaultFn(
  transformed: CellValue,
  original: CellValue,
  filter: string
) {
  const value = transformed || original;
  if (isString(value)) {
    return value.includes(filter);
  }
  return false;
}

export function filterItems<RowType extends Row>(
  items: Item<RowType>[],
  columns: Column<RowType>[],
  filters: Filter[]
): Item<RowType>[] {
  return items.filter((itemRow) => {
    return itemRow.items.every((item, columnIndex) => {
      const filterFn = columns[columnIndex].search;
      const filterValue = filters[columnIndex]?.value;
      if (filterFn && filterValue) {
        return filterFn(item.resultValue, item.rawValue, filterValue);
      }
      if (filterValue) {
        return defaultFn(item.resultValue, item.rawValue, filterValue);
      }
      return true;
    });
  });
}

export function sortItems<RowType extends Row>(
  items: Item<RowType>[],
  columns: Column<RowType>[],
  sorting: Sort | undefined
): Item<RowType>[] {
  if (sorting?.index === undefined) {
    return items;
  }

  const sortingColumn = columns[sorting.index];

  const sorted = items.sort((leftRow, rightRow) => {
    const leftItem = leftRow.items[sorting.index];
    const rightItem = rightRow.items[sorting.index];

    if (sortingColumn.sort !== undefined) {
      return sortingColumn.sort(
        leftItem.resultValue,
        leftItem.rawValue,
        rightItem.resultValue,
        rightItem.rawValue
      );
    }

    const leftValue = leftItem.resultValue || leftItem.rawValue;
    const rightValue = rightItem.resultValue || rightItem.rawValue;

    if (isString(leftValue) && isString(rightValue)) {
      if (leftValue > rightValue) {
        return 1;
      }
      if (leftValue < rightValue) {
        return -1;
      }
    }
    return 0;
  });

  return sorting.asc ? sorted : [...sorted].reverse();
}
