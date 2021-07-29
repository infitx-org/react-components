import { Row, CellContent, CellValue, Column, Filter } from "./types";

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

function isString(v: CellValue): v is string {
  return typeof v === "string";
}
function defaultFn(
  transformed: CellValue,
  original: CellValue,
  filter: string
) {
  const v = transformed || original;
  if (isString(v)) {
    return v.includes(filter);
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
