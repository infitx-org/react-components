import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Table from "./Table";

const makeRows = (count: number) =>
  new Array(count).fill(undefined).map((_, index) => ({
    dog: `dog-${index}`,
    cat: `cat-${index}`,
    bird: `bird-${index}`,
  }));
type TestColumn = { key: string; label: string };
const testColumns = [
  {
    key: "dog",
    label: "Dogs",
  },
  {
    key: "cat",
    label: "Cats",
  },
  {
    key: "bird",
    label: "Birds",
  },
];

// onCheck ?: (rows: RowType[]) => void;
// onSelect ?: (row: RowType) => void;

// Remaps the rows with col to build an original-like structure
function getRowsData(container: HTMLElement, columns: TestColumn[]) {
  const rows = container.querySelectorAll(".rc-table__body__row");
  return Array.from(rows).map((row) => {
    const cells = row.querySelectorAll(".rc-table__body__cell");
    const texts = Array.from(cells).map((cell) => cell.textContent);
    return columns
      .map((col) => col.key)
      .reduce(
        (prev, key, index) => ({
          ...prev,
          [key]: texts[index],
        }),
        {} as Record<string, string | null>
      );
  });
}

function getRows(container: Element) {
  return container.querySelectorAll(".rc-table__body__row");
}

function getHeaderCheckbox(container: Element): Element | null {
  const firstHeaderCell = container.querySelectorAll(
    ".rc-table__header__cell"
  )[0];
  return firstHeaderCell.querySelector(".rc-checkbox");
}

function getRowCheckbox(row: Element): Element | null {
  const firstRowCell = row.querySelectorAll(".rc-table__body__cell")[0];
  return firstRowCell.querySelector(".rc-checkbox");
}

describe("tests the Table", () => {
  it("renders the table", () => {
    const { container } = render(
      <Table rows={makeRows(3)} columns={testColumns} />
    );
    expect(container.querySelector(".rc-table")).toBeInTheDocument();
  });

  it("renders the header", () => {
    const { container } = render(
      <Table rows={makeRows(3)} columns={testColumns} />
    );
    expect(container.querySelector(".rc-table__header")).toBeInTheDocument();
    expect(container.querySelectorAll(".rc-table__header__cell")).toHaveLength(
      3
    );
  });

  it("renders the body", () => {
    const { container } = render(
      <Table rows={makeRows(3)} columns={testColumns} />
    );
    expect(container.querySelector(".rc-table__body")).toBeInTheDocument();
    expect(container.querySelectorAll(".rc-table__body__row")).toHaveLength(3);
    expect(container.querySelectorAll(".rc-table__body__cell")).toHaveLength(
      3 * testColumns.length
    );
  });

  it("sorts by sortBy prop", () => {
    const { container } = render(
      <Table
        rows={makeRows(3)}
        columns={testColumns}
        sortBy={testColumns[0].label}
      />
    );
    expect(
      container.querySelector(
        ".rc-table__header__cell.rc-table__header__cell--sorting"
      )
    ).toHaveTextContent(testColumns[0].label);
    expect(getRowsData(container, testColumns)).toStrictEqual(makeRows(3));
  });

  it("sorts by sortBy, sortAsc prop", () => {
    const { container } = render(
      <Table
        rows={makeRows(3)}
        columns={testColumns}
        sortBy={testColumns[0].label}
        sortAsc={false}
      />
    );
    expect(
      container.querySelector(
        ".rc-table__header__cell.rc-table__header__cell--sorting"
      )
    ).toHaveTextContent(testColumns[0].label);
    expect(getRowsData(container, testColumns).reverse()).toStrictEqual(
      makeRows(3)
    );
  });

  it("shows the checkbox with checkable prop is true", () => {
    const { container } = render(
      <Table rows={makeRows(3)} columns={testColumns} checkable />
    );
    expect(getHeaderCheckbox(container)).toBeTruthy();

    const rows = getRows(container);
    rows.forEach((row) => {
      const rowCheckbox = getRowCheckbox(row);
      expect(rowCheckbox).toBeTruthy();
    });
  });
});
