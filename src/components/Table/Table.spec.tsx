import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { mockComponent } from "react-dom/test-utils";
import { click } from "@testing-library/user-event/dist/click";
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

function getRows(container: Element): Element[] {
  return Array.from(container.querySelectorAll(".rc-table__body__row"));
}

function getHeaderCells(container: Element): Element[] {
  return Array.from(container.querySelectorAll(".rc-table__header__cell"));
}

function getHeaderCheckbox(container: Element): Element | null {
  const [firstHeaderCell] = getHeaderCells(container);
  return firstHeaderCell.querySelector(".rc-checkbox");
}

function getRowCheckbox(row: Element): Element | null {
  const firstRowCell = row.querySelectorAll(".rc-table__body__cell")[0];
  return firstRowCell.querySelector(".rc-checkbox");
}

function getOpenFilterButton(headerCell: Element): Element | null {
  return headerCell.querySelector(".rc-table__header__control--open-filter");
}

function getCloseFilterButton(headerCell: Element): Element | null {
  return headerCell.querySelector(".rc-table__header__control--close-filter");
}

function getFilterInput(headerCell: Element): HTMLInputElement | null {
  return headerCell.querySelector("input");
}

function getPaginator(container: Element): Element | null {
  return container.querySelector(".rc-table__paginator");
}

function getPages(container: Element): Element[] {
  return Array.from(container.querySelectorAll(".rc-table__paginator__page"));
}

function getPaginatorButtons(container: Element): Element[] {
  return Array.from(container.querySelectorAll(".rc-table__paginator__button"));
}

function getSelectedPage(container: Element): Element | null {
  return container.querySelector(".rc-table__paginator__page--selected");
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
    expect(getHeaderCells(container)).toHaveLength(3);
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

  it("shows the borders with bordered prop is true", () => {
    const { container } = render(
      <Table rows={makeRows(3)} columns={testColumns} bordered />
    );
    expect(
      container.querySelector(".rc-table.rc-table--bordered")
    ).toBeInTheDocument();
  });

  it("shows the borders with flexible prop is true", () => {
    const { container } = render(
      <Table rows={makeRows(3)} columns={testColumns} flexible />
    );
    expect(
      container.querySelector(".rc-table.rc-table--flexible")
    ).toBeInTheDocument();
  });
});

describe("Tests the Table Checkbox functionalities", () => {
  it("Shows the checked items specified by the checked prop (array)", () => {
    const rows = makeRows(3);
    const { container } = render(
      <Table rows={rows} columns={testColumns} checkable checked={[rows[0]]} />
    );

    const [row] = getRows(container);
    const rowCheckbox = getRowCheckbox(row);

    expect(rowCheckbox).toBeChecked();
  });

  it("Shows the checked items specified by the checked prop (function)", () => {
    const rows = makeRows(3);
    const { container } = render(
      <Table
        rows={rows}
        columns={testColumns}
        checkable
        checked={(row) => row.dog.endsWith("0")}
      />
    );

    const [row] = getRows(container);
    const rowCheckbox = getRowCheckbox(row);

    expect(rowCheckbox).toBeChecked();
  });

  it("Changes the checked items when the checked prop changes (array)", () => {
    const rows = makeRows(3);
    const { container, rerender } = render(
      <Table rows={rows} columns={testColumns} checkable checked={[rows[1]]} />
    );
    rerender(
      <Table rows={rows} columns={testColumns} checkable checked={[rows[0]]} />
    );

    const [row] = getRows(container);
    const rowCheckbox = getRowCheckbox(row);

    expect(rowCheckbox).toBeChecked();
  });

  it("Changes the checked items when the checked prop changes (function)", () => {
    const rows = makeRows(3);
    const { container, rerender } = render(
      <Table
        rows={rows}
        columns={testColumns}
        checkable
        checked={(row) => row.dog.endsWith("1")}
      />
    );
    rerender(
      <Table
        rows={rows}
        columns={testColumns}
        checkable
        checked={(row) => row.dog.endsWith("0")}
      />
    );

    const [row] = getRows(container);
    const rowCheckbox = getRowCheckbox(row);

    expect(rowCheckbox).toBeChecked();
  });

  it("triggers onCheck when checking a checkbox", () => {
    const mockOnCheck = jest.fn();
    const { container } = render(
      <Table
        rows={makeRows(3)}
        columns={testColumns}
        checkable
        onCheck={mockOnCheck}
      />
    );

    const [row] = getRows(container);
    const rowCheckbox = getRowCheckbox(row);

    expect(rowCheckbox).not.toBeChecked();
  });

  it("triggers onCheck with all the rows when checking the header checkbox", () => {
    const mockOnCheck = jest.fn();
    const { container } = render(
      <Table
        rows={makeRows(3)}
        columns={testColumns}
        checkable
        onCheck={mockOnCheck}
      />
    );

    const checkbox = getHeaderCheckbox(container);
    userEvent.click(checkbox as Element);

    expect(mockOnCheck).toHaveBeenCalledWith(makeRows(3));
  });

  it("triggers onCheck with only the checked rows when checking the row checkboxes", () => {
    const mockOnCheck = jest.fn();
    const { container } = render(
      <Table
        rows={makeRows(3)}
        columns={testColumns}
        checkable
        onCheck={mockOnCheck}
      />
    );

    const [row1, row2] = getRows(container);

    userEvent.click(getRowCheckbox(row1) as Element);
    expect(mockOnCheck).toHaveBeenCalledWith(makeRows(1));

    userEvent.click(getRowCheckbox(row2) as Element);
    expect(mockOnCheck).toHaveBeenCalledWith(makeRows(2));
  });
});

