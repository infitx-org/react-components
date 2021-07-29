import { Row, CellContent, CellValue, Column, Filter, Sort } from "./types";

export function getItems(rows: Row[], columns: Column[]): CellContent[][] {
  return rows.map((row) =>
    columns.map(
      (col): CellContent => {
        const originalCellValue = row[col.key] as string | undefined;
        let transformedCellValue;
        if (col.fn) {
          transformedCellValue = col.fn(originalCellValue, row);
        }
        return {
          originalCellValue,
          transformedCellValue,
        };
      }
    )
  );
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

export function filterItems(
  items: CellContent[][],
  columns: Column[],
  filters: Filter[]
): CellContent[][] {
  return items.filter((itemRow) => {
    return itemRow.every((item, columnIndex) => {
      const filterFn = columns[columnIndex].search;
      const filterValue = filters[columnIndex]?.value;
      if (filterFn && filterValue) {
        return filterFn(
          item.transformedCellValue,
          item.originalCellValue,
          filterValue
        );
      }
      if (filterValue) {
        return defaultFn(
          item.transformedCellValue,
          item.originalCellValue,
          filterValue
        );
      }
      return true;
    });
  });
}

export function sortItems(
  items: CellContent[][],
  columns: Column[],
  sorting: Sort | undefined
): CellContent[][] {
  if (sorting?.index === undefined) {
    return items;
  }

  const sortingColumn = columns[sorting.index];

  const sorted = items.sort((leftRow, rightRow) => {
    const leftItem = leftRow[sorting.index];
    const rightItem = rightRow[sorting.index];

    if (sortingColumn.sort !== undefined) {
      return sortingColumn.sort(
        leftItem.transformedCellValue,
        leftItem.originalCellValue,
        rightItem.transformedCellValue,
        rightItem.originalCellValue
      );
    }

    const leftValue =
      leftItem.transformedCellValue || leftItem.originalCellValue;
    const rightValue =
      rightItem.transformedCellValue || rightItem.originalCellValue;

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
