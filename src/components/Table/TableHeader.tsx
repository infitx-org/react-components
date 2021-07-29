import React from "react";
import SearchIcon from "bootstrap-icons/icons/search.svg";
import classnames from "classnames";
import CloseSmallIcon from "../../resources/icons/close-small.svg";
import { Column, Filter } from "./types";
import IconButton from "../IconButton";
import Icon from "../Icon";

/* eslint-disable jsx-a11y/no-autofocus */

interface TableHeaderProps {
  columns: Column[];
  filters: Filter[];
  flexBasis: string;
  onFilterChange: (value: string, index: number) => void;
  onSearchIconClick: (index: number) => void;
  onFilterRemoveIconClick: (index: number) => void;
}

export default function TableHeader({
  columns,
  filters,
  flexBasis,
  onFilterChange,
  onSearchIconClick,
  onFilterRemoveIconClick,
}: TableHeaderProps) {
  const style = { flexBasis };
  const onHeaderFilterChange = (index: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => onFilterChange(e.currentTarget.value, index);

  const onHeaderSearchIconClick = (index: number) => () =>
    onSearchIconClick(index);
  const onHeaderFilterRemoveIconClick = (index: number) => () =>
    onFilterRemoveIconClick(index);

  return (
    <div className="rc-table__header">
      <div className="rc-table__header__row">
        {columns.map((column, index) => {
          const filter = filters[index];
          const isFiltering = filter?.filtering;

          return (
            <div
              key={index.toString()}
              style={style}
              className={classnames([
                "rc-table__header__cell",
                isFiltering && "rc-table__header__cell--filtering",
              ])}
            >
              <div
                key={index.toString()}
                style={style}
                className="rc-table__header__cell-content"
              >
                {column.searchable !== false && (
                  <IconButton
                    className="rc-table__header__control"
                    size={16}
                    icon={<Icon icon={<SearchIcon />} size={12} />}
                    onClick={onHeaderSearchIconClick(index)}
                  />
                )}
                {isFiltering ? (
                  <>
                    <input
                      className="rc-table__header__filter"
                      placeholder={column.label}
                      type="text"
                      onChange={onHeaderFilterChange(index)}
                      autoFocus
                    />
                    <IconButton
                      className="rc-table__header__control"
                      kind="danger"
                      size={16}
                      icon={<Icon icon={<CloseSmallIcon />} size={12} />}
                      onClick={onHeaderFilterRemoveIconClick(index)}
                    />
                  </>
                ) : (
                  column.label
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
