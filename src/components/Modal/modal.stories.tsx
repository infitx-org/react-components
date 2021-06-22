/* eslint no-console: "off" */
// import Button from "../Button";
import Modal from "./Modal";

export default {
  title: "Modal",
  component: Modal,
};

const { log } = console;

export const Simple = () => (
  <Modal title="I am a modal" onClose={log} onCancel={log} onSubmit={log}>
    Content!
  </Modal>
);

export const SpecifyComponents = () => (
  <Modal>
    <Modal.Header>Custom header content</Modal.Header>
    <Modal.Content>Custom content</Modal.Content>
    <Modal.Footer>Custom footer content</Modal.Footer>
  </Modal>
);

export const Maximise = () => (
  <Modal title="test" onClose={log} maximise>
    <Modal.Content>test</Modal.Content>
    <Modal.Footer>test</Modal.Footer>
  </Modal>
);

export const NoFooter = () => (
  <Modal>
    <Modal.Header />
    test
  </Modal>
);