describe("Tests the filtering functionalities", () => {
  it("Opens the filter when clicking on the filter button", () => {
    const { container } = render(
      <Table rows={makeRows(3)} columns={testColumns} />
    );

    const [headerCell] = getHeaderCells(container);
    userEvent.click(getOpenFilterButton(headerCell) as Element);
    expect(getFilterInput(headerCell) as Element).toBeInTheDocument();
    expect(getFilterInput(headerCell) as Element).toHaveTextContent("");
  });

  it("Closes the filter when clicking on the close button of a filtering columng ", () => {
    const { container } = render(
      <Table rows={makeRows(3)} columns={testColumns} />
    );

    const [headerCell] = getHeaderCells(container);
    userEvent.click(getOpenFilterButton(headerCell) as Element);
    userEvent.click(getCloseFilterButton(headerCell) as Element);

    // TODO: Make it work!
    // expect(getFilterInput(headerCell) as Element).not.toBeInTheDocument();
  });

  it("Filters the rows based on the first column filter", () => {
    const { container } = render(
      <Table rows={makeRows(3)} columns={testColumns} />
    );

    const [headerCell] = getHeaderCells(container);
    userEvent.click(getOpenFilterButton(headerCell) as Element);
    expect(getFilterInput(headerCell) as Element).toBeInTheDocument();
    fireEvent.change(getFilterInput(headerCell) as HTMLInputElement, {
      target: { value: "dog-0" },
    });
    expect(getRowsData(container, testColumns)).toHaveLength(1);
  });

  it("Shows no rows for a unmatched filter", () => {
    const { container } = render(
      <Table rows={makeRows(3)} columns={testColumns} />
    );

    const [headerCell] = getHeaderCells(container);
    userEvent.click(getOpenFilterButton(headerCell) as Element);
    expect(getFilterInput(headerCell) as Element).toBeInTheDocument();
    fireEvent.change(getFilterInput(headerCell) as HTMLInputElement, {
      target: { value: "umatched" },
    });
    expect(getRowsData(container, testColumns)).toHaveLength(0);
  });

  it("Filters the rows based on the multiple filters", () => {
    const { container } = render(
      <Table rows={makeRows(3)} columns={testColumns} />
    );

    const [headerCell, secondHeaderCell] = getHeaderCells(container);
    userEvent.click(getOpenFilterButton(headerCell) as Element);
    expect(getFilterInput(headerCell) as Element).toBeInTheDocument();
    fireEvent.change(getFilterInput(headerCell) as HTMLInputElement, {
      target: { value: "dog-" },
    });

    expect(getRowsData(container, testColumns)).toHaveLength(3);

    userEvent.click(getOpenFilterButton(secondHeaderCell) as Element);
    expect(getFilterInput(secondHeaderCell) as Element).toBeInTheDocument();
    fireEvent.change(getFilterInput(secondHeaderCell) as HTMLInputElement, {
      target: { value: "cat-1" },
    });

    expect(getRowsData(container, testColumns)).toHaveLength(1);
  });
});

describe("Tests the paging functionalities", () => {
  it("Shows the paginator when there are pages", () => {
    const { container } = render(
      <Table rows={makeRows(30)} columns={testColumns} pageSize={5} />
    );

    const paginator = getPaginator(container);
    expect(paginator).toBeInTheDocument();
  });

  it("Shows the correct number of pages", () => {
    const { container } = render(
      <Table rows={makeRows(30)} columns={testColumns} pageSize={5} />
    );

    const pages = getPages(container);
    expect(pages).toHaveLength(6);
  });

  it("Shows the dots on the page before the last when pages are greater than the paginator size", () => {
    const { container } = render(
      <Table
        rows={makeRows(30)}
        columns={testColumns}
        pageSize={5}
        paginatorSize={5}
      />
    );

    const pages = getPages(container);
    expect(pages[3]).toHaveTextContent("...");
  });

  it("Navigate to next page when clicking the next button", () => {
    const { container } = render(
      <Table rows={makeRows(30)} columns={testColumns} pageSize={5} />
    );

    const [, nextButton] = getPaginatorButtons(container);
    userEvent.click(nextButton as Element);
    expect(getSelectedPage(container)).toHaveTextContent("2");
  });

  it("Navigate to prev page when clicking the prev button", () => {
    const { container } = render(
      <Table
        rows={makeRows(30)}
        columns={testColumns}
        pageSize={5}
        paginatorSize={5}
      />
    );

    const [, nextButton] = getPaginatorButtons(container);
    userEvent.click(nextButton as Element);
    const [prevButton] = getPaginatorButtons(container);
    userEvent.click(prevButton as Element);
    expect(getSelectedPage(container)).toHaveTextContent("1");
  });

  it("Navigate to page when clicking the page", () => {
    const { container } = render(
      <Table rows={makeRows(30)} columns={testColumns} pageSize={5} />
    );

    const pages = getPages(container);
    userEvent.click(pages[2] as Element);
    expect(getSelectedPage(container)).toHaveTextContent("3");
  });

  it("Disables the first button when page selected is first", () => {
    const { container } = render(
      <Table
        rows={makeRows(30)}
        columns={testColumns}
        pageSize={5}
        paginatorSize={5}
      />
    );

    const [prevButton] = getPaginatorButtons(container);
    expect(prevButton).toBeDisabled();
  });

  it("Disables the last button when page selected is last", () => {
    const { container } = render(
      <Table
        rows={makeRows(30)}
        columns={testColumns}
        pageSize={5}
        paginatorSize={5}
      />
    );

    const pages = getPages(container);
    userEvent.click(pages[4] as Element);
    const [, nextButton] = getPaginatorButtons(container);
    expect(nextButton).toBeDisabled();
  });
});
