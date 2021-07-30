import React, { PropsWithChildren } from "react";
import SearchIcon from "bootstrap-icons/icons/search.svg";
import classnames from "classnames";
import CloseSmallIcon from "../../../resources/icons/close-small.svg";
import Arrow from "../../../resources/icons/arrow.svg";
import IconButton from "../../IconButton";
import Icon from "../../Icon";
import Checkbox from "../../Checkbox";
import { Column, Filter, Sort, Row } from "../types";

/* eslint-disable jsx-a11y/no-autofocus */
interface TableHeaderCellProps {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  isFiltering: boolean;
  isSorting: boolean;
  isSortable: boolean;
  isSortingAsc: boolean;
  isSearchable: boolean;
  onHeaderSearchIconClick: () => void;
  onHeaderFilterRemoveClick: () => void;
  onHeaderFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHeaderFilterLeave: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHeaderSortIconClick: () => void;
}

function TableHeaderCell({
  style,
  className,
  label,
  isFiltering,
  isSorting,
  isSortable,
  isSearchable,
  isSortingAsc,
  onHeaderSearchIconClick,
  onHeaderFilterRemoveClick,
  onHeaderFilterChange,
  onHeaderFilterLeave,
  onHeaderSortIconClick,
}: TableHeaderCellProps) {
  return (
    <div
      style={style}
      className={classnames([
        "rc-table__header__cell",
        isFiltering && "rc-table__header__cell--filtering",
        isSorting && "rc-table__header__cell--sorting",
        isSortable && "rc-table__header__cell--sortable",
        className,
      ])}
      role="presentation"
      onClick={isSortable ? onHeaderSortIconClick : undefined}
    >
      <div style={style} className="rc-table__header__cell-content">
        {isSearchable !== false &&
          (!isFiltering ? (
            <IconButton
              className="rc-table__header__control rc-table__header__control--open-filter"
              size={16}
              icon={<Icon icon={<SearchIcon />} size={12} />}
              onClick={onHeaderSearchIconClick}
            />
          ) : (
            <IconButton
              className="rc-table__header__control rc-table__header__control--close-filter"
              kind="danger"
              size={16}
              icon={<Icon icon={<CloseSmallIcon />} size={12} />}
              onClick={onHeaderFilterRemoveClick}
            />
          ))}
        {isFiltering ? (
          <>
            <input
              className="rc-table__header__filter"
              placeholder={label}
              type="text"
              onChange={onHeaderFilterChange}
              onBlur={onHeaderFilterLeave}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </>
        ) : (
          <div className="rc-table__header__label">{label}</div>
        )}

        {isSortable !== false && (
          <IconButton
            className={classnames([
              "rc-table__header__control",
              "rc-table__header__control--sort",
              isSortingAsc && "rc-table__header__control--sorting-asc",
            ])}
            kind="secondary"
            size={16}
            icon={<Icon icon={<Arrow />} size={10} />}
            onClick={onHeaderSortIconClick}
          />
        )}
      </div>
    </div>
  );
}

const MemoizedTableHeaderCell = React.memo(TableHeaderCell);

interface TableHeaderProps<RowType extends Row> {
  columns: Column<RowType>[];
  filters: Filter[];
  sorting: Sort | undefined;
  checkable: boolean;
  checkedAll: boolean;
  checkedSemi: boolean;
  flexBasis: string;
  onFilterChange: (value: string, index: number) => void;
  onSearchIconClick: (index: number) => void;
  onFilterRemove: (index: number) => void;
  onSortIconClick: (index: number) => void;
  onCheckboxChange: () => void;
}

export default function TableHeader<RowType>({
  columns,
  filters,
  sorting,
  checkable,
  checkedAll,
  checkedSemi,
  flexBasis,
  onFilterChange,
  onSearchIconClick,
  onFilterRemove,
  onSortIconClick,
  onCheckboxChange,
}: PropsWithChildren<TableHeaderProps<RowType>>) {
  const style = { flexBasis };
  const onHeaderSearchIconClick = (index: number) => () =>
    onSearchIconClick(index);
  const onHeaderFilterRemoveClick = (index: number) => () =>
    onFilterRemove(index);
  const onHeaderSortIconClick = (index: number) => () => onSortIconClick(index);
  const onHeaderFilterChange = (index: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => onFilterChange(e.currentTarget.value, index);
  const onHeaderFilterLeave = (index: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.currentTarget.value === "") {
      onFilterRemove(index);
    }
  };

  return (
    <div className="rc-table__header">
      <div className="rc-table__header__row">
        {checkable && (
          <div className="rc-table__header__cell">
            <Checkbox
              round
              label=""
              checked={checkedAll}
              semi={checkedSemi}
              onChange={onCheckboxChange}
            />
          </div>
        )}
        {columns.map((column, index) => {
          const filter = filters[index];

          return (
            <MemoizedTableHeaderCell
              key={index.toString()}
              style={style}
              className={classnames([column.className, column.headerClassName])}
              label={column.label}
              isFiltering={filter?.filtering === true}
              isSorting={sorting?.index === index}
              isSortable={column.sortable !== false}
              isSortingAsc={sorting?.asc === true}
              isSearchable={column.searchable !== false}
              onHeaderFilterRemoveClick={onHeaderFilterRemoveClick(index)}
              onHeaderFilterChange={onHeaderFilterChange(index)}
              onHeaderFilterLeave={onHeaderFilterLeave(index)}
              onHeaderSearchIconClick={onHeaderSearchIconClick(index)}
              onHeaderSortIconClick={onHeaderSortIconClick(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
