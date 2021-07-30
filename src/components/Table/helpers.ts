import {
  Row,
  CellContent,
  Item,
  CellValue,
  Column,
  Filter,
  Sort,
} from "./types";

// typeguard on CellValue
function isString(value: CellValue): value is string {
  return typeof value === "string";
}

export function getSorting<RowType extends Row>(
  columns: Column<RowType>[],
  sortBy?: string,
  sortAsc?: boolean
): Sort | undefined {
  const index = columns.findIndex(
    (column) => column.sortable && column.label === sortBy
  );
  if (index === -1) {
    return undefined;
  }
  return { index, asc: sortAsc !== undefined ? sortAsc : true };
}

export function getItems<RowType extends Row>(
  rows: RowType[],
  columns: Column<RowType>[]
): Item<RowType>[] {
  return rows.map((row) => ({
    row,
    items: columns.map(
      (column): CellContent<RowType> => {
        const rawValue = row[column.key];
        return {
          classNames: [column.className, column.bodyClassName],
          rawValue,
          resultValue: column.fn ? column.fn(rawValue, row) : undefined,
        };
      }
    ),
  }));
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
        return filterFn(
          item.resultValue,
          item.rawValue,
          itemRow.row,
          filterValue
        );
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

  const sorted = items.sort((leftItem, rightItem) => {
    const leftCell = leftItem.items[sorting.index];
    const rightCell = rightItem.items[sorting.index];

    if (sortingColumn.sort !== undefined) {
      return sortingColumn.sort(leftItem.row, rightItem.row, {
        leftCell,
        rightCell,
      });
    }

    const leftValue = leftCell.resultValue || leftCell.rawValue;
    const rightValue = rightCell.resultValue || rightCell.rawValue;

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
