export type Row = {};

export type CellValue = null | undefined | string | React.ReactNode;

export interface CellContent {
  classNames: (string | undefined)[];
  originalCellValue: CellValue;
  transformedCellValue: CellValue;
}

export interface Item<RowType extends Row> {
  row: RowType;
  items: CellContent[];
}

export interface Column<RowType extends Row> {
  key: keyof RowType;
  label: string;
  sortable?: boolean;
  sort?: (
    leftValue: unknown,
    leftOriginalValue: unknown,
    rightValue: unknown,
    rightOriginalValue: unknown
  ) => number;
  searchable?: boolean;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  search?: (value: unknown, originalValue: unknown, filter: string) => boolean;
  fn?: (value: any, row: RowType) => null | string | React.ReactNode;
}

export interface Filter {
  filtering?: boolean;
  value: string | undefined;
}

export interface Sort {
  index: number;
  asc: boolean;
}
