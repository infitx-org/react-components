import classnames from "classnames";
import Arrow from "../../../resources/icons/arrow.svg";
import Icon from "../../Icon";
import IconButton from "../../IconButton";
import "./Paginator.scss";

interface PageProps {
  content: string;
  selected: boolean;
  disabled: boolean;
  onClick?: () => void;
}
function Page({ content = "1", selected, disabled, onClick }: PageProps) {
  const className = classnames([
    "rc-table__paginator__page",
    selected && "rc-table__paginator__page--selected",
    disabled && "rc-table__paginator__page--disabled",
  ]);

  return (
    <div className={className} onClick={onClick} role="presentation">
      {content}
    </div>
  );
}

interface PaginatorProps {
  onPageClick: (page: number) => void;
  selectedPage: number;
  count: number;
  pages: number;
}

function Paginator({
  selectedPage = 0,
  onPageClick,
  pages = 0,
  count,
}: PaginatorProps) {
  const minimumPagesToShow = Math.min(pages, count);
  const bySide = Math.round((minimumPagesToShow - 1) / 2);
  const minStart = Math.max(selectedPage - bySide, 1);
  const maxStart = pages - minimumPagesToShow + 1;
  const offset = Math.min(minStart, maxStart);
  const indexes = new Array(minimumPagesToShow)
    .fill(0)
    .map((_, index) => offset + index)
    .map((p, index, arr) => {
      if (index === 0) {
        return 1;
      }
      if (index === arr.length - 1) {
        return pages;
      }
      if (index === 1 && p !== 2) {
        return "...";
      }
      if (index === arr.length - 2 && p !== pages - 1) {
        return "...";
      }
      return p;
    });

  const isFirst = selectedPage === 1;
  const isLast = selectedPage === pages;

  return (
    <div className="rc-table__paginator">
      <IconButton
        kind="secondary"
        size={30}
        icon={<Icon size={16} icon={<Arrow />} />}
        className="rc-table__paginator__button rc-table__paginator__button--left"
        onClick={() => onPageClick(isFirst ? 1 : selectedPage - 1)}
        disabled={isFirst}
      />
      <div className="rc-table__paginator__pages">
        {indexes.map((p, index) => {
          const selected = p.toString() === selectedPage.toString();
          return (
            <Page
              key={index.toString()}
              content={p.toString()}
              selected={selected}
              disabled={typeof p !== "number"}
              onClick={typeof p === "number" ? () => onPageClick(p) : undefined}
            />
          );
        })}
      </div>
      <IconButton
        kind="secondary"
        size={30}
        icon={<Icon size={16} icon={<Arrow />} />}
        className="rc-table__paginator__button"
        onClick={() => onPageClick(isLast ? pages : selectedPage + 1)}
        disabled={isLast}
      />
    </div>
  );
}

export default Paginator;
