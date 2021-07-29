export type Row = Record<string, unknown>;

export type CellValue = null | undefined | string | React.ReactNode;

export interface CellContent {
  originalCellValue: CellValue;
  transformedCellValue: CellValue;
}

export interface Item {
  row: Row;
  items: CellContent[];
}

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  sort?: (
    leftValue: unknown,
    leftOriginalValue: unknown,
    rightValue: unknown,
    rightOriginalValue: unknown
  ) => number;
  searchable?: boolean;
  search?: (value: unknown, originalValue: unknown, filter: string) => boolean;
  fn?: (value: unknown, row: Row) => null | string | React.ReactNode;
}

export interface Filter {
  filtering?: boolean;
  value: string | undefined;
}

export interface Sort {
  index: number;
  asc: boolean;
}
