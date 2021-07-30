export type Row = {};

export type CellValue = null | undefined | string | React.ReactNode;

export interface CellContent<RowType extends Row> {
  classNames: (string | undefined)[];
  rawValue: RowType[keyof RowType];
  resultValue: CellValue;
}

export interface Item<RowType extends Row> {
  row: RowType;
  items: CellContent<RowType>[];
}

export interface Column<RowType extends Row> {
  key: T;
  label: string;
  sortable?: boolean;
  sort?: (
    leftRow: RowType,
    rightRow: RowType,
    others: {
      leftCell: CellContent<RowType>;
      rightCell: CellContent<RowType>;
    }
  ) => number;
  searchable?: boolean;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  search?: (
    value: CellValue,
    rawValue: RowType[keyof RowType],
    row: RowType,
    filter: string
  ) => boolean;
  fn?: (rawValue: RowType[keyof RowType], row: RowType) => CellValue;
}

export interface Filter {
  filtering?: boolean;
  value: string | undefined;
}

export interface Sort {
  index: number;
  asc: boolean;
}
