import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { Kind } from "types";
import Modal from "./Modal";

/* eslint-disable no-console */
const { log } = console;

describe("tests the modal", () => {
  it("renders the modal", async () => {
    const root = document.createElement("div");
    render(<Modal root={root}>content</Modal>);
    expect(root.querySelector(".rc-modal")).toBeTruthy();
    expect(root.querySelector(".rc-modal__portal")).toBeTruthy();
  });

  it("renders the children when props are set on the modal", () => {
    const root = document.createElement("div");
    render(
      <Modal root={root} title="test" onSubmit={log}>
        Body
      </Modal>
    );
    expect(root.querySelector(".rc-modal__header")).toBeTruthy();
    expect(root.querySelector(".rc-modal__body")).toBeTruthy();
    expect(root.querySelector(".rc-modal__footer")).toBeTruthy();
  });

  it("renders the children as common props are set on the modal", () => {
    const root = document.createElement("div");
    render(
      <Modal root={root} title="test" onSubmit={log}>
        Body
      </Modal>
    );
    expect(root.querySelector(".rc-modal__header--common")).toBeTruthy();
    expect(root.querySelector(".rc-modal__body--common")).toBeTruthy();
    expect(root.querySelector(".rc-modal__footer--common")).toBeTruthy();
  });

  it("renders the header when the header props are set", () => {
    const root = document.createElement("div");
    render(
      <Modal root={root} title="test">
        Body
      </Modal>
    );
    expect(root.querySelector(".rc-modal__header")).toBeTruthy();
  });

  it("renders the footer when the header props are set", () => {
    const root = document.createElement("div");
    render(
      <Modal root={root} onSubmit={log}>
        Body
      </Modal>
    );
    expect(root.querySelector(".rc-modal__footer")).toBeTruthy();
  });

  it("renders the children explicitely", () => {
    const root = document.createElement("div");
    render(
      <Modal root={root}>
        <Modal.Header>Custom header content</Modal.Header>
        <Modal.Body>Custom content</Modal.Body>
        <Modal.Footer>Custom footer content</Modal.Footer>
      </Modal>
    );
    expect(root.querySelector(".rc-modal__header")).toBeTruthy();
    expect(root.querySelector(".rc-modal__body")).toBeTruthy();
    expect(root.querySelector(".rc-modal__footer")).toBeTruthy();
  });
});

describe("tests the modal container", () => {
  it("renders the container", () => {
    const { container } = render(<Modal.Body>test</Modal.Body>);
    expect(container.querySelector(".rc-modal__body")).toBeTruthy();
  });

  it("renders the container as common when prop is set", () => {
    const { container } = render(<Modal.Body common>test</Modal.Body>);
    expect(container.querySelector(".rc-modal__body--common")).toBeTruthy();
  });
});

describe("tests the modal header", () => {
  it("renders the header", () => {
    const { container } = render(<Modal.Header />);
    expect(container.querySelector(".rc-modal__header")).toBeTruthy();
  });

  it("renders the header as common when a prop is set", () => {
    const { container } = render(<Modal.Header title="test" />);
    expect(container.querySelector(".rc-modal__header--common")).toBeTruthy();
  });

  it("renders the title", () => {
    const { container } = render(<Modal.Header title="title" />);
    const title = container.querySelector(".rc-modal__header__title");
    expect(title).toBeTruthy();
    expect(title?.textContent).toBe("title");
  });

  it("renders the close button", () => {
    const { container } = render(<Modal.Header onClose={log} />);
    const closeButton = container.querySelector(".rc-modal__header__close");
    expect(closeButton).toBeTruthy();
  });

  it("renders the classname", () => {
    const { container } = render(<Modal.Header className="test" />);
    const header = container.querySelector(".rc-modal__header.test");
    expect(header).toBeTruthy();
  });

  it("renders the children", () => {
    const { container } = render(
      <Modal.Header>
        <div>content</div>
      </Modal.Header>
    );
    const header = container.querySelector(".rc-modal__header");
    expect(header?.innerHTML).toBe("<div>content</div>");
  });

  it("triggers onClose when clicking the close button", () => {
    const mockFn = jest.fn();
    const { container } = render(<Modal.Header onClose={mockFn} />);
    const closeButton = container.querySelector(".rc-modal__header__close");
    fireEvent.click(closeButton as HTMLButtonElement);
    expect(mockFn).toHaveBeenCalled();
  });
});

describe("tests the modal footer", () => {
  it("renders the footer", () => {
    const { container } = render(<Modal.Footer />);
    expect(container.querySelector(".rc-modal__footer")).toBeTruthy();
  });

  it("renders the footer as common when a prop is set", () => {
    const { container } = render(<Modal.Footer onSubmit={log} />);
    expect(container.querySelector(".rc-modal__footer--common")).toBeTruthy();
  });

  it("renders the submit button", () => {
    const { container } = render(<Modal.Footer onSubmit={log} />);
    const submitButton = container.querySelector(".rc-modal__footer__button");
    expect(submitButton).toBeTruthy();
    expect(submitButton).toHaveTextContent("Submit");
  });

  it("renders the cancel button", () => {
    const { container } = render(<Modal.Footer onCancel={log} />);
    const cancelButton = container.querySelector(".rc-modal__footer__button");
    expect(cancelButton).toBeTruthy();
    expect(cancelButton).toHaveTextContent("Cancel");
  });

  it("renders the classname", () => {
    const { container } = render(<Modal.Footer className="test" />);
    const footer = container.querySelector(".rc-modal__footer.test");
    expect(footer).toBeTruthy();
  });

  it("renders the children", () => {
    const { container } = render(
      <Modal.Footer>
        <div>content</div>
      </Modal.Footer>
    );
    const footer = container.querySelector(".rc-modal__footer");
    expect(footer?.innerHTML).toBe("<div>content</div>");
  });

  it("triggers onSubmit when clicking the close button", () => {
    const mockFn = jest.fn();
    const { container } = render(<Modal.Footer onSubmit={mockFn} />);
    const closeButton = container.querySelector(".rc-modal__footer__button");
    fireEvent.click(closeButton as HTMLButtonElement);
    expect(mockFn).toHaveBeenCalled();
  });

  it("triggers onCancel when clicking the close button", () => {
    const mockFn = jest.fn();
    const { container } = render(<Modal.Footer onCancel={mockFn} />);
    const closeButton = container.querySelector(".rc-modal__footer__button");
    fireEvent.click(closeButton as HTMLButtonElement);
    expect(mockFn).toHaveBeenCalled();
  });
});

// // Snapshot testing
// it("renders the Modal correctly when multiple props are set", () => {
//   const { container } = render(
//     <Modal
//       onClick={log}
//       label="Snapshot Modal"
//       kind="secondary"
//       disabled
//       pending
//     />
//   );
//   expect(container).toMatchSnapshot();
// });
