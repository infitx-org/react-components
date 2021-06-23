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
        Content
      </Modal>
    );
    expect(root.querySelector(".rc-modal__header")).toBeTruthy();
    expect(root.querySelector(".rc-modal__content")).toBeTruthy();
    expect(root.querySelector(".rc-modal__footer")).toBeTruthy();
  });

  it("renders the header when the header props are set", () => {
    const root = document.createElement("div");
    render(
      <Modal root={root} title="test">
        Content
      </Modal>
    );
    expect(root.querySelector(".rc-modal__header")).toBeTruthy();
  });

  it("renders the footer when the header props are set", () => {
    const root = document.createElement("div");
    render(
      <Modal root={root} onSubmit={log}>
        Content
      </Modal>
    );
    expect(root.querySelector(".rc-modal__footer")).toBeTruthy();
  });

  it("renders the children explicitely", () => {
    const root = document.createElement("div");
    render(
      <Modal root={root}>
        <Modal.Header>Custom header content</Modal.Header>
        <Modal.Content>Custom content</Modal.Content>
        <Modal.Footer>Custom footer content</Modal.Footer>
      </Modal>
    );
    expect(root.querySelector(".rc-modal__header")).toBeTruthy();
    expect(root.querySelector(".rc-modal__content")).toBeTruthy();
    expect(root.querySelector(".rc-modal__footer")).toBeTruthy();
  });
});

describe("tests the modal header", () => {
  it("renders the header", () => {
    const { container } = render(<Modal.Header />);
    expect(container.querySelector(".rc-modal__header")).toBeTruthy();
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

  it("triggers onClose when clicking the close button", () => {
    const mockFn = jest.fn();
    const { container } = render(<Modal.Header onClose={mockFn} />);
    const closeButton = container.querySelector(".rc-modal__header__close");
    fireEvent.click(closeButton as HTMLButtonElement);
    expect(mockFn).toHaveBeenCalled();
  });
});

// it("renders the disabled state", () => {
//   const { container } = render(
//     <Modal onClick={log} disabled>
//       Test-Modal
//     </Modal>
//   );
//   expect(container.querySelector("Modal")).toBeDisabled();
// });

// it("renders the spinner", () => {
//   const { container } = render(<Modal onClick={log} pending />);
//   expect(container.querySelector(".rc-spinner")).toBeTruthy();
// });

// it("renders the spinner before the icon", () => {
//   const { container } = render(<Modal icon={icon} onClick={log} pending />);
//   expect(container.querySelector(".rc-spinner")).toBeTruthy();
// });

// it("renders the icon", () => {
//   const { container } = render(<Modal icon={icon} onClick={log} />);
//   expect(container.querySelector("svg")).toBeTruthy();
// });

// it("renders the id", () => {
//   const { container } = render(<Modal id="test" onClick={log} />);
//   expect(container.querySelector("Modal#test")).toBeTruthy();
// });

// it("renders the className", () => {
//   const { container } = render(<Modal className="test" onClick={log} />);
//   expect(container.querySelector("Modal.test")).toBeTruthy();
// });

// it("renders the style prop", () => {
//   const { container } = render(
//     <Modal style={{ fill: "red" }} onClick={log} />
//   );
//   expect(container.querySelector("Modal")).toHaveAttribute(
//     "style",
//     "fill: red;"
//   );
// });

// it("renders the default kind as primary kind", () => {
//   const { container } = render(<Modal onClick={log} />);
//   expect(container.querySelector("Modal.rc-Modal--primary")).toBeTruthy();
// });

// it("renders all the kinds", () => {
//   Object.values(Kind).forEach((kind) => {
//     const { container } = render(<Modal onClick={log} kind={kind} />);
//     expect(container.querySelector(`Modal.rc-Modal--${kind}`)).toBeTruthy();
//   });
// });

// it('renders with the "noFill" prop', () => {
//   const { container } = render(<Modal onClick={log} noFill />);
//   expect(container.querySelector("Modal.rc-Modal--noFill")).toBeTruthy();
// });

// it("renders the large, medium, small sizes", () => {
//   Object.values(Size).forEach((size) => {
//     const { container } = render(<Modal onClick={log} size={size} />);
//     expect(container.querySelector(`.rc-Modal--${size}`)).toBeTruthy();
//   });
// });

// it("triggers the onClick prop", () => {
//   const mockEvent = jest.fn();
//   const { container } = render(<Modal onClick={mockEvent} />);
//   userEvent.click(container.querySelector("Modal") as HTMLModalElement);
//   expect(mockEvent).toHaveBeenCalled();
// });
// });

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
